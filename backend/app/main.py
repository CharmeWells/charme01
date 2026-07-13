"""FastAPI entry point exposing registration, login, session, and logout endpoints."""
from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Cookie, Depends, FastAPI, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg.errors import UniqueViolation

from .config import COOKIE_SAMESITE, COOKIE_SECURE, CORS_ORIGINS, SESSION_HOURS
from .database import pool
from .schemas import AuthResponse, LoginRequest, RegisterRequest, UserResponse
from .security import DUMMY_HASH, create_session_token, hash_password, read_session_token, verify_password

COOKIE_NAME = "qtc_session"


@asynccontextmanager
async def lifespan(_: FastAPI):
    pool.open(wait=True)
    yield
    pool.close()


app = FastAPI(title="Quality to Code API", version="1.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=CORS_ORIGINS, allow_credentials=True, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])


def public_user(row: dict) -> UserResponse:
    return UserResponse(**{key: row[key] for key in ("id", "username", "display_name", "created_at")})


def set_session(response: Response, user_id: int) -> None:
    response.set_cookie(COOKIE_NAME, create_session_token(user_id), max_age=SESSION_HOURS * 3600, httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE, path="/")


def current_user(qtc_session: Annotated[str | None, Cookie()] = None) -> dict:
    user_id = read_session_token(qtc_session) if qtc_session else None
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="登录会话无效或已过期")
    with pool.connection() as connection:
        row = connection.execute("SELECT id, username, display_name, created_at FROM users WHERE id = %s", (user_id,)).fetchone()
    if row is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户不存在")
    return row


@app.get("/api/health")
def health() -> dict[str, str]:
    with pool.connection() as connection:
        connection.execute("SELECT 1")
    return {"status": "ok"}


@app.post("/api/auth/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, response: Response) -> AuthResponse:
    try:
        with pool.connection() as connection:
            row = connection.execute(
                "INSERT INTO users (username, display_name, password_hash) VALUES (%s, %s, %s) RETURNING id, username, display_name, created_at",
                (payload.username, payload.username, hash_password(payload.password)),
            ).fetchone()
    except UniqueViolation:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="用户名已存在") from None
    set_session(response, row["id"])
    return AuthResponse(message="注册成功", user=public_user(row))


@app.post("/api/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest, response: Response) -> AuthResponse:
    with pool.connection() as connection:
        row = connection.execute("SELECT id, username, display_name, password_hash, created_at FROM users WHERE username = %s", (payload.username,)).fetchone()
    if row is None:
        verify_password(payload.password, DUMMY_HASH)
    if row is None or not verify_password(payload.password, row["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或密码错误")
    set_session(response, row["id"])
    return AuthResponse(message="登录成功", user=public_user(row))


@app.get("/api/auth/me", response_model=UserResponse)
def me(user: Annotated[dict, Depends(current_user)]) -> UserResponse:
    return public_user(user)


@app.post("/api/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(response: Response) -> None:
    response.delete_cookie(COOKIE_NAME, path="/", httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE)
