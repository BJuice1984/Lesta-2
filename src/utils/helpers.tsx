export function convertLevel(num: number) {
  if (num < 1 || num > 10) {
    return 'Invalid level'
  }

  const levelNumerals = [
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
  ]

  return levelNumerals[num]
}
