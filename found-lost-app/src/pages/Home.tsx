import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Search, Plus, Users, TrendingUp, Heart, Shield, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import "./styles/Home.css"
import Itemcard from "../components/Itemcard";
import Floatingbar from '../components/Floatingbar';


const useScrollAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can disconnect to improve performance
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '50px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
};


const Home = () => {

    const statsAnimation = useScrollAnimation(0.2);
    const recentItemsAnimation = useScrollAnimation(0.2);
    const howItWorksAnimation = useScrollAnimation(0.2);

    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            id: 1,
            title: "Find What You've Lost",
            subtitle: "Connect with your community to recover lost items and help others find theirs. Your virtual lost & found portal.",
            bgColor: "bg-blue-600 bg-blue-700 to-blue-800",
            icon: Search,
            buttons: [
                { text: "Search Items", icon: Search, to: "/searchItems", variant: "white" },
                { text: "Post an Item", icon: Plus, to: "/postItem", variant: "blue" }
            ]
        },
        {
            id: 2,
            title: "Join Our Community",
            subtitle: "Over 3,456 helpful community members helping each other reunite with lost belongings every day.",
            bgColor: "bg-purple-600 via-purple-700 to-indigo-800",
            icon: Heart,
            buttons: [
                { text: "Join Community", icon: Users, to: "/register", variant: "white" },
                { text: "Browse Items", icon: Search, to: "/searchItems", variant: "purple" }
            ]
        },
        {
            id: 3,
            title: "Safe & Secure",
            subtitle: "Your privacy and safety are our priority. Secure messaging and verified locations for peace of mind.",
            bgColor: "bg-green-600 via-emerald-700 to-teal-800",
            icon: Shield,
            buttons: [
                { text: "Report Found Item", icon: Plus, to: "/postItem", variant: "white" },
                { text: "Search by Location", icon: MapPin, to: "/search", variant: "green" }
            ]
        }
    ];

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const getButtonClasses = (variant: string) => {
        const baseClasses = "px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center hover-scale";
        switch (variant) {
            case "white":
                return `${baseClasses} bg-white text-gray-700 hover:bg-gray-100`;
            case "blue":
                return `${baseClasses} bg-blue-500 text-white hover:bg-blue-400`;
            case "purple":
                return `${baseClasses} bg-purple-500 text-white hover:bg-purple-400`;
            case "green":
                return `${baseClasses} bg-green-500 text-white hover:bg-green-400`;
            default:
                return baseClasses;
        }
    };
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
        <div className="home-page ">

            <div className="carousel-container">
                {/* Carousel Wrapper */}
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {heroSlides.map((slide) => (
                        <div key={slide.id} className="carousel-slide">
                            <div className={`slide-background ${slide.bgColor}`}>
                                <div className="slide-content">
                                    <div className="text-center">
                                        {slide.icon && (
                                            <div className="icon-wrapper">
                                                <slide.icon className="icon" />
                                            </div>
                                        )}
                                        <h1 className="slide-title">{slide.title}</h1>
                                        <p className="slide-subtitle">{slide.subtitle}</p>
                                        <div className="button-group">
                                            {slide.buttons.map((button, index) => (
                                                <Link key={index} to={button.to}
                                                    className={getButtonClasses(button.variant)}
                                                >
                                                    <button.icon className="button-icon" />
                                                    {button.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                <button onClick={goToPrevious} className="arrow left" aria-label="Previous slide">
                    <ChevronLeft className="arrow-icon " />
                </button>
                <button onClick={goToNext} className="arrow right" aria-label="Next slide">
                    <ChevronRight className="arrow-icon" />
                </button>

                {/* Slide Indicators */}
                <div className="indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* stats-section */}
            <div ref={statsAnimation.ref}
                className={`h-stats-section ${statsAnimation.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}>
                <div className='h-stats-grid'>

                    <div className='h-stats-card bg-white-50'>
                        <div className='h-stats-icon bg-blue-100'>
                            <Search className='h-icon-lg text-blue-500' />
                        </div>
                        <h3 className='stats-value'>1023</h3>
                        <p className='stat-label'>Items Reportedd</p>
                    </div>

                    <div className='h-stats-card'>
                        <div className='h-stats-icon bg-green-100'>
                            <TrendingUp className='h-icon-lg text-green-500' />
                        </div>
                        <h3 className='stats-value'>893</h3>
                        <p className='stat-label'>Item Reunited</p>
                    </div>

                    <div className='h-stats-card'>
                        <div className='h-stats-icon bg-purple-100'>
                            <Users className='h-icon-lg text-purple-500' />
                        </div>
                        <h3 className='stats-value'>2893</h3>
                        <p className='stat-label'>Community Members</p>
                    </div>

                </div>
            </div>
            {/* stats-section */}


            {/* recent-section */}
            <div
                ref={recentItemsAnimation.ref}
                className={`h-recent-section ${recentItemsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="h-section-title">Recent Activity</h2>

                <div className="h-reported-items-section">
                    {/* <h3 className="reported-items-title">Recently Reported Items</h3> */}
                    <div className="h-items-grid">
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


            <div ref={howItWorksAnimation.ref}
                className={`h-how-section ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            <Floatingbar />
        </div>

    )
}
export default Home;