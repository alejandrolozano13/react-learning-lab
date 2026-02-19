export type RequestOptions = {
    signal?: AbortSignal,
    failRate?: number, // falhas de rede
    latencyMs?: number // para simular falhas de rede lenta, backend lento ou latencia variando...
}