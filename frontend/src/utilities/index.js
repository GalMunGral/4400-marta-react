export function getSQLTimeString(date) {
  if (!date) return "";
  const s = date.toISOString();
  return s.slice(0, s.lastIndexOf(".")).replace("T", " ");
}

export function getDOMTimeString(date) {
  if (!date) return "";
  const s = date.toISOString();
  return s.slice(0, s.lastIndexOf(":"));
}
