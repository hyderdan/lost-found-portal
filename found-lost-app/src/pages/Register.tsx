import React from 'react';
import axios from "axios"; // Ensure this is imported at the top
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-hot-toast'
import './styles/register.css';
interface FormData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    termsAccepted?: string;
}

const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [formData, setFormData] = React.useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false
    });

    const [errors, setErrors] = React.useState<FormErrors>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        termsAccepted: ''
    });

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        } else if (formData.fullName.length > 50) {
            newErrors.fullName = 'Full name must be less than 50 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (formData.phone.length < 10) {
            newErrors.phone = 'Phone number must be at least 10 digits';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
        }

        // Terms validation
        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (field: keyof FormData, value: string | boolean): string | undefined => {
        switch (field) {
            case 'fullName':
                const nameValue = value as string;
                if (!nameValue.trim()) return 'Full name is required';
                if (nameValue.length < 2) return 'Full name must be at least 2 characters';
                if (nameValue.length > 50) return 'Full name must be less than 50 characters';
                break;

            case 'email':
                const emailValue = value as string;
                if (!emailValue.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) return 'Please enter a valid email address';
                break;

            case 'phone':
                const phoneValue = value as string;
                if (!phoneValue.trim()) return 'Phone number is required';
                if (phoneValue.length < 10) return 'Phone number must be at least 10 digits';
                if (!/^\+?[\d\s-()]+$/.test(phoneValue)) return 'Please enter a valid phone number';
                break;

            case 'password':
                const passwordValue = value as string;
                if (!passwordValue) return 'Password is required';
                if (passwordValue.length < 8) return 'Password must be at least 8 characters';
                if (!/(?=.*[a-z])/.test(passwordValue)) return 'Password must contain at least one lowercase letter';
                if (!/(?=.*[A-Z])/.test(passwordValue)) return 'Password must contain at least one uppercase letter';
                if (!/(?=.*\d)/.test(passwordValue)) return 'Password must contain at least one number';
                break;

            case 'confirmPassword':
                const confirmValue = value as string;
                if (!confirmValue) return 'Please confirm your password';
                if (formData.password !== confirmValue) return "Passwords don't match";
                break;

            case 'termsAccepted':
                const termsValue = value as boolean;
                if (!termsValue) return 'You must accept the terms and conditions';
                break;
        }
        return undefined;
    };


    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        };
        const error = validateField(field, value);
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };
    const handleBlur = (field: keyof FormData) => {
        // Validate on blur for better UX
        const error = validateField(field, formData[field]);
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const PostingData = {
                Fullname: formData.fullName,
                email: formData.email,
                PhoneNo: formData.phone,
                password: formData.password
            };
            const response = await axios.post('http://localhost:3000/register/signUp', PostingData);
            toast.success("Registration Successful! Your account has been registered.", response.data.message);
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                termsAccepted: false
            });
        } catch (error) {
            toast.error("Registration Failed. Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="page-container">
            <div className="form-wrapper">
                {/* Header */}
                <div className="header">
                    <div className="header-icon-container">
                        <UserPlus className="header-icon" />
                    </div>
                    <h2 className="header-title">Create Account</h2>
                    <p className="header-description">Join the Lost & Found community</p>
                </div>

                {/* Register Form */}
                <div className="form-card">
                    <form onSubmit={handleSubmit} className="form">
                        {/* Full Name Field */}
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label ">
                                Full Name
                            </label>
                            <div className="input-container">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    onBlur={() => handleBlur('fullName')}
                                    placeholder="👤 Enter your full name"
                                    className="form-input"
                                    required
                                />
                            </div>
                            {errors.fullName && (
                                <p className="text-red-500">{errors.fullName}</p>
                            )}
                        </div>

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
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="📧 Enter your email"
                                    className="form-input"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="📞 Enter your phone number"
                                    className="form-input"
                                    required
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500">{errors.phone}</p>
                            )}
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
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="🔒 Create a password"
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
                            {errors.password && (
                                <p className=" text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <div className="input-container">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    placeholder="🔒 Confirm your password"
                                    className="form-input password-input"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="toggle-password"
                                >
                                    {showConfirmPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-group">
                            <div className="terms-container">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                    className="checkbox"
                                    required
                                />
                                <label htmlFor="terms" className="checkbox-label">
                                    I agree to the{' '}
                                    <Link to="/terms" className="terms-link">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                            {errors.termsAccepted && (
                                <p className="error-message">{errors.termsAccepted}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            <UserPlus className="icon" />
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">
                        <div className="divider-line" />
                        <div className="divider-text">
                            <span>Already have an account?</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="logIn-container">
                        <Link
                            to="/login"
                            className="logIn-link text-blue-500"
                        >
                            Sign in to your account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;