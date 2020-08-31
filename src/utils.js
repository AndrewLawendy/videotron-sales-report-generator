import { get, set } from "idb-keyval";

export async function getLocalItem(key) {
  const value = await get(key);
  return value;
}

export async function setLocalItem(key, value) {
  await set(key, value);
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

export function revertStringDateFormatToDate(str) {
  const strFormatted = str.replace(
    /(\d{2})\/(\d{2})\/(\d{2})/,
    (_, day, month, year) => `${month}/${day}/${year}`
  );

  return new Date(strFormatted);
}

/**
 *
 * @param {string} number
 */
export function formatPhoneNumber(number) {
  const digits = number.replace(/\D/g, "");
  return `(${digits.substr(0, 3)})${digits.substr(3, 3)}-${digits.substr(6)}`;
}

export const clearSelection = () => {
  window.getSelection().removeAllRanges();
};
