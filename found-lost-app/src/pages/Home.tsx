// import React from 'react';
import { Link } from "react-router-dom";
import { Search, Plus, Users, TrendingUp } from 'lucide-react';
import "./styles/Home.css"
import Itemcard from "../components/Itemcard";



const Home = () => {
    const recentItems = [
        {
            id: '1',
            title: 'iPhone 14 Pro',
            description: 'Black iPhone 14 Pro with a blue case. Lost near the university campus.',
            location: 'University Campus',
            date: '2024-06-20',
            category: 'Electronics',
            status: 'lost' as const,
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400'
        },
        {
            id: '2',
            title: 'Brown Leather Wallet',
            description: 'Found a brown leather wallet with some cards inside. No cash.',
            location: 'Downtown Park',
            date: '2024-06-19',
            category: 'Personal Items',
            status: 'found' as const
        },
        {
            id: '3',
            title: 'Blue Backpack',
            description: 'Navy blue backpack with laptop compartment. Contains textbooks.',
            location: 'City Library',
            date: '2024-06-18',
            category: 'Bags',
            status: 'lost' as const
        }
    ];
    return (
        <div className='home-page'>

            <div className='head-section'>
                <div className='head-content'>
                    <h1 className='head-title'>Find What You've Lost</h1>
                    <p className='head-subtitle'>
                        Connect with your community to recover lost items and help others find theirs.
                        Your virtual lost & found portal.
                    </p>
                    <div className='head-button'>
                        <Link to="/searchItems" className="btn white-btn">
                            <Search className="icon" />
                            Search Items
                        </Link>
                        <Link to="/postItem" className='btn blue-btn mt-3'>
                            <Plus className="icon" />
                            Post an Item
                        </Link>
                    </div>
                </div>
            </div>
            {/* stats-section */}
            <div className='stats-section'>
                <div className='stats-grid'>

                    <div className='stats-card bg-white-50'>
                        <div className='stats-icon'>
                            <Search className='icon-lg' />
                        </div>
                        <h3 className='stats-value'>1023</h3>
                        <p className='stat-label'>Items Reportedd</p>
                    </div>

                    <div className='stats-card'>
                        <div className='stats-icon bg-green'>
                            <TrendingUp className='icon-lg' />
                        </div>
                        <h3 className='stats-value'>893</h3>
                        <p className='stat-label'>Item Reunited</p>
                    </div>

                    <div className='stats-card'>
                        <div className='stats-icon bg-green'>
                            <Users className='icon-lg' />
                        </div>
                        <h3 className='stats-value'>2893</h3>
                        <p className='stat-label'>Community Members</p>
                    </div>

                </div>
            </div>
            {/* stats-section */}


            {/* recent-section */}
            <div className='recent-section'>
                <h2 className="section-title">Recent Activity</h2>

                <div className="reported-items-section">
                    <h3 className="reported-items-title">Recently Reported Items</h3>
                    <div className="items-grid">
                        {recentItems.map((item) => (
                            <Itemcard key={item.id} {...item} />
                        ))}
                    </div>
                </div>

                <div className="view-all-container">
                    <Link to="/searchItems" className="view-all-link">
                        View All Items
                        <Search className="icon" />
                    </Link>
                </div>
            </div>
            {/* recent-section */}


            <div className="how-section">
                <div className="how-container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="how-grid">
                        {[1, 2, 3].map((step, i) => (
                            <div className="how-step" key={i}>
                                <div className="step-circle">{step}</div>
                                <h3 className="step-title">
                                    {step === 1 ? "Report Your Item" : step === 2 ? "Search & Browse" : "Get Reunited"}
                                </h3>
                                <p className="step-desc">
                                    {step === 1
                                        ? "Post details about your lost or found item with photos and location information."
                                        : step === 2
                                            ? "Use our search filters to find items by category, location, or description."
                                            : "Connect with the finder or owner to arrange a safe pickup and reunion."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Home;