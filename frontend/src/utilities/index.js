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

export function formatCardNumber(num) {
  num = String(num);
  return num.slice(0, 4) + "..." + num.slice(-4);
}

export function formatContent(content, format) {
  switch (format) {
    case "time":
      return getSQLTimeString(new Date(content));
    case "currency":
      return "$" + (Number(content) || 0).toFixed(2);
    case "long":
      content = String(content);
      return content.slice(0, 20) + (content.length > 20 ? "..." : "");
    case "bool":
      return content ? "YES" : "NO";
    default:
      return content;
  }
}
