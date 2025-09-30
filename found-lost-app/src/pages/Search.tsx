import { useState, useEffect } from "react";
import { Search as SearchIcon, Filter, } from 'lucide-react';
import "./styles/search.css";
import Itemcard from "../components/Itemcard";
import ScrollToTop from "../hooks/ScrollTop";
import axios from "axios";


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<number>(10);



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
    // type ItemStatus = "lost" | "found";
    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        fetchItems();
    }, [searchQuery, selectedCategory, selectedStatus]);

    const fetchItems = async () => {
        const userID = sessionStorage.getItem("userId");
        try {
            const res = await axios.get("http://localhost:3000/post/getPosts");
            setResults(res.data);
            console.log("Fetched items:", res.data);
        } catch (error) {
            console.error("Error fetching items", error);
        }
    };

    const filteredResults = results.filter(item =>
        (selectedStatus === 'all' || item.itemType === selectedStatus) &&
        (selectedCategory === 'all' || item.category === selectedCategory) &&
        (searchQuery === '' || item.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    );
    const handleLoadMore = () => {
        setLoading((prev) => prev + 10);
    };

    return (
        <div>
            <ScrollToTop />
            <div className="Scontainer">
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
                            Showing {results.length} results
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    </div>

                    {/* Results Grid */}
                    <div className="results-grid">
                        {filteredResults.slice(0, loading).map((item) => (
                            <Itemcard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                location={item.location}
                                date={item.date}
                                category={item.category}
                                status={item.itemType}
                                imageUrl={item.image}
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    {filteredResults.length > 10 && filteredResults.length > loading && (
                        <div className="load-more-container">
                            <button className="load-more-button" onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                                setSelectedStatus("all");
                                handleLoadMore();
                            }}>
                                Load More Results
                            </button>
                        </div>
                    )}


                    {/* No Results State */}
                    {results.length === 0 && (
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