import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { applyViewport } from './lib/viewport.ts'
import './index.css'
import './styles/mobile.css'

applyViewport()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
