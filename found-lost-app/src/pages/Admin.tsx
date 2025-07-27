import { useState } from 'react';
import { Search, Shield, Trash2, Eye, UserX, Ban } from 'lucide-react';
import "./styles/admin.css";
import AdminLogin from '../components/AdminLogin';
// const { toast } = useToast();

type Post = {
    id: string;
    title: string;
    type: string;
    date: string;
};

type User = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    registeredAt: string;
    status: 'active' | 'blocked';
    posts: Post[];
};

const mockUsers: User[] = [
    {
        id: '1',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        registeredAt: '2024-01-15',
        status: 'active',
        posts: [
            { id: '1', title: 'Lost wallet in downtown', type: 'lost', date: '2024-01-20' },
            { id: '2', title: 'Found keys near park', type: 'found', date: '2024-01-22' }
        ]
    },
    {
        id: '2',
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        registeredAt: '2024-01-10',
        status: 'blocked',
        posts: [
            { id: '3', title: 'Lost phone at mall', type: 'lost', date: '2024-01-18' }
        ]
    },
    {
        id: '3',
        fullName: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1122334455',
        registeredAt: '2024-01-20',
        status: 'active',
        posts: []
    }
];

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    // Uncomment if using authentication
    if (!isAuthenticated) {
        return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBlockUser = (userId: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, status: user.status === 'blocked' ? 'active' : 'blocked' } : user
            )
        );
                    

        // Uncomment if using toast
        // const user = users.find((u) => u.id === userId);
        // const action = user?.status === 'blocked' ? 'unblocked' : 'blocked';
        // toast({
        //     title: `User ${action}`,
        //     description: `${user?.fullName} has been ${action} successfully.`,
        // });
    };

    const handleDeleteUser = (userId: string) => {
        // const user = users.find((u) => u.id === userId);
        setUsers((prev) => prev.filter((user) => user.id !== userId));

        // Uncomment if using toast
        // toast({
        //     title: "User deleted",
        //     description: `${user?.fullName} has been deleted successfully.`,
        //     variant: "destructive",
        // });

        setShowDeleteDialog(false);
        setUserToDelete(null);
    };

    const getStatusBadge = (status: string) => {
        return status === 'active' ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
            </span>
        ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Blocked
            </span>
        );
    };

    const showUserDetails = (user: User) => {
        setSelectedUser(user);
        setShowUserDialog(true);
    };

    const showDeleteConfirmation = (user: User) => {
        setUserToDelete(user);
        setShowDeleteDialog(true);
    };

    return (
        <div className="a-page-container">
            <div className="content-container">
                {/* Header */}
                <div className="header">
                    <div className="header-top">
                        <div>
                            <h1 className="header-title">Admin Panel</h1>
                            <p className="header-description">Manage users and their accounts</p>
                        </div>
                        <div className="header-right">
                            <div className="header-icon-container">
                                <Shield className="header-icon" />
                            </div>
                            <button
                                onClick={() => setIsAuthenticated(false)}
                                className="logout-button"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stats-header">
                            <h3 className="stats-title">Total Users</h3>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value">{users.length}</div>
                        </div>
                    </div>

                    <div className="stats-card">
                        <div className="stats-header">
                            <h3 className="stats-title">Active Users</h3>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value stats-value-active">
                                {users.filter(u => u.status === 'active').length}
                            </div>
                        </div>
                    </div>

                    <div className="stats-card">
                        <div className="stats-header">
                            <h3 className="stats-title">Blocked Users</h3>
                        </div>
                        <div className="stats-content">
                            <div className="stats-value stats-value-blocked">
                                {users.filter(u => u.status === 'blocked').length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="search-container">
                    <div className="search-content">
                        <div className="search-input-container">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="table-container">
                    <div className="table-header">
                        <h3 className="table-title">Users Management</h3>
                    </div>
                    <div className="table-content">
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-header-cell">User</th>
                                        <th className="table-header-cell">Contact</th>
                                        <th className="table-header-cell">Registered</th>
                                        <th className="table-header-cell">Posts</th>
                                        <th className="table-header-cell">Status</th>
                                        <th className="table-header-cell">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="table-row">
                                            <td className="table-cell">
                                                <div className="table-user-info">
                                                    <div className="table-user-name">{user.fullName}</div>
                                                    <div className="table-user-email">{user.email}</div>
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="table-contact">{user.phone}</div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="table-registered">
                                                    {new Date(user.registeredAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="table-cell">
                                                <div className="table-posts">{user.posts.length} posts</div>
                                            </td>
                                            <td className="table-cell">{getStatusBadge(user.status)}</td>
                                            <td className="table-cell">
                                                <div className="table-actions">
                                                    <button
                                                        onClick={() => showUserDetails(user)}
                                                        className="action-button action-button-view"
                                                    >
                                                        <Eye className="icon text-gray-500" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleBlockUser(user.id)}
                                                        className={`action-button ${user.status === 'blocked' ? 'action-button-block-active' : 'action-button-block'}`}
                                                    >
                                                        {user.status === 'blocked' ? <UserX className="icon "  /> : <Ban className="icon text-gray-500" />}
                                                    </button>

                                                    <button
                                                        onClick={() => showDeleteConfirmation(user)}
                                                        className="action-button action-button-delete"
                                                    >
                                                        <Trash2 className="icon" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* User Details Modal */}
                {showUserDialog && selectedUser && (
                    <div className="modal-overlay">
                        <div className="modal-backdrop" onClick={() => setShowUserDialog(false)}></div>
                        <div className="modal-container">
                            <div className="modal-header">
                                <h2 className="modal-title">User Details</h2>
                                <p className="modal-description">
                                    Detailed information about {selectedUser.fullName}
                                </p>
                            </div>

                            <div className="modal-content">
                                <div className="modal-details-grid">
                                    <div className="modal-details-grid-2">
                                        <div>
                                            <label className="modal-label">Full Name</label>
                                            <p className="modal-value">{selectedUser.fullName}</p>
                                        </div>
                                        <div>
                                            <label className="modal-label">Email</label>
                                            <p className="modal-value">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <label className="modal-label">Phone</label>
                                            <p className="modal-value">{selectedUser.phone}</p>
                                        </div>
                                        <div>
                                            <label className="modal-label">Status</label>
                                            <div className="modal-status">{getStatusBadge(selectedUser.status)}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="modal-posts-label">Posts</label>
                                        {selectedUser.posts.length > 0 ? (
                                            <div className="modal-posts-container">
                                                {selectedUser.posts.map((post) => (
                                                    <div key={post.id} className="modal-post">
                                                        <div className="modal-post-header">
                                                            <div>
                                                                <h4 className="modal-post-title">{post.title}</h4>
                                                                <p className="modal-post-type">{post.type} item</p>
                                                            </div>
                                                            <span className="modal-post-date">
                                                                {new Date(post.date).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="modal-no-posts">No posts yet</p>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        onClick={() => setShowUserDialog(false)}
                                        className="modal-button modal-button-close"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteDialog && userToDelete && (
                    <div className="modal-overlay ">
                        <div className="modal-backdrop  " onClick={() => setShowDeleteDialog(false)}></div>
                        <div className="delete-modal-container"> 
                            <div className="modal-header">
                                <h2 className="modal-title">Delete User</h2>
                                <p className="modal-description">
                                    Are you sure you want to delete {userToDelete.fullName}? This action cannot be undone.
                                </p>
                            </div>

                            <div className="delete-modal-footer">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className="modal-button modal-button-close"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(userToDelete.id)}
                                    className="modal-button modal-button-delete"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Admin;