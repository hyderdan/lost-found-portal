import { Plus, Search, Eye, Edit, Trash2, MessageCircle, Camera, Mail, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import "./styles/dashboard.css";

interface UserProfile {
    Fullname: string;
    email: string;
    PhoneNo: string;
    avatar: string;
    totalPosts: number;
    postedDatas: string[];
}

type ItemType = {
    _id: string;
    title?: string;
    image?: string;
    itemType?: string;
    category?: string;
    date?: string;
    description?: string;
    location?: string;
    contactInfo?: string;
    status?: string;
    views?: number;
    messages?: number;
};

const Dashboard = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [allPosts, setAllPosts] = useState<ItemType[]>([]);
    const [userPosts, setUserPosts] = useState<ItemType[]>([]);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name: "",
        email: "",
        number: "",
        avatar: "",
        totalPosts: Number,
    });

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const userId = sessionStorage.getItem("userId");
            if (!userId) return console.error("User ID not found in sessionStorage");

            const res = await axios.get(`http://localhost:3000/register/getAllUsers/${userId}`);
            const foundUser = res.data.findUser;
            setUser(foundUser);
            setEditedProfile({
                name: foundUser.Fullname,
                email: foundUser.email,
                number: foundUser.PhoneNo,
                avatar: foundUser.avatar,
                totalPosts: foundUser.totalPosts,
            });
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    };

    // Fetch all posts
    const fetchAllPosts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/post/getPosts");
            setAllPosts(res.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    // Filter user's posts after both data are available
    useEffect(() => {
        if (user && allPosts.length > 0) {
            const userPostIds = user.postedDatas || [];
            const myPosts = allPosts.filter((post) => userPostIds.includes(post._id));
            setUserPosts(myPosts);
        }
    }, [user, allPosts]);

    useEffect(() => {
        fetchUserData();
        fetchAllPosts();
    }, []);

    // Calculate Stats
    const totalPosts = userPosts.length;
    const activePosts = userPosts.filter(p => p.status === "active").length;
    const resolvedPosts = userPosts.filter(p => p.status === "resolved").length;
    const totalMessages = userPosts.reduce((sum, p) => sum + (p.messages || 0), 0);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setEditedProfile({ ...editedProfile, avatar: e.target?.result as string });
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const userId = sessionStorage.getItem("userId");
            if (!userId) return;
            console.log("Saving profile for userId:", userId);
            const res = await axios.post("http://localhost:3000/register/updateProfile", {
                userId,
                Fullname: editedProfile.name,
                email: editedProfile.email,
                PhoneNo: editedProfile.number,
                avatar: editedProfile.avatar,
                totalPosts: editedProfile.totalPosts,
            });

            setUser(res.data.user);
            console.log("Profile updated successfully");
        } catch (err) {
            console.error("Error updating profile:", err);
        }
        setIsEditDialogOpen(false);

    };
    const handleDeletePost = async (postId: string) => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) return console.error("User ID not found");

        try {
            const confirmed = window.confirm("Are you sure you want to delete this post?");
            if (!confirmed) return;

            await axios.delete("http://localhost:3000/post/deletePost", {
                data: { userId, postId }, // Axios needs `data` property in DELETE body
            });

            // Update UI after deletion
            setUserPosts(prev => prev.filter(post => post._id !== postId));
            setAllPosts(prev => prev.filter(post => post._id !== postId));

            console.log("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };


    return (
        <div className="dashboard-container p-6 space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                <p className="text-gray-500">Manage your lost and found posts</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <button
                        onClick={() => setIsEditDialogOpen(true)}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </button>
                </div>
                {isEditDialogOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsEditDialogOpen(false)} ></div>
                        {/* Modal Content */} <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
                            <div className="mb-4"> <h3 className="text-lg font-semibold text-gray-900">Edit Profile Information</h3> </div>
                            <div className="space-y-4"> <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ">
                                        {editedProfile.avatar ? (<img src={editedProfile.avatar} alt="Profile" className="w-full h-full object-cover" />) : (<span className="text-gray-500 text-xl font-semibold">{editedProfile.name.charAt(0)}</span>)} </div>
                                    <div className="relative "> <input type="file" accept="image/*" onChange={handleAvatarChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="avatar-upload" />
                                        <button type="button" className="border border-gray-300 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center" >
                                            <Camera className="h-4 w-4 mr-2" /> Change Photo </button>
                                    </div>
                                </div>
                            </div>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input id="name" type="text" value={editedProfile.name} onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })} placeholder="Enter your full name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" type="email" value={editedProfile.email} onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })} placeholder="Enter your email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> </div>
                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-medium text-gray-700">Phone</label>
                                    <input id="location" type="text" value={editedProfile.number} onChange={(e) => setEditedProfile({ ...editedProfile, number: e.target.value })} placeholder="Enter your location" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" /> </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button onClick={() => setIsEditDialogOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors" > Cancel </button>
                                <button onClick={handleSaveProfile} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" > Save Changes </button>
                            </div>
                        </div>
                    </div>)}



                <div className="flex items-center space-x-8">
                    <img
                        src={user?.avatar || "/default-avatar.png"}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border border-gray-200"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium">{user?.Fullname}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Phone className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone No</p>
                                <p className="font-medium">{user?.PhoneNo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-gray-500 text-sm">Total Posts</p>
                        <p className="text-2xl font-semibold">{totalPosts}</p>
                    </div>
                    <Eye className="text-blue-500 w-6 h-6" />
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-gray-500 text-sm">Active Posts</p>
                        <p className="text-2xl font-semibold text-green-600">{activePosts}</p>
                    </div>
                    <Search className="text-green-500 w-6 h-6" />
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-gray-500 text-sm">Resolved</p>
                        <p className="text-2xl font-semibold text-purple-600">{resolvedPosts}</p>
                    </div>
                    <Plus className="text-purple-500 w-6 h-6" />
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center shadow-sm">
                    <div>
                        <p className="text-gray-500 text-sm">Messages</p>
                        <p className="text-2xl font-semibold text-orange-600">{totalMessages}</p>
                    </div>
                    <MessageCircle className="text-orange-500 w-6 h-6" />
                </div>
            </div>

            {/* My Posts Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="min-w-full table-auto text-sm text-gray-700">
                    <thead className="bg-gray-50 text-gray-600 font-semibold">
                        <tr className="text-left">
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Date</th>
                            <th className="py-3 px-4 text-center">Location</th>
                            <th className="py-3 px-4 text-center">Engagement</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPosts.map((post) => (
                            <tr key={post._id} className=" hover:bg-gray-50 transition">
                                <td className="py-3 px-4 font-medium">{post.title}</td>
                                <td className="py-3 px-4 text-center">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${post.status === "lost"
                                            ? "bg-red-50 text-red-600"
                                            : post.status === "found"
                                                ? "bg-blue-50 text-blue-600"
                                                : post.status === "resolved"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-emerald-50 text-emerald-600"
                                            }`}
                                    >
                                        {post.status || "Unknown"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {post.date
                                        ? new Date(post.date).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "N/A"}
                                </td>
                                <td className="py-3 px-4 text-center">{post.location || "N/A"}</td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex items-center justify-center gap-4 text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" /> {post.views || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="w-4 h-4" /> {post.messages || 0}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="flex justify-center gap-3">
                                        <Link to={`/viewdetails/${post._id}`}>
                                            <button className="text-blue-500 hover:text-blue-700">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        {/* <button className="text-green-500 hover:text-green-700">
                                            <Edit className="w-4 h-4" />
                                        </button> */}

                                        <button onClick={() => handleDeletePost(post._id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 className="w-4 h-4 mb-2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
