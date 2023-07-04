export const usePrettyfiedDate = (date: string) => {
  let formattedDate = new Date(date);
  return formattedDate
    .toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
};

export const useDateNow = () => {
  // Create a new Date object
  const date = new Date();

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  // Get the hours, minutes, and seconds components
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Get the timezone offset in hours and minutes
  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffsetMinutes) / 60)
    .toString()
    .padStart(2, "0");
  const timezoneOffsetMinutesPart = Math.abs(timezoneOffsetMinutes) % 60;
  const timezoneOffsetSign = timezoneOffsetMinutes > 0 ? "-" : "+";

  // Create the date string
  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffsetSign}${timezoneOffsetHours}:${timezoneOffsetMinutesPart
    .toString()
    .padStart(2, "0")}`;

  return dateString; // Output: 2023-05-18T12:34:56+02:00 (example)
};

export const isDateStringGreaterThan = (dateString1: any, dateString2: any) => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1 > date2;
};
