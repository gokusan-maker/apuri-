import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './polish.css'
import App from './App.tsx'
import { registerSW } from './registerSW'
import { ErrorBoundary } from './ErrorBoundary'
import { watchNextButtons } from './nextbutton'
import { startAdMob } from './admob'
import { unlockSpeechOnFirstTap } from './speech'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

registerSW()
// iPhone の Safari でもリスニング問題の自動読み上げが鳴るように、最初のタップで読み上げを使えるようにしておく
unlockSpeechOnFirstTap()
// 答えたあとの「次へ」ボタンを、スライドしなくても押せる位置に出す
watchNextButtons(document.getElementById('root')!)
// Android アプリだけ、下のタブの上に AdMob のバナー広告を出す（ウェブ版では何もしない）
void startAdMob()
