import { Bell, ChevronDown, LogOut } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import nextfliximg from "../assets/netflix.png"
import { SearchBar } from "./SearchBar"
import { useAuth } from "../context/AuthContext"

const NAV_LINKS = [
    { label: "Home", active: true },
    { label: "Tv Shows" },
    { label: "Movies" },
    { label: "My list" }
]

export const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSignout = async () => {
        await logout()
        setOpen(false)
        navigate("/")
    }

    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-20 p-2">
                <a href="/home">
                    <img src={nextfliximg} alt="nextfliximg" className="cursor-pointer px-4 py-2 items-center" />
                </a>
                <ul className="flex gap-6">
                    {NAV_LINKS.map((link) => (
                        <li
                            className="cursor-pointer text-neutral-300 font-semibold hover:text-white hover:font-bold items-center"
                            key={link.label}
                        >
                            {link.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-center gap-6 p-2">
                <SearchBar />
                <span className="cursor-pointer text-black font-semibold hover:text-white hover:font-bold">
                    Kids
                </span>
                <button className="cursor-pointer text-black font-semibold hover:text-white hover:font-bold">
                    <Bell />
                </button>
                <div ref={dropdownRef} className="relative">
                    <div
                        className="flex items-center gap-1.5 cursor-pointer group"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-800" />
                        <button className="cursor-pointer text-black font-semibold group-hover:text-white">
                            <ChevronDown
                                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>

                    {open && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md bg-black/95 border border-neutral-800 shadow-lg py-2 z-50">
                            <div className="px-4 py-2 border-b border-neutral-800">
                                <p className="text-xs text-neutral-400">Signed in as</p>
                                <p className="text-sm text-white truncate">
                                    {user?.email ?? "Guest"}
                                </p>
                            </div>
                            <button
                                onClick={handleSignout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-800 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign out of Netflix
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
