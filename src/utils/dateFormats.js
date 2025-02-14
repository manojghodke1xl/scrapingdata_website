export const formatDate = (date) => {
  const dt = new Date(date);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 24);
};

export const formatDateTime = (date, tz = null) => {
  let d = new Date(date);

  if (tz?.value) {
    const offset = parseFloat(tz.value); // Convert offset to float (handles 5.5, -3.75, etc.)
    const utcTime = d.getTime() + d.getTimezoneOffset() * 60 * 1000; // Convert to UTC
    const adjustedTime = utcTime + offset * 60 * 60 * 1000; // Apply custom offset

    d = new Date(adjustedTime);
  }

  return d
    .toLocaleString('en-GB', {
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

export const adjustDateForTimezone = (date, tz) => {
  if (!tz || !tz.value) return date;

  const offset = parseInt(tz.value, 10);
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset() - offset * 60);

  console.log('adjustedDate', adjustedDate);
  return adjustedDate;
};
