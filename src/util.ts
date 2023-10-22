export function toUTC(date: Date): number {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

export function floorDivMod(
  n: number,
  m: number
): [quotient: number, remainder: number] {
  const q = Math.floor(n / m);
  const r = n % m;
  return [q, r];
}

export function floorMod(n: number): [quotient: number, remainder: number] {
  if (n === 0) {
    return [0, 0];
  }
  const q = Math.floor(n);
  const r = n % q;
  return [q, r];
}
