import { cached } from "./cache"

const BASE = 'https://api.imdbapi.dev'

export const fetchTitle = (id) =>
    cached(`title:${id}`, () =>
        fetch(`${BASE}/titles/${id}`).then((r) => r.json())
    )

export const fetchTitleImages = (id) =>
    cached(`images:${id}`, () =>
        fetch(`${BASE}/titles/${id}/images`).then((r) => r.json())
    )

export const searchTitles = (query) =>
    cached(`search:${query}`, () =>
        fetch(`${BASE}/search/titles?query=${query}`).then((r) => r.json())
    )
