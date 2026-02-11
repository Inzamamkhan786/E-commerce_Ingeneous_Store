import { useState, useEffect } from "react";
import api from "../API/axios.js";
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }

        api.get(`/cart/${userId}`).then((res) => setCart(res.data));
        api.get(`/address/${userId}`).then((res) => {
            setAddress(res.data);
            setSelectAddress(res.data[0]);
        });
    }, []);

    if (!cart) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] text-white">
                Loading checkout...
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, i) => sum + i.quantity * i.productId.price,
        0
    );

    const placeOrder = async () => {
        try {
            if (!selectAddress) {
                alert("Please select an address");
                return;
            }

            setLoading(true);

            const res = await api.post("/order/place-order", {
                userId,
                address: selectAddress,
            });

            navigate(`/order-success/${res.data.orderId}`);

        } catch (error) {
            console.error("PLACE ORDER ERROR:", error);
            alert(error.response?.data?.message || "Order failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] px-6 py-14 text-white">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* LEFT - ADDRESS SELECTION */}
                <div className="lg:col-span-2">

                    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Checkout
                    </h1>

                    <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>

                    <div className="space-y-5">
                        {address.map((addr) => {
                            const active = selectAddress?._id === addr._id;

                            return (
                                <div
                                    key={addr._id}
                                    onClick={() => setSelectAddress(addr)}
                                    className={`cursor-pointer p-5 rounded-2xl border backdrop-blur-xl transition-all
                                    ${active
                                            ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center
                                            ${active ? "border-cyan-400" : "border-gray-400"}`}
                                        >
                                            {active && (
                                                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-lg">{addr.fullName}</p>
                                            <p className="text-gray-300 text-sm mt-1">
                                                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                📞 {addr.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT - ORDER SUMMARY */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-fit
                                shadow-[0_0_30px_rgba(168,85,247,0.12)]
                                lg:sticky lg:top-28">

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
                        <span>₹{total}</span>
                    </div>

                    <button
                        disabled={loading}
                        onClick={placeOrder}
                        className="w-full py-3 rounded-xl font-semibold text-black
                                   bg-gradient-to-r from-cyan-500 to-purple-600
                                   hover:scale-105 transition
                                   shadow-[0_0_25px_rgba(34,211,238,0.5)]
                                   disabled:opacity-50"
                    >
                        {loading ? "Placing Order..." : "Place Order (COD)"}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        🔒 Secure checkout • Encrypted payments • Fast delivery
                    </p>
                </div>
            </div>
        </div>
    );
}
