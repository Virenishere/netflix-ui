import { Play, Plus } from "lucide-react"

export default function ShowCard({ show, onClick }) {
  const image  = show.primaryImage?.url || "/placeholder.jpg"
  const name   = show.primaryTitle      || "Unknown"
  const year   = show.startYear         || ""
  const rating = show.rating?.aggregateRating?.toFixed(1) || null
  const type   = show.type              || ""

  return (
    <div
      onClick={onClick}
      className="relative w-[200px] sm:w-[230px] aspect-video flex-shrink-0 rounded-md overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105"
    >
      <img
        src={image}
        alt={name}
        onError={(e) => { e.target.src = "/placeholder.jpg" }}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3">
        <p className="text-white text-sm font-semibold truncate">{name}</p>

        <div className="flex items-center gap-2 mt-1 text-xs">
          {rating && <span className="text-green-500 font-semibold">⭐ {rating}</span>}
          {year && <span className="text-neutral-300">{year}</span>}
          {type && <span className="px-1 border border-neutral-500 text-neutral-300 text-[10px]">{type}</span>}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClick?.() }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-white/80 transition-colors"
            aria-label="Play"
          >
            <Play className="w-4 h-4 fill-black" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-400 text-white hover:border-white transition-colors"
            aria-label="Add to My List"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
