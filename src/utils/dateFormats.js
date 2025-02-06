export const formatDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 24);
};

export const formatDateTime = (date, tz = null) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };

  if (tz?.value) {
    const offset = parseInt(tz.value, 10);
    const timeZone = `Etc/GMT${offset > 0 ? `-${offset}` : `+${Math.abs(offset)}`}`;
    options.timeZone = timeZone;
  }

  return new Date(date).toLocaleString('en-GB', options).replace(',', '').toUpperCase();
};

export const adjustDateForTimezone = (date, tz) => {
  if (!tz || !tz.value) return date;

  const offset = parseInt(tz.value, 10);
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset() - offset * 60);

  console.log('adjustedDate', adjustedDate);
  return adjustedDate;
};
