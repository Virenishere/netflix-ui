import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Play } from "lucide-react"
import { fetchTitle } from "../utils/api"
import { Navbar } from "../components/Navbar"

export const ShowDetail = () => {
    const { id } = useParams()
    const [show, setShow] = useState(null)

    useEffect(() => {
        fetchTitle(id).then(setShow)
    }, [id])

    if (!show) {
        return (
            <div className="min-h-screen bg-black text-neutral-400 flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div
                className="relative h-[60vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${show.primaryImage?.url})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            <div className="relative -mt-32 z-10 px-4 md:px-14 max-w-4xl">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">
                    {show.primaryTitle}
                </h1>

                <div className="flex items-center gap-3 text-sm mb-4">
                    {show.rating?.aggregateRating && (
                        <span className="text-green-500 font-semibold">
                            ⭐ {show.rating.aggregateRating.toFixed(1)}
                        </span>
                    )}
                    {show.startYear && <span className="text-neutral-300">{show.startYear}</span>}
                    {show.type && (
                        <span className="px-2 border border-neutral-500 text-neutral-300 text-xs">
                            {show.type}
                        </span>
                    )}
                </div>

                {show.genres && (
                    <p className="text-neutral-400 text-sm mb-4">
                        {show.genres.join(" • ")}
                    </p>
                )}

                <p className="text-white text-base md:text-lg mb-6 leading-relaxed">
                    {show.plot}
                </p>

                <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-white/80">
                    <Play className="w-5 h-5 fill-black" />
                    Play
                </button>
            </div>
        </div>
    )
}
