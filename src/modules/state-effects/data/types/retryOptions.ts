export type RetryOptions = {
    attempts: number;
    baseDelayMs: number;
    signal?: AbortSignal;
}