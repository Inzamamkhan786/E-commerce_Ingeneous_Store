import { useState } from "react";
import api from "../API/axios.js";
import { useNavigate } from "react-router";

export default function CheckoutAddress() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveAddress = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await api.post("/address/add", { ...form, userId });
            navigate("/checkout");
        } catch (err) {
            alert("Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] flex items-center justify-center px-4 text-white">

            <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]">

                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
                    Delivery Address
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Enter your shipping details to continue
                </p>

                <form onSubmit={saveAddress} className="space-y-5">

                    <InputField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
                    <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
                    <InputField label="Address Line" name="addressLine" value={form.addressLine} onChange={handleChange} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="City" name="city" value={form.city} onChange={handleChange} />
                        <InputField label="State" name="state" value={form.state} onChange={handleChange} />
                    </div>

                    <InputField label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />

                    <button
                        disabled={loading}
                        className="w-full mt-4 py-3 rounded-xl font-semibold text-black
                                   bg-gradient-to-r from-cyan-500 to-purple-600
                                   hover:scale-[1.02] transition
                                   shadow-[0_0_25px_rgba(34,211,238,0.5)]
                                   disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Continue to Checkout"}
                    </button>

                </form>

                <p className="text-xs text-gray-400 text-center mt-5">
                    🔒 Your information is encrypted & secure
                </p>
            </div>
        </div>
    );
}

/* Reusable futuristic input */
function InputField({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-1">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-cyan-400
                           transition placeholder-gray-500"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        </div>
    );
}
