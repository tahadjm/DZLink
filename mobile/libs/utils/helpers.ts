export function formatRelativeDate(isoDate: string): string {
  try {
    const then = new Date(isoDate).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - then) / 1000);

    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays < 7) return `${diffDays}d`;
    // show short date for older items
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function getInitials(title: string) {
  if (!title) return "";
  const parts = title.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}