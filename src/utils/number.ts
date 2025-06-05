export function random(start = 10000, end = 10000 * 10000) {
  const span = end - start;
  return parseInt((Math.random() * span + start).toString(), 10);
}
