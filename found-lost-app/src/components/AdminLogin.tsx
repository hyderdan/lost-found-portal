import React, { useState } from 'react';
import { Shield, Eye, EyeOff, User, Lock } from 'lucide-react';
import '../pages/styles/adminlogin.css';
type AdminLoginProps = {
    onLoginSuccess: () => void;
};

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
    const [formData, setFormData] = useState({
        adminId: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock admin credentials - in a real app, this would be handled by a backend
    const ADMIN_CREDENTIALS = {
        adminId: 'admin',
        password: 'admin123'
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (formData.adminId === ADMIN_CREDENTIALS.adminId &&
            formData.password === ADMIN_CREDENTIALS.password) {
            alert('Login successful!');
            onLoginSuccess();
        } else {
            alert('Invalid Admin ID or Password. Please try again.');
            setFormData({ adminId: '', password: '' });
        }

        setIsLoading(false);
    };

    return (
        <div className="al-page-container">
            <div className="al-card">
                <div className="card-header">
                    <div className="header-icon-container">
                        <Shield className="header-icon" />
                    </div>
                    <h2 className="card-title">Admin Access</h2>
                    <p className="header-description">Enter your admin credentials to continue</p>
                </div>

                <div className="card-content">
                    <form onSubmit={handleSubmit} className="form">
                        {/* Admin ID Field */}
                        <div className="form-group">
                            <label htmlFor="adminId" className="form-label">
                                Admin ID
                            </label>
                            <div className="input-container">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    id="adminId"
                                    name="adminId"
                                    value={formData.adminId}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin ID"
                                    className="form-input input-pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-container">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    className="form-input input-pl-10 input-pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                >
                                    {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="submit-button"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Demo credentials info */}
                    <div className="demo-info">
                        {/* <p className="demo-text">
                            <strong>Demo credentials:</strong><br />
                            Admin ID: admin<br />
                            Password: admin123
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;