import { useState, useEffect } from "react";
import api from "../API/axios.js";
import { useNavigate } from "react-router";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load cart
    const loadCart = async () => {
        try {
            if (!userId) {
                setCart(null);
                setLoading(false);
                return;
            }

            const res = await api.get(`/cart/${userId}`);
            setCart(res.data);
        } catch (error) {
            console.error("Load cart error:", error);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // Remove item
    const removeItem = async (productId) => {
        try {
            await api.post(`/cart/remove`, { userId, productId });
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Remove item error:", error);
        }
    };

    // Update quantity
    const updateQty = async (productId, quantity) => {
        if (quantity < 1) return;

        try {
            await api.post(`/cart/update`, { userId, productId, quantity });
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Update quantity error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] text-white">
                Loading your cart...
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] text-white">
                <h1 className="text-3xl font-bold mb-3">Your Cart is Empty 🛒</h1>
                <p className="text-gray-400 mb-6">Start exploring futuristic tech products.</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-semibold"
                >
                    Go to Store
                </button>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] px-6 py-14 text-white">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* LEFT - CART ITEMS */}
                <div className="lg:col-span-2 space-y-6">

                    <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Your Cart
                    </h1>

                    {cart.items.map((item) => (
                        <div
                            key={item.productId._id}
                            className="flex flex-col md:flex-row gap-6 items-center justify-between
                                       bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5
                                       shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                        >

                            {/* Product */}
                            <div className="flex items-center gap-4 w-full md:w-1/2">
                                <div className="w-24 h-24 bg-black/30 rounded-xl flex items-center justify-center overflow-hidden">
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.title}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg">
                                        {item.productId.title}
                                    </h2>
                                    <p className="text-cyan-400 font-bold">
                                        ₹{item.productId.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() =>
                                        updateQty(item.productId._id, item.quantity - 1)
                                    }
                                    disabled={item.quantity === 1}
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition disabled:opacity-40"
                                >
                                    −
                                </button>

                                <span className="font-bold text-lg w-6 text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        updateQty(item.productId._id, item.quantity + 1)
                                    }
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition"
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal */}
                            <div className="font-bold text-cyan-400 text-lg">
                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeItem(item.productId._id)}
                                className="text-red-400 hover:text-red-500 transition"
                            >
                                ✕ Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* RIGHT - ORDER SUMMARY */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-fit
                shadow-[0_0_30px_rgba(168,85,247,0.12)]
                self-start relative top-6 lg:sticky lg:top-32">


                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="flex justify-between text-gray-300 mb-2">
                        <span>Items</span>
                        <span>{cart.items.length}</span>
                    </div>

                    <div className="flex justify-between text-gray-300 mb-4">
                        <span>Delivery</span>
                        <span className="text-green-400">FREE</span>
                    </div>

                    <div className="border-t border-white/10 my-4"></div>

                    <div className="flex justify-between text-xl font-extrabold text-cyan-400 mb-6">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout-address")}
                        className="w-full py-3 rounded-xl font-semibold text-black
                                   bg-gradient-to-r from-cyan-500 to-purple-600
                                   hover:scale-105 transition
                                   shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                    >
                        Proceed to Checkout
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        Secure checkout • Encrypted payments • Fast delivery
                    </p>
                </div>

            </div>
        </div>
    );
}
