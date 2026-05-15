import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// i18n musi być zainicjalizowane przed pierwszym renderem —
// inaczej komponenty próbowałyby użyć t() zanim tłumaczenia są gotowe.
import './i18n/index.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
