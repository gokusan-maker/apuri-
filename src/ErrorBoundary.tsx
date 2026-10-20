import { Component, type ReactNode } from 'react'

// 予期しないエラーで画面が真っ白にならないように
export class ErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }

  static getDerivedStateFromError() {
    return { error: true }
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="app">
        <section className="card result" role="alert">
          <p className="result-title">ごめんなさい、うまく表示できませんでした</p>
          <p className="result-message">学習データは消えていません。もう一度読み込んでみてください。</p>
          <button className="flip" onClick={() => window.location.reload()}>
            もう一度読み込む
          </button>
        </section>
      </main>
    )
  }
}
