export function formatMatchDay(value: string): { weekday: string; dayMonth: string } {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { weekday: "", dayMonth: value };
  }

  const weekday = new Intl.DateTimeFormat("es-AR", { weekday: "short" })
    .format(date)
    .replace(/\./g, "")
    .toUpperCase();

  const dayMonth = new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(/\./g, "")
    .toUpperCase();

  return { weekday, dayMonth };
}