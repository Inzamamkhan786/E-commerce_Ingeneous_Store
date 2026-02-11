import { useEffect, useState } from "react";
import api from "../API/axios.js";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const loadProduct = async () => {
        try {
            const res = await api.get("/products");
            const product = res.data.find((p) => p._id === id);

            if (product) {
                setForm({
                    title: product.title || "",
                    description: product.description || "",
                    price: product.price || "",
                    category: product.category || "",
                    image: product.image || "",
                    stock: product.stock || "",
                });
            } else {
                alert("Product not found");
                navigate("/admin/products");
            }
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/products/update/${id}`, {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            });

            alert("Product updated successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
