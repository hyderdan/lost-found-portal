import { useState } from "react";
import { Search as SearchIcon, Filter, } from 'lucide-react';
import "./styles/search.css";
import Itemcard from "../components/Itemcard";
import ScrollToTop from "../hooks/ScrollTop";


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const categories = [
        'All Categories',
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
    type ItemStatus = "lost" | "found";

    const sampleResults: Array<{
        id: string;
        title: string;
        description: string;
        location: string;
        date: string;
        category: string;
        status: ItemStatus;
        imageUrl?: string;
    }> = [
            {
                id: '1',
                title: 'iPhone 14 Pro',
                description: 'Black iPhone 14 Pro with a blue case. Lost near the university campus.',
                location: 'University Campus',
                date: '2024-06-20',
                category: 'Electronics',
                status: 'lost',
                imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400'
            },
            {
                id: '2',
                title: 'Brown Leather Wallet',
                description: 'Found a brown leather wallet with some cards inside. No cash.',
                location: 'Downtown Park',
                date: '2024-06-19',
                category: 'Personal Items',
                status: 'found'
            },
            {
                id: '3',
                title: 'Blue Backpack',
                description: 'Navy blue backpack with laptop compartment. Contains textbooks.',
                location: 'City Library',
                date: '2024-06-18',
                category: 'Bags',
                status: 'lost'
            },
            {
                id: '4',
                title: 'AirPods Pro',
                description: 'White AirPods Pro in charging case. Found at coffee shop.',
                location: 'Central Coffee Shop',
                date: '2024-06-17',
                category: 'Electronics',
                status: 'found'
            },
            {
                id: '5',
                title: 'Red Baseball Cap',
                description: 'Red baseball cap with team logo. Lost during jogging.',
                location: 'Riverside Trail',
                date: '2024-06-16',
                category: 'Clothing',
                status: 'lost'
            },
            {
                id: '6',
                title: 'Car Keys',
                description: 'Toyota car keys with blue keychain. Found in parking lot.',
                location: 'Shopping Mall',
                date: '2024-06-15',
                category: 'Keys',
                status: 'found'
            }
        ]
    const filteredResults = sampleResults.filter(item =>
        (selectedStatus === 'all' || item.status === selectedStatus) &&
        (selectedCategory === 'all' || item.category === selectedCategory)
    );


    return (
        <div>
            <ScrollToTop />
            <div className="container">
                <div className="main-content">
                    {/* Header */}
                    <div className="header">
                        <h1 className="header-title">Search Lost & Found Items</h1>
                        <p className="header-subtitle">Find what you're looking for or help others find their items</p>
                    </div>

                    {/* Search and Filters */}
                    <div className="search-filter-container">
                        <div className="search-grid">
                            {/* Search Input */}
                            <div className="search-input-container">
                                <div className="search-input-wrapper">
                                    <SearchIcon className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search for items..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="select-input"
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={index === 0 ? 'all' : category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="select-input"
                                >
                                    <option value="all">All Status</option>
                                    <option value="lost">Lost Items</option>
                                    <option value="found">Found Items</option>
                                </select>
                            </div>
                        </div>

                        {/* Advanced Filters Toggle */}
                        <div className="advanced-filter-container">
                            <button className="advanced-filter-button">
                                <Filter className="filter-icon" />
                                Advanced Filters
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="results-count">
                        <p>
                            Showing {filteredResults.length} results
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    </div>

                    {/* Results Grid */}
                    <div className="results-grid">
                        {filteredResults.map((item) => (
                            <Itemcard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                location={item.location}
                                date={item.date}
                                category={item.category}
                                status={item.status}
                                imageUrl={item.imageUrl}
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="load-more-container">
                        <button className="load-more-button">
                            Load More Results
                        </button>
                    </div>

                    {/* No Results State */}
                    {sampleResults.length === 0 && (
                        <div className="no-results-container">
                            <SearchIcon className="no-results-icon" />
                            <h3 className="no-results-title">No items found</h3>
                            <p className="no-results-text">Try adjusting your search criteria or browse all items</p>
                            <button className="clear-filters-button">
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Search;