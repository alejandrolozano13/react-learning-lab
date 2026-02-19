export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError };

export type AppError =
  | { kind: "network"; message: string }
  | { kind: "timeout"; message: string }
  | { kind: "aborted"; message: string }
  | { kind: "unknown"; message: string };