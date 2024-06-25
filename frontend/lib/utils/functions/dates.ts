function convertToReadableDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Havana",
  };
  return new Intl.DateTimeFormat("es-ES", options).format(date);
}

export { convertToReadableDate };
