export function checkMaxLength(value: string, length: number): boolean {
  if (value.length > length) {
    return true;
  }

  return false;
}

export function checkMinLength(value: string, length: number): boolean {
  if (value.length < length) {
    return true;
  }

  return false;
}
