export const randomInteger = (min: number = 20, max: number = 80) => {
  return Math.round(min + Math.random() * (max - min))
}

export const getErrorCountOrder = (value:number, maximum: number = -1) => {
  const v = value
  if (isNaN(v)) {
    return 'Введите число'
  } else if (!Number.isInteger(v)) {
    return 'Введите целое число'
  } else if (v < 1) {
    return 'Введите больше 1'
  } else if (maximum > -1 && v > maximum) {
    return `Доступно только ${maximum}`
  } else {
    return ''
  }
}
