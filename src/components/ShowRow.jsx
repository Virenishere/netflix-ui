import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { searchTitles } from "../utils/api"
import { getCached } from "../utils/cache"
import ShowCard from "./ShowCard"

export const ShowRow = ({ title, query }) => {
    const initial = getCached(`search:${query}`)?.titles || []
    const [shows, setShows] = useState(initial)
    const [loading, setLoading] = useState(initial.length === 0)
    const rowRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (shows.length > 0) return
        searchTitles(query).then((data) => {
            setShows(data.titles || [])
            setLoading(false)
        })
    }, [query])

    const scroll = (direction) => {
        if (!rowRef.current) return
        const amount = rowRef.current.clientWidth * 0.8
        rowRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        })
    }

    return (
        <div className="mb-10 group/row">
            <h2 className="text-white text-lg md:text-xl font-bold mb-3 px-4 md:px-14">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-0 bottom-0 z-30 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-auto scroll-smooth px-4 md:px-14 py-8 -my-8 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {loading
                        ? Array(8).fill(0).map((_, i) => (
                            <div
                                key={i}
                                className="w-[200px] sm:w-[230px] aspect-video flex-shrink-0 bg-neutral-800 rounded-md animate-pulse"
                            />
                        ))
                        : shows.map((show) => (
                            <ShowCard
                                key={show.id}
                                show={show}
                                onClick={() => navigate(`/home/show/${show.id}`)}
                            />
                        ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-0 bottom-0 z-30 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    )
}
