import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LoginPage } from './pages/LoginPage'
import './styles/global.css'

const Page = window.location.pathname === '/login' ? LoginPage : App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
)
