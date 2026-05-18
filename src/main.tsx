import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import './index.css'

// dynamic import para evitar error de tipos
function Root() {
  const [i18n, setI18n] = React.useState<any>(null);
  React.useEffect(() => {
    import('./i18n').then(m => setI18n(m.default));
  }, []);
  if (!i18n) return <div style={{background:'#0a0a0a',height:'100vh'}}/>;
  return <I18nextProvider i18n={i18n}><App /></I18nextProvider>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><Root /></React.StrictMode>,
);
