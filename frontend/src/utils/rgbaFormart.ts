export function rbgaFormot(hex: string | undefined) {
  if (!hex) {
    return;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, 0.7)`;
}

export function reduceRgbaOpacity(rgba: string, newOpacity: string) {
  const sparate = rgba.split(",");
  sparate[3] = `${newOpacity})`;
  return sparate.join(",");
}
