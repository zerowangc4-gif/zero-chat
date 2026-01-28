export const getErrorMessage = (error: unknown): string => {
  if (!error) return "";

  if (typeof error === "string") return error;

  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const obj = error as Record<string, unknown>;
    if (obj.message) return String(obj.message);
    if (obj.msg) return String(obj.msg);
    if (obj.error) return String(obj.error);
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};
