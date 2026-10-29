// ホームの連続日数のクラス名：1日以上で on、7の倍数の日は金色にかがやく week-gold（デザイン73）
export const streakClass = (days: number) => `streak${days > 0 ? ' on' : ''}${days > 0 && days % 7 === 0 ? ' week-gold' : ''}`
