// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', userType: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, userType } = formData;

        // Check if the user is logging in as admin
        if (userType === 'admin' && email === 'admin@gmail.com' && password === 'admin123') {
            navigate('/dashboard');
        } else {
            try {
                const response = await fetch('http://localhost:8005/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful', data);
                    navigate('/'); 
                } else {
                    const data = await response.json();
                    setError(data.message || 'Login failed');
                }
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('An error occurred during login');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg border-0 p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-header bg-dark text-white text-center">
                    <h2 className="h4">Login</h2>
                </div>
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* User Type Selection */}
                        <div className="mb-3">
                            <label className="form-label">Login as</label>
                            <div>
                                <input
                                    type="radio"
                                    id="admin"
                                    name="userType"
                                    value="admin"
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="admin" className="ms-2">Admin</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="user"
                                    name="userType"
                                    value="user"
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="user" className="ms-2">User</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark w-100">
                            Login
                        </button>
                    </form>
                </div>
                <div className="card-footer text-center text-muted">
                    <small>
                        Don’t have an account? <a href="/register" className="text-dark">Register here</a>.
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;
