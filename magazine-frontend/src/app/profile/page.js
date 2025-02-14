'use client';
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error('Not logged in, Login first.');
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchSubscriptions = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/getUserSubscriptions',
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if (!response.ok)
                    throw new Error('Failed to fetch subscriptions');

                const data = await response.json();
                setSubscriptions(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
        fetchSubscriptions();
    }, []);

    const cancelSubscription = async (subscriptionId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/cancel/${subscriptionId}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (!response.ok) throw new Error('Failed to cancel subscription');

            setSubscriptions(
                subscriptions.filter((sub) => sub._id !== subscriptionId)
            );
        } catch (err) {
            console.error('Error canceling subscription:', err);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl text-center">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : error ? (
                    <div>
                        <p className="text-red-500">{error}</p>
                        <button
                            onClick={() => (window.location.href = '/login')}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                            Login
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-3xl font-semibold mt-4">
                            {user.name}
                        </h2>
                        <p className="text-gray-600 text-lg">{user.email}</p>

                        {/* Subscriptions Section */}
                        <div className="mt-6 w-full">
                            <h3 className="text-2xl font-semibold mb-4 text-left">
                                Your Subscriptions
                            </h3>
                            {subscriptions.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {subscriptions.map((sub) => (
                                        <div
                                            key={sub._id}
                                            className="bg-gray-50 p-5 rounded-lg shadow-md">
                                            <h4 className="text-lg font-medium">
                                                {sub.magazine_id.name}
                                            </h4>
                                            <p className="text-gray-600">
                                                Plan: {sub.plan_id.title}
                                            </p>
                                            <p className="text-gray-600">
                                                Discount:{' '}
                                                {sub.plan_id.discount * 100}%
                                            </p>
                                            <p className="text-gray-600">
                                                Price: ${sub.price.toFixed(2)}
                                            </p>
                                            <p className="text-gray-600">
                                                Renewal Date:{' '}
                                                {new Date(
                                                    sub.renewal_date
                                                ).toLocaleDateString()}
                                            </p>

                                            <div className="flex flex-col mt-3">
                                                <button
                                                    onClick={() =>
                                                        (window.location.href = `/subscribe?id=${sub.magazine_id._id}`)
                                                    }
                                                    className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                                    Change Plan
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        cancelSubscription(
                                                            sub._id
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                                    Cancel Subscription
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-lg">
                                    You have no active subscriptions.
                                </p>
                            )}
                        </div>

                        {/* Logout Button */}
                        <div className="mt-6">
                            <button
                                onClick={() => {
                                    fetch('http://localhost:5000/logout', {
                                        method: 'GET',
                                        credentials: 'include',
                                    })
                                        .then(() => {
                                            localStorage.removeItem('token');
                                            window.location.href = '/login';
                                        })
                                        .catch((err) => console.error(err));
                                }}
                                className="mt-4 px-6 py-3 bg-red-500 text-white text-lg rounded-md hover:bg-red-600 transition">
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
