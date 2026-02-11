import { useState } from "react";
import api from "../API/axios.js";
import { useNavigate } from "react-router";

export default function AddProduct() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();//Prevents the default browser behavior (page reload on form submit) Keeps the app single - page(important in React)
        try {
            setLoading(true);

            await api.post("/products/add", {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            });

            alert("Product added successfully!");
            navigate("/admin/products");
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] flex items-center justify-center px-4 text-white">

            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]">

                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Add New Product
                </h2>

                <p className="text-gray-400 text-center mb-8">
                    Enter product details to publish on store
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <Input label="Product Title" name="title" value={form.title} onChange={handleChange} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} />
                        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
                    </div>

                    <Input label="Category" name="category" value={form.category} onChange={handleChange} />
                    <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />

                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter product description"
                            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10
                                       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-4 py-3 rounded-xl font-semibold text-black
                                   bg-gradient-to-r from-cyan-500 to-purple-600
                                   hover:scale-[1.02] transition
                                   shadow-[0_0_25px_rgba(34,211,238,0.5)]
                                   disabled:opacity-50"
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>

                </form>

                <p className="text-xs text-gray-400 text-center mt-5">
                    ⚡ Admin panel • Live store update
                </p>
            </div>
        </div>
    );
}

/* Reusable input */
function Input({ label, name, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
        </div>
    );
}
