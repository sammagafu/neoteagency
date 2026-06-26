/** Parse newline-separated lines, ignoring empty lines */
export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Parse outcomes: "200K+|Cartons sold" per line */
export function linesToOutcomes(value: string) {
  return linesToArray(value).map((line) => {
    const [val, ...rest] = line.split("|");
    return {
      value: val.trim(),
      label: rest.join("|").trim(),
    };
  });
}

export function arrayToLines(items: string[]) {
  return items.join("\n");
}

export function outcomesToLines(
  items: { value: string; label: string }[],
) {
  return items.map((item) => `${item.value}|${item.label}`).join("\n");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
