// import React from "react";
import { Plus, Search, Eye, Edit, Trash2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./styles/dashboard.css"; // Assuming you have a CSS file for styles


const Dashboard = () => {
    const userStats = {
        totalPOst: 5,
        activePosts: 3,
        resolvesd: 2,
        messages: 10,
    }
    const userPosts = [
        {
            id: 1,
            title: "Lost Wallet",
            status: "lost",
            date: "2023-10-01",
            location: "Central Park",
            views: 15,
            messages: 2,
            isActive: true
        },
        {
            id: 2,
            title: "Found Phone",
            status: "found",
            date: "2023-10-02",
            location: "Downtown",
            views: 20,
            messages: 5,
            isActive: true
        },
        {
            id: 3,
            title: "Lost Keys",
            status: "lost",
            date: "2023-10-03",
            location: "Library",
            views: 10,
            messages: 1,
            isActive: false
        }
    ]
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">My Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your lost and found posts</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Total Posts</p>
                                <p className="stats-value">{userStats.totalPOst}</p>
                            </div>
                            <div className="icon-bg blue">
                                <Eye className="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Active Posts</p>
                                <p className="stats-value green">{userStats.activePosts}</p>
                            </div>
                            <div className="icon-bg green">
                                <Search className="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Resolved</p>
                                <p className="stats-value purple">{userStats.resolvesd}</p>
                            </div>
                            <div className="icon-bg purple">
                                <Plus className="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Messages</p>
                                <p className="stats-value orange">{userStats.messages}</p>
                            </div>
                            <div className="icon-bg orange">
                                <MessageCircle className="icon" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="actions-card">
                    <h2 className="actions-title">Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/postItem" className="Dash-action-button blue-btn">
                            <Plus className="icon small" />
                            <div>
                                <h3 className="action-label">Post New Item</h3>
                                <p className="action-desc">Report a lost or found item</p>
                            </div>
                        </Link>
                        <Link to="/searchItems" className="Dash-action-button green-btn">
                            <Search className="icon small" />
                            <div>
                                <h3 className="action-label">Search Items</h3>
                                <p className="action-desc">Browse lost and found items</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* My Posts */}
                <div className="posts-table-container">
                    <div className="posts-header">
                        <h2 className="posts-title">My Posts</h2>
                    </div>
                    <div className="table-scroll">
                        <table className="posts-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Engagement</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userPosts.map((post) => (
                                    <tr key={post.id} className={!post.isActive ? 'inactive' : ''}>
                                        <td>{post.title}</td>
                                        <td>
                                            <span className={`badge ${post.status === 'lost' ? 'lost' : 'found'}`}>
                                                {post.status === 'lost' ? 'Lost' : 'Found'}
                                            </span>
                                        </td>
                                        <td>{post.date}</td>
                                        <td>{post.location}</td>
                                        <td>
                                            <div className="engagement">
                                                <span><Eye className="icon tiny" />{post.views}</span>
                                                <span><MessageCircle className="icon tiny" />{post.messages}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions-buttons">
                                                <button className="action-icon blue"><Eye className="icon tiny" /></button>
                                                <button className="action-icon green"><Edit className="icon tiny" /></button>
                                                <button className="action-icon red"><Trash2 className="icon tiny" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default Dashboard;