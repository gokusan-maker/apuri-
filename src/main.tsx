import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './polish.css'
import App from './App.tsx'
import { registerSW } from './registerSW'
import { ErrorBoundary } from './ErrorBoundary'
import { watchNextButtons } from './nextbutton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

registerSW()
// 答えたあとの「次へ」ボタンを、スライドしなくても押せる位置に出す
watchNextButtons(document.getElementById('root')!)
