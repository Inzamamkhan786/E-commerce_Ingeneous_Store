import { useEffect, useState } from "react";
import api from "../API/axios.js";
import { Link } from "react-router";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get(
                `/products?search=${search}&category=${category}`
            );
            setProducts(res.data);
        } catch (err) {
            console.error("Error loading products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Please log in to add items to your cart.");
                return;
            }

            await api.post(`/cart/add`, { userId, productId });
            window.dispatchEvent(new Event("cartUpdated"));

        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Failed to add item to cart");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] p-6 text-white">

            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Explore Future Tech
            </h1>

            {/* Search & Filter */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 justify-center items-center">
                <input
                    placeholder="Search futuristic products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-purple-400
               text-white [&>option]:text-black"
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Tablets">Tablets</option>
                </select>

            </div>

            {/* Product Grid */}
            {loading ? (
                <p className="text-center text-gray-300 animate-pulse">Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">

                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition duration-300 hover:-translate-y-1"
                        >
                            <Link to={`/product/${product._id}`}>

                                {/* Image box */}
                                <div className="w-full h-52 bg-black/30 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain p-3 group-hover:scale-110 transition duration-300"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg truncate">
                                        {product.title}
                                    </h2>
                                    <p className="text-cyan-400 font-bold mt-1">
                                        ₹{product.price}
                                    </p>
                                </div>
                            </Link>

                            {/* Button */}
                            <div className="p-4 pt-0">
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
