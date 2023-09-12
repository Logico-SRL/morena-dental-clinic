type ICacheService<T = any> = {
    get: (key: string) => T | null
    set: (key: string, item: T) => void
}