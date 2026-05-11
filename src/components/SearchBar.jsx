import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

export const SearchBar = () => {
    const navigate = useNavigate()
    const [data, setData] = useState("")
    const [error, setError] = useState("")

    const handleSearch = (e) => {
        e?.preventDefault()
        const trimmed = data.trim().replace(/\s+/g, " ")
        if (!trimmed) {
            setError("Please enter something")
            return
        }
        setError("")
        navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="border border-neutral-600 bg-black/60 text-white px-3 py-1 rounded text-sm outline-none focus:border-white"
                placeholder="Search..."
            />
            <button type="submit" aria-label="Search">
                <Search className="h-5 w-5" />
            </button>
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </form>
    )
}
