const allowedBookingHosts = new Set(["opentable.com", "www.opentable.com"]);

export function getValidatedBookingUrl(value = process.env.NEXT_PUBLIC_OPENTABLE_URL): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const isHttps = url.protocol === "https:";
    const isApprovedHost = allowedBookingHosts.has(url.hostname.toLowerCase());
    return isHttps && isApprovedHost ? url.toString() : null;
  } catch {
    return null;
  }
}
