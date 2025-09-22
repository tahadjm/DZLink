export function truncateText(
  text: string,
  maxLength: number,
  ellipsis: string = " …"
): string {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  const shortened = text.slice(0, maxLength);

  const lastSpaceIndex = shortened.lastIndexOf(" ");
  if (lastSpaceIndex === -1) return shortened + ellipsis;

  return shortened.slice(0, lastSpaceIndex) + ellipsis;
}