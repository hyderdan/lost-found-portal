import { MapPin, Calendar, Eye } from 'lucide-react';
import "../pages/styles/itemcard.css";
import { Link } from 'react-router-dom';

interface ItemCardProps {
    id: string;
    title: string;
    description: string;
    location: number;
    date: string;
    category: string;
    status: 'found' | 'lost';
    imageUrl?: string;
}

const Itemcard = ({ id, title, description, location, date, category, status, imageUrl }: ItemCardProps) => {

    return (
        <div className="I-card">
            <div className="card-image-container">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="card-image" />
                ) : (
                    <div className="card-no-image">
                        <span className="card-no-image-text">No Image</span>
                    </div>
                )}
                <div className={`card-status ${status === 'lost' ? 'card-status-lost' : 'card-status-found'}`}>
                    {status === 'lost' ? 'Lost' : 'Found'}
                </div>
            </div>

            <div className="I-card-content">
                <h3 className="I-card-title">{title}</h3>
                <p className="I-card-description">{description}</p>

                <div className="card-details">
                    <div className="card-detail-item">
                        <MapPin className="icon" />
                        <span>{location}</span>
                    </div>
                    <div className="card-detail-item">
                        <Calendar className="icon" />
                        <span>{date}</span>
                    </div>
                </div>

                <div className="card-footer">
                    <span className="card-category">{category}</span>
                    <button className="card-button">
                        <Link to={`/viewDetails/${id}`} className="card-button-link">
                        {/* <Eye className="icon" /> */}
                        View Details
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Itemcard;