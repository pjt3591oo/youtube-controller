export const hms = (seconds) => {
  return [3600, 60]
    .reduceRight(
      (p, b) => r => [Math.floor(r / b)].concat(p(r % b)),
      r => [r]
    )(seconds)
    .map(a => a.toString().padStart(2, '0'))
    .join(':');
}