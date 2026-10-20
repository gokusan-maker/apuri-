// お知らせを重ねずに順番に出すためのキュー
export function enqueue<T>(queue: T[][], item: T[]): T[][] {
  return item.length === 0 ? queue : [...queue, item]
}

export function dequeue<T>(queue: T[][]): T[][] {
  return queue.slice(1)
}
