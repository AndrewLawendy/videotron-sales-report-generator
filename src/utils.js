export function getLocalItem(key) {
  const stringItem = localStorage.getItem(key);
  return stringItem != null ? JSON.parse(stringItem) : [];
}

export function setLocalItem(key, value) {
  const stringRecords = JSON.stringify(value);
  localStorage.setItem(key, stringRecords);
}

/**
 *
 * @param {Date} date
 */
export function getDateFormat(date) {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = `${date.getFullYear()}`.padStart(2, "0");

  return `${day}/${month}/${year}`;
}

/**
 *
 * @param {string} number
 */
export function formatPhoneNumber(number) {
  const digits = number.replace(/\D/g, "");
  return `(${digits.substr(0, 3)})${digits.substr(3, 3)}-${digits.substr(6)}`;
}
