import { Upload, MapPin, Calendar, Tag, Camera } from 'lucide-react';
import { useState, useRef } from 'react';
import './styles/postItem.css';
import '../hooks/ScrollTop';
import ScrollToTop from '../hooks/ScrollTop';
import axios from 'axios';
const PostItem = () => {
    const [itemType, setItemType] = useState<'lost' | 'found'>('lost');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        image: '',
        contactInfo: ''
    });
    

    const categories = [
        'Electronics',
        'Personal Items',
        'Bags',
        'Clothing',
        'Documents',
        'Keys',
        'Jewelry',
        'Sports Equipment',
        'Other'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Save into formData
                    setFormData((prev) => ({
                        ...prev,
                        location: `${latitude}, ${longitude}`, // store as string
                    }));
                },
                (error) => {
                    console.error("❌ Error getting location:", error);
                    alert("Unable to fetch location. Please enter manually.");
                }
            );
        } else {
            alert("Geolocation is not supported in this browser.");
        }
    };
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFormData({ ...formData, image: e.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.post("http://localhost:3000/post/postItem", {
                ...formData,
                itemType,
                userId
            });
            console.log("Item posted successfully:", response.data);
        } catch (err) {

            console.error("Error posting item:", err);
        }
        setFormData({
            title: '',
            description: '',
            category: '',
            location: '',
            date: '',
            image: '',
            contactInfo: ''
        });
    };

    return (
        <div className="p-page-container">
            <ScrollToTop />
            <div className="form-container">
                {/* Header */}
                <div className="header">
                    <h1 className="header-title">Post an Item</h1>
                    <p className="header-description">Help build our community by reporting lost or found items</p>
                </div>

                <div className="p-form-card">
                    {/* Item Type Toggle */}
                    <div className="toggle-container">
                        <div className="toggle-buttons">
                            <button
                                type="button"
                                onClick={() => setItemType('lost')}
                                className={`toggle-button ${itemType === 'lost' ? 'toggle-button-lost' : 'toggle-button-lost-inactive'}`}
                            >
                                I Lost Something
                            </button>
                            <button
                                type="button"
                                onClick={() => setItemType('found')}
                                className={`toggle-button ${itemType === 'found' ? 'toggle-button-found' : 'toggle-button-found-inactive'}`}
                            >
                                I Found Something
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="form">
                        {/* Item Title */}
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">
                                Item Name *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., iPhone 14 Pro, Brown Leather Wallet"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Describe the item in detail. Include color, brand, size, and any distinctive features..."
                                className="form-textarea"
                                required
                            />
                        </div>

                        {/* Category and Location Row */}
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="category" className="form-label">
                                    <Tag className="icon" />
                                    Category *
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location" className="form-label">
                                    <MapPin className="icon" />
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g., University Campus, Downtown Park"
                                    className="form-input"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleGetCurrentLocation}
                                    className="px-3 mt-2 py-2 bg-blue-500 text-white rounded-lg"
                                >Click Here For Get Location</button>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="form-group">
                            <label htmlFor="date" className="form-label">
                                <Calendar className="icon" />
                                Date {itemType === 'lost' ? 'Lost' : 'Found'} *
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Image Upload */}
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
                                                    Uplaod Photo
                                                </button>
                                            </div>

                        {/* Contact Information */}
                        <div className="form-group">
                            <label htmlFor="contactInfo" className="form-label">
                                Contact Information *
                            </label>
                            <input
                                type="text"
                                id="contactInfo"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                placeholder="Email address or phone number"
                                className="form-input"
                                required
                            />
                            <p className="contact-hint">
                                This will be used to contact you when someone responds to your post
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="form-group">
                            <button
                                type="submit"
                                className={`submit-button ${itemType === 'lost' ? 'submit-button-lost' : 'submit-button-found'}`}
                            >
                                Post {itemType === 'lost' ? 'Lost' : 'Found'} Item
                            </button>
                        </div>
                    </form>
                </div>

                {/* Guidelines */}
                <div className="guidelines-container">
                    <h3 className="guidelines-title">Posting Guidelines</h3>
                    <ul className="guidelines-list">
                        <li>Be as detailed as possible in your description</li>
                        <li>Include clear photos if available</li>
                        <li>Provide accurate location and date information</li>
                        <li>Check your contact information is correct</li>
                        <li>Be responsive to messages from potential matches</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
