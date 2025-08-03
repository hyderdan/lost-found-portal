import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/login.css'; 
const Login = () => {
    const Nav = useNavigate();      
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Handle login logic
    Nav('/');
  };
    return (
        <div className="page-container">
            <div className="form-wrapper">
                {/* Header */}
                <div className="header">
                    <div className="header-icon-container">
                        <LogIn className="header-icon" />
                    </div>
                    <h2 className="header-title">Welcome Back</h2>
                    <p className="header-description">Sign in to your Lost & Found account</p>
                </div>

                {/* Login Form */}
                <div className="form-card">
                    <form onSubmit={handleSubmit} className="form">
                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="📧 Enter your email"
                                    className="form-input"
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
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="🔒 Enter your password"
                                    className="form-input password-input"
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

                        {/* Remember Me & Forgot Password */}
                        <div className="form-options">
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="checkbox"
                                />
                                <label htmlFor="remember" className="checkbox-label">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            <LogIn className="icon" />
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">
                        <div className="divider-line" />
                        <div  className="divider-text">
                            <span>Don't have an account?</span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="register-container">
                        <Link
                            to="/register"
                            className="register-link"
                        >
                            Create a new account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;