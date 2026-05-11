import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router"
import { searchTitles } from "../utils/api"
import { Navbar } from "../components/Navbar"
import ShowCard from "../components/ShowCard"

export const Search = () => {
    const [params] = useSearchParams()
    const query = params.get("q") || ""
    const navigate = useNavigate()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query) return
        setLoading(true)
        searchTitles(query).then((data) => {
            setResults(data.titles || [])
            setLoading(false)
        })
    }, [query])

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24 px-4 md:px-14">
                <h1 className="text-white text-2xl font-bold mb-6">
                    Results for "{query}"
                </h1>

                {loading ? (
                    <p className="text-neutral-400">Loading...</p>
                ) : results.length === 0 ? (
                    <p className="text-neutral-400">No results found.</p>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {results.map((show) => (
                            <ShowCard
                                key={show.id}
                                show={show}
                                onClick={() => navigate(`/home/show/${show.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
