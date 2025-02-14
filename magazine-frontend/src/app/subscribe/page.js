'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SubscribePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const [magazine, setMagazine] = useState(null);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [magazineRes, plansRes] = await Promise.all([
                    fetch(`http://localhost:5000/magazines/${id}`),
                    fetch(`http://localhost:5000/plans`),
                ]);

                if (!magazineRes.ok || !plansRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const magazineData = await magazineRes.json();
                const plansData = await plansRes.json();

                setMagazine(magazineData);
                setPlans(plansData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Failed to load data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    const handleSubscription = async () => {
        if (!selectedPlan) return;

        setSubscribing(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const token = Cookies.get('token');

            const response = await fetch('http://localhost:5000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    magazine_id: id,
                    plan_id: selectedPlan._id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Subscription successful! 🎉');
                setTimeout(() => {
                    router.push('/profile');
                }, 1000);
            } else {
                setErrorMessage('Not logged in. Please login first.');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
            {loading ? (
                <p className="text-xl text-gray-700">Loading...</p>
            ) : magazine ? (
                <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl">
                    <h1 className="text-3xl font-bold text-blue-800 mb-4">
                        {magazine.name}
                    </h1>
                    <p className="text-gray-700">{magazine.description}</p>
                    <p className="mt-4 text-lg font-semibold text-green-600">
                        ${magazine.base_price.toFixed(2)} / month
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                        Choose a Subscription Plan
                    </h2>
                    <div className="space-y-3">
                        {plans.map((plan) => {
                            const discountedPrice =
                                (1 - plan.discount) * magazine.base_price;
                            return (
                                <div
                                    key={plan._id}
                                    onClick={() => setSelectedPlan(plan)}
                                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                                        selectedPlan?._id === plan._id
                                            ? 'border-blue-600 bg-blue-100'
                                            : 'border-gray-300'
                                    }`}>
                                    <div className="w-24 flex-shrink-0 text-center">
                                        <p className="text-3xl font-extrabold text-green-600">
                                            ${discountedPrice.toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            per month
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold">
                                            {plan.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {plan.description}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Renewal: {plan.renewalPeriod}{' '}
                                            month(s) | Discount:{' '}
                                            {plan.discount * 100}%
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {errorMessage && (
                        <p className="mt-4 text-red-600">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="mt-4 text-green-600">{successMessage}</p>
                    )}

                    <button
                        onClick={handleSubscription}
                        disabled={!selectedPlan || subscribing}
                        className={`mt-6 w-full py-2 px-6 rounded-lg font-semibold shadow-md transition ${
                            selectedPlan && !subscribing
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        }`}>
                        {subscribing
                            ? 'Subscribing...'
                            : 'Confirm Subscription'}
                    </button>
                </div>
            ) : (
                <p className="text-xl text-red-500">Magazine not found.</p>
            )}
        </div>
    );
}
