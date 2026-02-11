import { useState } from "react";
import api from "../API/axios.js";
import { useNavigate } from "react-router";
import Login from "./Login.jsx";


export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", form);
            setMsg(response.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] relative overflow-hidden">

            {/* glowing blobs */}
            <div className="absolute w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl top-10 -left-20"></div>
            <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl bottom-10 -right-20"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_#00f0ff33] w-full max-w-md">

                <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2">
                    Create Account
                </h2>

                <p className="text-center text-gray-400 mb-6 text-sm">
                    Join the future of shopping
                </p>

                {msg && (
                    <div className="mb-4 text-center text-sm font-medium text-cyan-400">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 outline-none transition"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-[1.02] hover:shadow-[0_0_25px_#00f0ff] transition-all duration-300"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account?{" "}
                    <span className="text-cyan-400 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
