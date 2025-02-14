'use client';
import { useState } from 'react';
import Link from 'next/link';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // ✅ Required to send and receive cookies
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setSuccess('Login successful!');
            // Redirect logic can be added here
            // wait 2 sec
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>
                {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                )}
                {success && (
                    <p className="text-green-500 text-center mt-2">{success}</p>
                )}
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <Button
                        text={loading ? 'Logging in...' : 'Login'}
                        onClick={handleSubmit}
                        disabled={loading}
                    />
                </form>
                <p className="text-center text-gray-600 mt-4">
                    New user?{' '}
                    <Link
                        href="/register"
                        className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
