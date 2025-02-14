'use client';
import { useState } from 'react';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(null);
    const [passwordResetError, setPasswordResetError] = useState(null);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleResetPassword = async () => {
        setPasswordResetSuccess(null);
        setPasswordResetError(null);
        setPasswordLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/reset-password',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ newPassword }),
                }
            );

            const data = await response.json();

            if (!response.ok)
                throw new Error(data.message || 'Failed to reset password');

            setPasswordResetSuccess('Password reset successful!');
            setNewPassword('');
        } catch (err) {
            setPasswordResetError(err.message);
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

                {/* Password Input */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="flex-1 px-3 py-2 focus:outline-none"
                    />
                    <button
                        onClick={handleResetPassword}
                        disabled={passwordLoading}
                        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition">
                        {passwordLoading ? '...' : 'Reset'}
                    </button>
                </div>

                {/* Success/Error Messages */}
                {passwordResetSuccess && (
                    <p className="text-green-500 mt-2">
                        {passwordResetSuccess}
                    </p>
                )}
                {passwordResetError && (
                    <p className="text-red-500 mt-2">{passwordResetError}</p>
                )}

                {/* Back to Profile */}
                <button
                    onClick={() => (window.location.href = '/profile')}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
                    Back to Profile
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
