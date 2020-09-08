const fs = window.require("fs");
const path = window.require("path");
const dbPath = path.join("../ventes-pav-data-base.json");

const createDb = () => {
  fs.writeFileSync(dbPath, "{}");
};

const readDb = () => {
  if (fs.existsSync(dbPath)) {
    const db = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(db);
  } else {
    createDb();
    return {};
  }
};

export async function getLocalItem(key) {
  const db = readDb();

  return db[key];
}

export async function setLocalItem(key, value) {
  const db = readDb();

  db[key] = value;
  fs.writeFileSync(dbPath, JSON.stringify(db));
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
