import { CACHE_CONFIG } from '../../../config/cache.config';
import { ICacheStrategy } from '../icache.strategy';
import { CacheEntry } from '../models/CacheEntry';

export class InMemoryCacheStrategy<T> implements ICacheStrategy<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private ttl: number;

  constructor(ttlMinutes: number = CACHE_CONFIG.TTL_MINUTES) {
    this.ttl = ttlMinutes * 60 * 1000;
    this.startCleanup();
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && entry.expiry > Date.now()) {
      return entry.data;
    }
    if (entry) {
      this.cache.delete(key);
    }
    return null;
  }

  set(key: string, data: T, ttlMinutes?: number): void {
    const ttl = ttlMinutes ? ttlMinutes * 60 * 1000 : this.ttl;
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private startCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.cache.entries()) {
        if (entry.expiry <= now) {
          this.cache.delete(key);
        }
      }
    }, this.ttl);
  }
}
