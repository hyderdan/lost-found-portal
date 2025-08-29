// import React from "react";
import { Link, useLocation, } from "react-router-dom";
import { Search, Plus, Home, User, LogIn, SearchIcon, Menu, X } from 'lucide-react';
import "../pages/styles/navbar.css";
import { useState } from "react";




const Navigation = () => {

  
     const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Desktop Navigation */}
            <nav className="nav lg:block md:block sm:hidden hidden">
                <div className="nav-container">
                    <div className="nav-content">
                        <div className="nav-logo">
                            <Link to="/" className="logo-container">
                                <div className="logo-icon">
                                    <SearchIcon className="text-white" />
                                </div>
                                <span className="logo-text">Lost & Found</span>
                            </Link>
                        </div>

                        <div className="nav-links">
                            <Link
                                to="/"
                                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                            >
                                <Home className="icon" />
                                Home
                            </Link>
                            <Link
                                to="/searchItems"
                                className={`nav-link ${isActive('/searchItems') ? 'active' : ''}`}
                            >
                                <Search className="icon" />
                                Search
                            </Link>
                            <Link
                                to="/postItem"
                                className={`nav-link ${isActive('/postItem') ? 'active' : ''}`}
                            >
                                <Plus className="icon" />
                                Post Item
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`nav-link ${isActive('/Dashboard') ? 'active' : ''}`}
                            >
                                <User className="icon" />
                                Dashboard
                            </Link>
                        </div>

                        <div className="login-container">
                            {sessionStorage.getItem('userId') ? (
                                <button
                                    className="login-link"
                                    onClick={() => {
                                        sessionStorage.removeItem('userId');
                                        window.location.reload();
                                    }}
                                >
                                    <LogIn className="icon" />
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="login-link">
                                    <LogIn className="icon" />
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="mobile-nav lg:hidden md:hidden sm:block block">
                <div className="mobile-nav-header">
                    <Link to="/" className="mobile-logo-container">
                        <div className="mobile-logo-icon">
                            <SearchIcon className="text-white w-4 h-4" />
                        </div>
                        <span className="mobile-logo-text">Lost & Found</span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-button"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="mobile-dropdown">
                        <div className="mobile-menu-items">
                            <Link
                                to="/"
                                className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/searchItems"
                                className={`mobile-nav-link ${isActive('/searchItems') ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Search className="w-5 h-5" />
                                <span>Search</span>
                            </Link>
                            <Link
                                to="/postItem"
                                className={`mobile-nav-link ${isActive('/postItem') ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <Plus className="w-5 h-5" />
                                <span>Post Item</span>
                            </Link>
                            <Link
                                to="/Dashboard"
                                className={`mobile-nav-link ${isActive('/Dashboard') ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                <User className="w-5 h-5" />
                                <span>Dashboard</span>
                            </Link>

                            {sessionStorage.getItem("userId") ? (
                                <button
                                    className="mobile-logout-link"
                                    onClick={() => {
                                        sessionStorage.removeItem("userId");
                                        window.location.reload();
                                    }}
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="mobile-login-link"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogIn className="w-5 h-5" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
export default Navigation;