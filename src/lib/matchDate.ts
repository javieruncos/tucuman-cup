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

export function formatDateBand(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.toUpperCase();
  }

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
    .format(date)
    .replace(/\./g, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function formatRoundRange(dates: string[]): string {
  const sorted = [...dates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  if (sorted.length === 0) {
    return "";
  }

  const first = new Date(sorted[0]);
  const last = new Date(sorted[sorted.length - 1]);
  const sameDay =
    !Number.isNaN(first.getTime()) &&
    !Number.isNaN(last.getTime()) &&
    first.toDateString() === last.toDateString();

  if (sameDay) {
    return formatDateBand(sorted[0]);
  }

  return `${formatMatchDay(sorted[0]).weekday} ${formatMatchDay(sorted[0]).dayMonth} — ${formatMatchDay(sorted[sorted.length - 1]).weekday} ${formatMatchDay(sorted[sorted.length - 1]).dayMonth}`;
}