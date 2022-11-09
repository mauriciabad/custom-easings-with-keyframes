export function invertCoordenates(x: number): number {
  return (x - 1) * -1
}

export function round(value: number, decimals: number): number {
  return Number(`${Math.round(Number(`${value}e${decimals}`))}e-${decimals}`)
}

export function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num
}
