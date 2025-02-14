'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const response = await fetch('http://localhost:5000/magazines');
                const data = await response.json();
                setMagazines(data);
            } catch (error) {
                console.error('Error fetching magazines:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMagazines();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
            <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
                Available Magazines
            </h1>

            {loading ? (
                <p className="text-center text-gray-700 text-lg">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {magazines.map((magazine) => (
                        <div
                            key={magazine._id}
                            className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="p-5">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {magazine.name}
                                </h2>
                                <p className="text-gray-600 mt-2 line-clamp-3">
                                    {magazine.description}
                                </p>
                                <p className="mt-4 font-bold text-green-600 text-lg">
                                    ${magazine.base_price.toFixed(2)} / month
                                </p>
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/subscribe?id=${magazine._id}`
                                        )
                                    }
                                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-center shadow-md hover:bg-blue-700 transition">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
