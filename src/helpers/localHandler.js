export const localGet = (key, fallback = "") => {
  const val = localStorage.getItem(key);
  if (val === "undefined" || val === null) return fallback;
  return JSON.parse(val);
};

export const localSet = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};

export const localRemove = (key) => {
  return localStorage.removeItem(key);
};
