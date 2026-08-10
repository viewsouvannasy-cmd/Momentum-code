function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// this function ignore opacity
export function rgbStringToHex(rgbStr: string | undefined) {
  if (!rgbStr) {
    return;
  }
  const matches = rgbStr.match(/\d+(\.\d+)?/g);
  if (!matches || matches.length < 3) {
    throw new Error(`Invalid rgb(a) string: ${rgbStr}`);
  }
  const [r, g, b] = matches.map(Number);
  return rgbToHex(r, g, b);
}
