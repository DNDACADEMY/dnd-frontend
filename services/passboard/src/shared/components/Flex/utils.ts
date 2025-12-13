export const getGapSizeFromNumber = (gapSize: number) => {
  if (gapSize === 0) return 'none'

  const size = gapSize / 16
  return size + 'rem'
}
