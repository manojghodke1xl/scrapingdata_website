export const formatDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 24);
};

export const formatDateTime = (date, tz = null) => {
  let timeZone = 'UTC';

  if (tz && tz.value) {
    const offset = parseInt(tz.value, 10);
    timeZone = `Etc/GMT${offset > 0 ? `-${offset}` : `+${Math.abs(offset)}`}`;
  }

  return new Date(date)
    .toLocaleString('en-GB', {
      timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    })
    .replace(',', '')
    .toUpperCase();
};
