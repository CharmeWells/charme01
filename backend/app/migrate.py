"""Applies idempotent SQL migrations before the API starts."""
from pathlib import Path

import psycopg

from .config import DATABASE_URL

MIGRATION_DIR = Path(__file__).parent.parent / "migrations"


def main() -> None:
    with psycopg.connect(DATABASE_URL) as connection:
        connection.execute("SELECT pg_advisory_xact_lock(731942001)")
        for migration in sorted(MIGRATION_DIR.glob("*.sql")):
            connection.execute(migration.read_text(encoding="utf-8"))
            print(f"Applied migration: {migration.name}")


if __name__ == "__main__":
    main()
