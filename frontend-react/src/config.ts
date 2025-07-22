declare var process: { env: { [key: string]: string | undefined } };

export const baseUrl =
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : (typeof process !== "undefined" && process.env && process.env.VITE_API_BASE_URL) || ""; 