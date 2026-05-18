import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={require('./i18n').default}>
    <App />
  </I18nextProvider>,
)
