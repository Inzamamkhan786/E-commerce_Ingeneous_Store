import { useEffect, useState } from "react";
import api from "../API/axios.js";
import { useParams } from "react-router";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const loadProduct = async () => {
        const res = await api.get("/products/");
        const p = res.data.find((item) => item._id === id);
        setProduct(p);
    };

    useEffect(() => {
        loadProduct();
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] text-white">
                Loading product...
            </div>
        );
    }


    const addToCart = async () => {
        try {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                alert("Please log in to add items to your cart.");
                return;
            }

            await api.post("/cart/add", {
                userId,
                productId: product._id
            });

            // Refresh navbar cart count
            window.dispatchEvent(new Event("cartUpdated"));

            alert("Item added to cart ✅");

        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Failed to add item to cart");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] px-6 py-14 text-white">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* IMAGE SECTION */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]">

                    <div className="w-full h-[350px] flex items-center justify-center bg-black/30 rounded-2xl overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-w-full max-h-full object-contain hover:scale-105 transition duration-300"
                        />
                    </div>

                </div>

                {/* INFO SECTION */}
                <div>

                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {product.title}
                    </h1>

                    <p className="text-gray-300 mt-4 leading-relaxed">
                        {product.description || "Experience next-generation performance and futuristic design built for modern tech enthusiasts."}
                    </p>

                    <p className="text-3xl font-extrabold text-cyan-400 mt-6">
                        ₹{product.price}
                    </p>

                    <div className="mt-8 flex gap-4 flex-wrap">

                        <button
                            onClick={addToCart}
                            className="px-8 py-3 rounded-xl font-semibold text-black
               bg-gradient-to-r from-cyan-500 to-purple-600
               hover:scale-105 transition
               shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                        >
                            Add to Cart
                        </button>


                        <button
                            className="px-8 py-3 rounded-xl font-semibold border border-white/20
                                       hover:bg-white/10 transition"
                        >
                            Buy Now
                        </button>

                    </div>

                    {/* Extra highlights */}
                    <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-gray-300">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            ⚡ High Performance Tech
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            🔒 Secure Payments
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            🚚 Fast Delivery
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            💎 Premium Build Quality
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
