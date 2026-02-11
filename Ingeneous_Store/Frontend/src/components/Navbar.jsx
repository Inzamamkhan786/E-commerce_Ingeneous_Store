import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../API/axios.js";
import logo from "../assets/online-shopping.png";   // ✅ LOGO IMPORT

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadCart = async () => {
            try {
                if (!userId) {
                    setCartCount(0);
                    return;
                }

                const res = await api.get(`/cart/${userId}`);

                if (!res.data || !res.data.items) {
                    setCartCount(0);
                    return;
                }

                const total = res.data.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                );

                setCartCount(total);
            } catch (error) {
                console.error("Navbar cart load error:", error);
                setCartCount(0);
            }
        };

        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        return () => window.removeEventListener("cartUpdated", loadCart);

    }, [userId]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-black border-b border-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]">

            <div className="w-full px-10 py-4 flex justify-between items-center">

                {/* ✅ LOGO + BRAND */}
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="IngeneousStore Logo"
                        className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />

                    <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Ingeneous<span className="text-white">Store</span>
                    </span>
                </Link>

                {/* Right Section */}
                <div className="flex gap-6 items-center text-white">

                    <Link
                        to="/"
                        className="font-medium tracking-wide hover:text-cyan-400 transition relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="relative group">
                        <span className="text-2xl group-hover:text-cyan-400 transition">
                            🛒
                        </span>

                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-black rounded-full text-xs min-w-[20px] h-[20px] flex items-center justify-center font-bold shadow-md">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {!userId ? (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-cyan-400 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-black hover:opacity-90 transition"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
