import { Outlet } from "react-router"
import { Info, Play } from "lucide-react"
import { Navbar } from "../components/Navbar"
import { ShowRow } from "../components/ShowRow"
import homebg from "../assets/homebg.png"
import hero1 from "../assets/nserieshero1.png"
import hero2 from "../assets/showlogohero2.png"
import hero3 from "../assets/top10hero3.png"

export const Home = () => {
    return (
        <div className="min-h-screen bg-black">
            <div
                className="relative min-h-screen bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${homebg})` }}
            >
                <Navbar />

                <div className="flex flex-col justify-center min-h-screen px-14">
                    <img src={hero1} alt="N Series" className="w-32 mb-3" />
                    <img src={hero2} alt="Show logo" className="w-full max-w-lg mb-4" />

                    <div className="flex items-center gap-3 mb-4">
                        <img src={hero3} alt="Top 10" className="w-10" />
                        <span className="text-white font-bold">#1 in TV Shows Today</span>
                    </div>

                    <p className="text-white text-lg mb-6 max-w-xl leading-relaxed">
                        Determined to protect a young patient who escaped a mysterious cult, a psychiatrist takes the girl in, putting her own family — and life — in danger.
                    </p>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 rounded hover:bg-white/80">
                            <Play className="w-5 h-5 fill-black" />
                            Play
                        </button>
                        <button className="flex items-center gap-2 bg-neutral-500/60 text-white font-semibold px-6 py-2 rounded hover:bg-neutral-500/40">
                            <Info className="w-5 h-5" />
                            More Info
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 -mt-24 pb-10">
                <ShowRow title="Popular on Netflix" query="stranger" />
                <ShowRow title="Trending Now" query="dark" />
                <ShowRow title="Top Picks for You" query="breaking" />
            </div>

            <Outlet />
        </div>
    )
}
