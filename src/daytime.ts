// 夜かどうか（19時〜翌5時）。相棒の部屋を暗くするのに使う
export const isNight = (hour: number) => hour >= 19 || hour < 5
