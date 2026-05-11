import { useState } from "react"
import { useNavigate } from "react-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import backgroundimg from "../assets/Signupbackground.png"

export const Signin = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) =>{
        e.preventDefault()
        setError("")
        setLoading(true)
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home')
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${backgroundimg})` }}
        >
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative flex items-center justify-center min-h-screen px-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-[450px] bg-black/75 rounded-md px-8 py-12"
                >
                    <h1 className="text-white text-3xl font-bold mb-7">Sign In</h1>

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full h-12 px-4 rounded bg-neutral-800 text-white border border-transparent"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full h-12 px-4 rounded bg-neutral-800 text-white border border-transparent"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 mt-6 rounded bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>


                </form>
            </div>
        </div>
    )
}
