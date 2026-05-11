import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return children
}
