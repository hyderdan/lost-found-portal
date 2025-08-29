// import React from "react";
import { Plus, Search, Eye, Edit, Trash2, MessageCircle, Calendar, MapPin, Mail, User, Phone, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./styles/dashboard.css"; // Assuming you have a CSS file for styles
import { useState, useEffect } from 'react';
import axios from "axios";

interface UserProfile {
    Fullname: string;
    email: string;
    PhoneNo: string;
    avatar: string;
    totalPosts: number;
}


const Dashboard = () => {

    const [user, setUser] = useState<UserProfile | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    number: "",
    avatar: "",
    totalPosts: 0
});
    

    const fetchUserData = async () => {
        try {
            const userId = sessionStorage.getItem("userId");

            if (!userId) {
                console.error("User ID not found in sessionStorage");
                return;
            }

            const response = await axios.get(`https://lost-found-portal-podr.onrender.com/register/getAllUsers/${userId}`);
            setUser(response.data.findUser); // Make sure findUser is a user object
            // If you want to see the updated user, use useEffect to log it
        } catch (error) {
            console.error("Error fetching user data");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            console.log("Fetched user:", user);
        }
        if (user) {
        setEditedProfile({
            name: user.Fullname,
            email: user.email,
            number: user.PhoneNo,
            avatar: user.avatar,
            totalPosts: user.totalPosts
        });
    }
    }, [user]);





    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditedProfile({ ...editedProfile, avatar: e.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    


    const handleSaveProfile = async () => {
        try {
            const userId = sessionStorage.getItem("userId");
            if (!userId) {
                console.error("User ID not found in sessionStorage");
                return;
            }
            const response = await axios.put('https://lost-found-portal-podr.onrender.com/register/updateProfile', {
                userId: userId,
                Fullname: editedProfile.name,
                email: editedProfile.email,
                PhoneNo: editedProfile.number,
                avatar: editedProfile.avatar,
                totalPosts: editedProfile.totalPosts
            });
            setUser(response.data.user); // update local state

        } catch (error) {
            console.error("Error saving profile:", error);
        }
        setIsEditDialogOpen(false);
    };

    const userStats = {
        totalPPosts: 5,
        activePosts: 3,
        resolved: 2,
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
                {/* User Profile Info */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                        <button
                            onClick={() => setIsEditDialogOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                        >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Custom Edit Profile Modal */}
                    {isEditDialogOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50"
                                onClick={() => setIsEditDialogOpen(false)}
                            ></div>

                            {/* Modal Content */}
                            <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Edit Profile Information</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ">
                                                {editedProfile.avatar ? (
                                                    <img src={editedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-gray-500 text-xl font-semibold">{editedProfile.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="relative ">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    id="avatar-upload"
                                                />
                                                <button
                                                    type="button"
                                                    className="border border-gray-300 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                                                >
                                                    <Camera className="h-4 w-4 mr-2" />
                                                    Change Photo
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm  font-medium text-gray-700">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={editedProfile.name}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={editedProfile.email}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                            placeholder="Enter your email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="location" className="text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            id="location"
                                            type="text"
                                            value={editedProfile.number}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, number: e.target.value })}
                                            placeholder="Enter your location"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-6">
                                    <button
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveProfile}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center space-x-8">
                        <img
                            src={user?.avatar}
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Full Name</p>
                                    <p className="text-gray-900 font-semibold">{user?.Fullname || "Loading..."}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Mail className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Email</p>
                                    <p className="text-gray-900 font-semibold">{user?.email || "Loading..."}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <Phone className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Phone No</p>
                                    <p className="text-gray-900 font-semibold">{user?.PhoneNo|| "Loading..."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Total Posts</p>
                                <p className="stats-value">{userStats.totalPPosts}</p>
                            </div>
                            <div className="icon-bg blue">
                                <Eye className="d-icon" />
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
                                <Search className="d-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-card-content">
                            <div>
                                <p className="stats-label">Resolved</p>
                                <p className="stats-value purple">{userStats.resolved}</p>
                            </div>
                            <div className="icon-bg purple">
                                <Plus className="d-icon" />
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
                                <MessageCircle className="d-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="actions-card">
                    <h2 className="actions-title">Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/postItem" className="Dash-action-button blue-btn">
                            <Plus className="d-icon small" />
                            <div>
                                <h3 className="action-label">Post New Item</h3>
                                <p className="action-desc">Report a lost or found item</p>
                            </div>
                        </Link>
                        <Link to="/searchItems" className="Dash-action-button green-btn">
                            <Search className="d-icon small" />
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
                                                <span><Eye className="d-icon tiny" />{post.views}</span>
                                                <span><MessageCircle className="d-icon tiny" />{post.messages}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions-buttons">
                                                <button className="action-icon blue"><Eye className="d-icon tiny" /></button>
                                                <button className="action-icon green"><Edit className="d-icon tiny" /></button>
                                                <button className="action-icon red"><Trash2 className="d-icon tiny" /></button>
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