import { ICacheStrategy } from './strategies/icache.strategy';
import { InMemoryCacheStrategy } from './strategies/impl/in-memory-cache.strategy';

export class CacheService<T> implements ICacheStrategy<T> {
  private strategy: ICacheStrategy<T>;

  constructor(strategy: ICacheStrategy<T> = new InMemoryCacheStrategy<T>()) {
    this.strategy = strategy;
  }

  get(key: string): T | null {
    return this.strategy.get(key);
  }

  set(key: string, data: T, ttlMinutes?: number): void {
    this.strategy.set(key, data, ttlMinutes);
  }

  delete(key: string): void {
    this.strategy.delete(key);
  }

  clear(): void {
    this.strategy.clear();
  }
}
