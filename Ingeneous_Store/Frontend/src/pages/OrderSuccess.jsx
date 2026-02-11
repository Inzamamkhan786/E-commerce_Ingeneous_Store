import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
    const { id } = useParams();
    const [showTick, setShowTick] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowTick(true), 300);      // circle pop
        setTimeout(() => setShowContent(true), 900);  // text show
    }, []);

    const goHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050816] via-[#0b1c3d] to-[#12002b] text-white">

            <div className="flex flex-col items-center">

                {/* Animated Tick */}
                <div className={`success-circle ${showTick ? "show" : ""}`}>
                    ✔
                </div>

                {/* Content */}
                {showContent && (
                    <div className="mt-6 text-center animate-fade">

                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Order Placed Successfully
                        </h1>

                        <p className="mt-4 text-gray-300">
                            Your Order ID: <span className="text-cyan-400 font-semibold">{id}</span>
                        </p>

                        <button
                            onClick={goHome}
                            className="mt-8 px-8 py-3 rounded-xl font-semibold text-black
                                       bg-gradient-to-r from-cyan-500 to-purple-600
                                       hover:scale-105 transition
                                       shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>

            {/* CSS */}
            <style>{`
                .success-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    border: 4px solid #22d3ee;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 64px;
                    color: #22d3ee;
                    box-shadow: 0 0 30px rgba(34,211,238,0.6);
                    transform: scale(0);
                    opacity: 0;
                    transition: all 0.4s ease;
                }

                .success-circle.show {
                    transform: scale(1);
                    opacity: 1;
                }

                .animate-fade {
                    animation: fadeIn 0.7s ease forwards;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
