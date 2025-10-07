export interface ICacheStrategy<T> {
  get(key: string): T | null;
  set(key: string, data: T, ttlMinutes?: number): void;
  delete(key: string): void;
  clear(): void;
}
