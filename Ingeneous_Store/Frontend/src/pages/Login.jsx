import { useState } from "react";
import { useNavigate } from "react-router"; 
import api from "../API/axios.js"; // ✅ ensure .js

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/auth/login", form);

            // ✅ safe checks
            if (!res.data.token || !res.data.user) {
                setMsg("Invalid server response");
                return;
            }

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);

            setMsg("Login successful 🚀");

            // ✅ refresh navbar cart count
            window.dispatchEvent(new Event("cartUpdated"));

            setTimeout(() => {
                navigate("/");
            }, 800);

        } catch (error) {
            console.error("Login error:", error);
            setMsg(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] relative overflow-hidden">

            {/* glowing background blobs */}
            <div className="absolute w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl top-10 -left-20"></div>
            <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl bottom-10 -right-20"></div>

            {/* glass glowing card */}
            <div className="relative z-10 w-full max-w-sm 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl p-8 
        shadow-[0_0_40px_rgba(0,200,255,0.18)]">

                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Login
                </h2>

                <p className="text-center text-gray-400 text-sm mt-1">
                    Welcome back to the future of shopping
                </p>

                {msg && (
                    <div className="mt-4 text-center text-sm font-medium text-red-400">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg 
              bg-black/40 border border-white/10 
              text-white placeholder-gray-400 
              focus:outline-none focus:border-cyan-400 
              focus:ring-2 focus:ring-cyan-400/50 transition"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg 
              bg-black/40 border border-white/10 
              text-white placeholder-gray-400 
              focus:outline-none focus:border-purple-400 
              focus:ring-2 focus:ring-purple-400/50 transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg font-semibold text-black 
              bg-gradient-to-r from-cyan-400 to-purple-500 
              shadow-[0_0_25px_rgba(139,92,246,0.6)] 
              hover:shadow-[0_0_45px_rgba(139,92,246,0.9)] 
              transition disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-5">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-cyan-400 hover:underline cursor-pointer"
                    >
                        Create Account
                    </span>
                </p>
            </div>
        </div>
    );
}
