import { injectable } from "inversify";

import { LRUCache } from "lru-cache";


//seconds
const cache = new LRUCache<any, any>({
    ttl: 1000 * 60 * 5,
    maxSize: 5000,
    sizeCalculation: i => JSON.stringify(i).length
})

@injectable()
export class CacheService<T = any> implements ICacheService<T> {
    constructor() { }

    get = (key: string) => {
        return cache.get(key) ?? null
    }
    set = (key: string, item: T) => {
        cache.set(key, item)
    }

}

