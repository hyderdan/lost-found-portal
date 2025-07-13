// import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Plus, Home, User, LogIn, SearchIcon } from 'lucide-react';
import "../pages/styles/navbar.css";



const Navigation = () => {

    const location = useLocation();
    const isActive = (path: String) => location.pathname === path;

    return (
        <nav className="nav">
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
                            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                        >
                            <User className="icon" />
                            Dashboard
                        </Link>
                    </div>

                    <div className="login-container">
                        <Link to="/login" className="login-link">
                            <LogIn className="icon" />
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )

}
export default Navigation;