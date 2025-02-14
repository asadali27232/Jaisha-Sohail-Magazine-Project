'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in by fetching user profile
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/logout', {
                method: 'GET',
                credentials: 'include',
            });

            setIsAuthenticated(false);
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold">
                        Magazine App
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        <Link href="/profile" className="hover:text-gray-300">
                            Profile
                        </Link>
                        <Link href="/reset" className="hover:text-gray-300">
                            Password Reset
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="hover:text-red-400">
                                Logout
                            </button>
                        ) : (
                            <Link href="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none text-xl">
                        ☰
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="md:hidden bg-gray-800 py-2 px-4 rounded-lg">
                        <Link
                            href="/"
                            className="block py-2 hover:text-gray-300"
                            onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link
                            href="/profile"
                            className="block py-2 hover:text-gray-300"
                            onClick={() => setIsOpen(false)}>
                            Profile
                        </Link>
                        <Link
                            href="/reset"
                            className="block py-2 hover:text-gray-300"
                            onClick={() => setIsOpen(false)}>
                            Password Reset
                        </Link>
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="block py-2 text-red-400 hover:text-red-500">
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block py-2 hover:text-gray-300"
                                onClick={() => setIsOpen(false)}>
                                Login
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
