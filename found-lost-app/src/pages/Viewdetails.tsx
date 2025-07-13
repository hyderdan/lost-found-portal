// import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Phone, Mail, ArrowLeft, Flag } from 'lucide-react';
import './styles/viewDetails.css'; // Assuming you have a CSS file for styles

const Viewdetails = () => {
    const { id } = useParams();
    const sampleItems = [
        {
            id: '1',
            title: 'iPhone 14 Pro',
            description: 'Black iPhone 14 Pro with a blue case. Lost near the university campus.',
            location: 'https://maps.google.com/maps?hl=en&gl=in&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x3b080db504444075:0x8cf7531f9e8b202f',
            date: '2024-06-20',
            category: 'Electronics',
            status: 'lost' as const,
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
            contactInfo: {
                name: 'John Smith',
                phone: '+1 (555) 123-4567',
                email: 'john.smith@email.com'
            },
            additionalDetails: {
                reward: '$100',
                lastSeen: '2:30 PM near the university campus',
                brand: 'Apple',
                model: 'iPhone 14 Pro',
                color: 'Black'
            }
        },
        {
            id: '2',
            title: 'Brown Leather Wallet',
            description: 'Found a brown leather wallet with some cards inside. No cash.',
            location: 'https://maps.google.com/maps?hl=en&gl=in&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x3b080db504444075:0x8cf7531f9e8b202f',
            date: '2024-06-19',
            category: 'Personal Items',
            status: 'found' as const,
            contactInfo: {
                name: 'Sarah Johnson',
                phone: '+1 (555) 987-6543',
                email: 'sarah.j@email.com'
            },
            additionalDetails: {
                reward: 'No reward',
                lastSeen: '5:00 PM at the park bench',
                brand: 'Generic',
                model: 'Leather Wallet',
                color: 'Brown'
            }
        },
        {
            id: '3',
            title: 'Blue Backpack',
            description: 'Navy blue backpack with laptop compartment. Contains textbooks.',
            location: 'City Library',
            date: '2024-06-18',
            category: 'Bags',
            status: 'lost' as const,
            contactInfo: {
                name: 'Mike Wilson',
                phone: '+1 (555) 456-7890',
                email: 'mike.w@email.com'
            },
            additionalDetails: {
                reward: '$50',
                lastSeen: '3:00 PM in the study area',
                brand: 'JanSport',
                model: 'SuperBreak',
                color: 'Navy Blue'
            }
        },
        {
            id: '4',
            title: 'AirPods Pro',
            description: 'White AirPods Pro in charging case. Found at coffee shop.',
            location: 'Central Coffee Shop',
            date: '2024-06-17',
            category: 'Electronics',
            status: 'found' as const,
            contactInfo: {
                name: 'Emma Davis',
                phone: '+1 (555) 234-5678',
                email: 'emma.d@email.com'
            },
            additionalDetails: {
                reward: 'No reward',
                lastSeen: '10:00 AM at the counter',
                brand: 'Apple',
                model: 'AirPods Pro',
                color: 'White'
            }
        },
        {
            id: '5',
            title: 'Red Baseball Cap',
            description: 'Red baseball cap with team logo. Lost during jogging.',
            location: 'Riverside Trail',
            date: '2024-06-16',
            category: 'Clothing',
            status: 'lost' as const,
            contactInfo: {
                name: 'Tom Anderson',
                phone: '+1 (555) 345-6789',
                email: 'tom.a@email.com'
            },
            additionalDetails: {
                reward: '$25',
                lastSeen: '7:00 AM during morning jog',
                brand: 'Nike',
                model: 'Baseball Cap',
                color: 'Red'
            }
        },
        {
            id: '6',
            title: 'Car Keys',
            description: 'Toyota car keys with blue keychain. Found in parking lot.',
            location: 'Shopping Mall',
            date: '2024-06-15',
            category: 'Keys',
            status: 'found' as const,
            contactInfo: {
                name: 'Lisa Brown',
                phone: '+1 (555) 567-8901',
                email: 'lisa.b@email.com'
            },
            additionalDetails: {
                reward: 'No reward',
                lastSeen: '4:00 PM in parking lot section B',
                brand: 'Toyota',
                model: 'Car Keys',
                color: 'Blue Keychain'
            }
        }
    ];

    // Find the item with the matching ID
    const itemData = sampleItems.find(item => item.id === id);
    return (
        <>
            {!itemData ? (
                <div className="page-container">
                    <div className="content-container">
                        <div className="back-button-container">
                            <Link
                                to="/search"
                                className="back-button"
                            >
                                <ArrowLeft className="icon" />
                                {/* Back to Search */}
                            </Link>
                        </div>
                        <div className="not-found-card">
                            <h1 className="not-found-title">Item Not Found</h1>
                            <p className="not-found-description">The item you're looking for doesn't exist.</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="page-container">
                    <div className="content-container">
                        {/* Back Button */}
                        <div className="back-button-container">
                            <Link
                                to="/searchItems"
                                className="back-button"
                            >
                                <ArrowLeft className="icon" />
                                {/* Back to Search */}
                            </Link>
                        </div>

                        <div className="item-card">
                            {/* Header */}
                            <div className="image-container">
                                {itemData?.imageUrl ? (
                                    <img
                                        src={itemData?.imageUrl}
                                        alt={itemData?.title}
                                        className="item-image"
                                    />
                                ) : (
                                    <div className="no-image">
                                        <span className="no-image-text">No Image Available</span>
                                    </div>
                                )}
                                <div className={`status-badge ${itemData?.status === 'lost' ? 'status-lost' : 'status-found'}`}>
                                    {itemData?.status === 'lost' ? 'Lost Item' : 'Found Item'}
                                </div>
                            </div>

                            <div className="item-content">
                                {/* Title and Category */}
                                <div className="header-section">
                                    <div>
                                        <h1 className="item-title">{itemData?.title}</h1>
                                        <span className="category-badge">{itemData?.category}</span>
                                    </div>
                                    <button className="report-button">
                                        <Flag className="icon" />
                                        Report Issue
                                    </button>
                                </div>

                                {/* Basic Info */}
                                <div className="basic-info">
                                    {/* <div className="info-item">
                                        <MapPin className="icon" />
                                        <span>{itemData?.location}</span>
                                    </div> */}
                                    <div className="info-item">
                                        <Calendar className="icon" />
                                        <span>{itemData?.date}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="description-section">
                                    <h2 className="description-title">Description</h2>
                                    <p className="description-text">{itemData?.description}</p>
                                </div>

                                {/* Additional Details */}
                                <div className="additional-details">
                                    <h2 className="additional-details-title">Additional Details</h2>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Brand:</span>
                                            <span className="detail-value">{itemData?.additionalDetails?.brand}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Model:</span>
                                            <span className="detail-value">{itemData?.additionalDetails?.model}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Color:</span>
                                            <span className="detail-value">{itemData?.additionalDetails?.color}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Reward:</span>
                                            <span className={`detail-value-reward ${itemData?.additionalDetails?.reward === 'No reward' ? 'detail-value-reward-no' : 'detail-value-reward-yes'}`}>
                                                {itemData?.additionalDetails?.reward}
                                            </span>
                                        </div>
                                        <div className="detail-item detail-item-full">
                                            <span className="detail-label">Last Seen:</span>
                                            <span className="detail-value">{itemData?.additionalDetails?.lastSeen}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="contact-section">
                                    <h2 className="contact-title">Contact Information</h2>
                                    <div className="contact-card">
                                        <div className="contact-name">
                                            <User className="icon" />
                                            <span className="contact-name-text">{itemData?.contactInfo?.name}</span>
                                        </div>
                                        <div className="contact-info">
                                            <div className="contact-item">
                                                <Phone className="icon" />
                                                <a href={`tel:${itemData?.contactInfo?.phone}`} className="contact-link">
                                                    {itemData?.contactInfo?.phone}
                                                </a>
                                            </div>
                                            <div className="contact-item">
                                                <Mail className="icon" />
                                                <a href={`mailto:${itemData?.contactInfo?.email}`} className="contact-link">
                                                    {itemData?.contactInfo?.email}
                                                </a>
                                            </div>
                                             <div className="contact-item">
                                                <MapPin className="icon" />
                                                <a href={`${itemData?.location}`} className="contact-link">
                                                </a>
                                            </div>
                                        </div>
                                        <div className="contact-buttons">
                                            <button className="contact-button contact-button-primary">
                                                Contact Owner
                                            </button>
                                            <button className="contact-button contact-button-secondary">
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Viewdetails;