const cache = new Map()

export const getCached = (key) => cache.get(key)

export const cached = async (key, fetcher) => {
    if (cache.has(key)) return cache.get(key)
    const data = await fetcher()
    cache.set(key, data)
    return data
}
