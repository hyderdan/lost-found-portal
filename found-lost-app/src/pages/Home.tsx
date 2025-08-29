import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Search, Plus, Users, TrendingUp, Heart, Shield, MapPin, ChevronLeft, ChevronRight, Star, Quote, CheckCircle, Clock, Award } from 'lucide-react';
import "./styles/Home.css"
import Itemcard from "../components/Itemcard";
import Floatingbar from '../components/Floatingbar';
import { useMobile } from "../hooks/UseMobile"
import { UseScrollAnimation } from "../hooks/UseScrollAnimation"



import heroReunion from '../assets/ChatGPT Image Aug 29, 2025, 11_55_17 PM.png';
import heroCommunity from '../assets/ChatGPT Image Aug 29, 2025, 11_25_50 PM.png'
import heroSecurity from '../assets/ChatGPT Image Aug 29, 2025, 11_25_50 PM.png'
const Home = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const isMobile = useMobile();

    // Scroll animation hooks for different sections
    const statsAnimation = UseScrollAnimation(0.2);
    const recentItemsAnimation = UseScrollAnimation(0.2);
    const howItWorksAnimation = UseScrollAnimation(0.2);
    const reviewsAnimation = UseScrollAnimation(0.2);
    const featuresAnimation = UseScrollAnimation(0.2);

    const heroSlides = [
        {
            id: 1,
            title: "Reunite with What Matters",
            subtitle: "Every lost item has a story. Every found item creates hope. Join thousands who've successfully reunited with their belongings through our community-driven platform.",
            bgColor: "from-indigo-100 via-purple-600 to-pink-600",
            bgImage: heroReunion,
            icon: null,
            buttons: [
                { text: "Search Lost Items", icon: Search, to: "/search", variant: "white" },
                { text: "Report Found Item", icon: Plus, to: "/post-item", variant: "gradient" }
            ]
        },
        {
            id: 2,
            title: "Powered by Community Love",
            subtitle: "Meet amazing people who care. Our 3,456+ active members help each other every single day, creating a network of trust and kindness in your neighborhood.",
            bgColor: "from-emerald-200 via-teal-600 to-cyan-600",
            bgImage: heroCommunity,
            icon: Heart,
            buttons: [
                { text: "Join Our Community", icon: Users, to: "/register", variant: "white" },
                { text: "See Success Stories", icon: Award, to: "#reviews", variant: "gradient" }
            ]
        },
        {
            id: 3,
            title: "Safe & Secure Always",
            subtitle: "Your safety is our priority. End-to-end encryption, verified locations, and secure messaging ensure every interaction is protected and private.",
            bgColor: "from-blue-100 via-indigo-700 to-purple-800",
            bgImage: heroSecurity,
            icon: Shield,
            buttons: [
                { text: "Learn About Security", icon: Shield, to: "#features", variant: "white" },
                { text: "Start Searching", icon: MapPin, to: "/search", variant: "gradient" }
            ]
        }
    ];

    // Auto-advance carousel every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);

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
        const baseClasses = "px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg";
        switch (variant) {
            case "white":
                return `${baseClasses} bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-white hover:shadow-xl`;
            case "gradient":
                return `${baseClasses} bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:shadow-2xl`;
            default:
                return baseClasses;
        }
    };

    // Sample data for recently posted items
    const recentItems = [
        {
            id: '1',
            title: 'iPhone 14 Pro',
            description: 'Space Black iPhone 14 Pro with MagSafe case. Lost near Central University campus during morning jog.',
            location: 'Central University Campus',
            date: '2024-06-20',
            category: 'Electronics',
            status: 'lost' as const,
            imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400'
        },
        {
            id: '2',
            title: 'Brown Leather Wallet',
            description: 'Found this brown leather wallet with various cards inside. No cash. Please describe contents to claim.',
            location: 'Downtown Central Park',
            date: '2024-06-19',
            category: 'Personal Items',
            status: 'found' as const
        },
        {
            id: '3',
            title: 'Blue Backpack',
            description: 'Navy blue Jansport backpack with laptop compartment. Contains important textbooks and notebooks.',
            location: 'City Public Library',
            date: '2024-06-18',
            category: 'Bags',
            status: 'lost' as const
        }
    ];

    // Customer reviews data
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "College Student",
            content: "I lost my laptop bag with all my thesis work inside. Within 2 hours of posting, someone found it! This platform saved my entire semester.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b787?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Mike Chen",
            role: "Business Professional",
            content: "Found a wallet with $500 cash. The secure messaging helped me return it safely to the owner. Amazing community spirit here!",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            role: "Teacher",
            content: "My grandmother's ring was returned to me after 3 days. I thought it was gone forever. This platform brings people together beautifully.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const features = [
        {
            icon: Shield,
            title: "Military-Grade Security",
            description: "End-to-end encryption and verified user profiles ensure your data stays safe",
            color: "bg-blue-500"
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Our community and support team are here to help you around the clock",
            color: "bg-green-500"
        },
        {
            icon: MapPin,
            title: "Smart Location Matching",
            description: "AI-powered location suggestions help you find items faster than ever",
            color: "bg-purple-500"
        },
        {
            icon: CheckCircle,
            title: "Verified Success Rate",
            description: "89% reunion success rate with over 1,200+ happy reunions this year",
            color: "bg-orange-500"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Carousel Section */}
            <div className="relative overflow-hidden min-h-screen lg:min-h-[90vh] ">
                {/* Carousel Container */}
                <div
                    className="flex transition-transform duration-700 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {heroSlides.map((slide, index) => (
                        <div key={slide.id} className="w-full flex-shrink-0 relative min-h-screen lg:min-h-[90vh]">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.bgImage})` }}
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-85`} />

                            {/* Content */}
                            <div className="relative z-10 min-h-screen lg:min-h-[90vh] flex items-center">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                                    <div className={`text-center ${isMobile ? 'space-y-6' : 'space-y-8'}`}>
                                        {slide.icon && (
                                            <div className="flex justify-center mb-6">
                                                <slide.icon className="h-16 w-16 lg:h-20 lg:w-20 text-white/80 animate-pulse" />
                                            </div>
                                        )}
                                        <h1 className={`font-bold text-white animate-fade-in ${isMobile ? 'text-3xl leading-tight' : 'text-4xl md:text-6xl lg:text-7xl'
                                            }`}>
                                            {slide.title}
                                        </h1>
                                        <p className={`text-white/90 mx-auto animate-fade-in delay-200 leading-relaxed ${isMobile
                                                ? 'text-lg max-w-sm'
                                                : 'text-xl md:text-2xl lg:text-3xl max-w-4xl font-light'
                                            }`}>
                                            {slide.subtitle}
                                        </p>
                                        <div className={`flex gap-4 justify-center animate-fade-in delay-400 ${isMobile ? 'flex-col items-center' : 'flex-col sm:flex-row'
                                            }`}>
                                            {slide.buttons.map((button, buttonIndex) => (
                                                <Link
                                                    key={buttonIndex}
                                                    to={button.to.startsWith('#') ? button.to : button.to}
                                                    className={getButtonClasses(button.variant)}
                                                    onClick={button.to.startsWith('#') ? (e) => {
                                                        e.preventDefault();
                                                        document.querySelector(button.to)?.scrollIntoView({ behavior: 'smooth' });
                                                    } : undefined}
                                                >
                                                    <button.icon className={`mr-2 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
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

                {/* Navigation Arrows */}
                {!isMobile && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </>
                )}

                {/* Slide Indicators */}
                <div className={`absolute left-1/2 -translate-x-1/2 flex space-x-3 ${isMobile ? 'bottom-8' : 'bottom-12'}`}>
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-white w-8 h-3'
                                    : 'bg-white/60 hover:bg-white/80 w-3 h-3'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Stats Section */}
            <div
                ref={statsAnimation.ref}
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-1000 ${statsAnimation.isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real numbers from our amazing community of helpers and finders
                    </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                    <div className={`text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${statsAnimation.isVisible ? 'animate-fade-in delay-100' : ''
                        }`}>
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Search className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">2,847</h3>
                        <p className="text-gray-600 text-lg">Items Successfully Reported</p>
                        <div className="text-sm text-green-600 font-semibold mt-2">↑ 23% this month</div>
                    </div>

                    <div className={`text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${statsAnimation.isVisible ? 'animate-fade-in delay-200' : ''
                        }`}>
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Heart className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">1,892</h3>
                        <p className="text-gray-600 text-lg">Happy Reunions</p>
                        <div className="text-sm text-green-600 font-semibold mt-2">89% success rate</div>
                    </div>

                    <div className={`text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${statsAnimation.isVisible ? 'animate-fade-in delay-300' : ''
                        }`}>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Users className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">5,456</h3>
                        <p className="text-gray-600 text-lg">Active Community Members</p>
                        <div className="text-sm text-green-600 font-semibold mt-2">Growing daily</div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
                <div
                    ref={featuresAnimation.ref}
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${featuresAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Built with cutting-edge technology and community-first values
                        </p>
                    </div>

                    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${featuresAnimation.isVisible ? `animate-fade-in delay-${(index + 1) * 100}` : ''
                                    }`}
                            >
                                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="py-16 lg:py-24 bg-white">
                <div
                    ref={reviewsAnimation.ref}
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${reviewsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Success Stories
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Real stories from real people who found their way back to what matters most
                        </p>
                    </div>

                    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${reviewsAnimation.isVisible ? `animate-fade-in delay-${(index + 1) * 200}` : ''
                                    }`}
                            >
                                <Quote className="h-8 w-8 text-blue-500 mb-4" />
                                <p className="text-gray-700 mb-6 leading-relaxed text-lg">"{review.content}"</p>

                                <div className="flex items-center">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full mr-4 object-cover shadow-md"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                        <p className="text-gray-600 text-sm">{review.role}</p>
                                    </div>
                                </div>

                                <div className="flex mt-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Items Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
                <div
                    ref={recentItemsAnimation.ref}
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${recentItemsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Recent Activity
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            See what's happening in your community right now
                        </p>
                    </div>

                    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                        {recentItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`transition-all duration-700 ${recentItemsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{ transitionDelay: `${300 + (index * 150)}ms` }}
                            >
                                <Itemcard {...item} />
                            </div>
                        ))}
                    </div>

                    <div className={`text-center mt-16 transition-all duration-700 delay-700 ${recentItemsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                        <Link
                            to="/search"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            View All Items
                            <Search className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white py-16 lg:py-24">
                <div
                    ref={howItWorksAnimation.ref}
                    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Three simple steps to reunite with your belongings
                        </p>
                    </div>

                    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                        <div className={`text-center transition-all duration-700 delay-200 ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                1
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Report Your Item</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Upload photos and detailed descriptions of your lost or found items. Include location and contact information for quick reunions.
                            </p>
                        </div>

                        <div className={`text-center transition-all duration-700 delay-300 ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                2
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Smart Matching</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Our AI-powered system matches lost and found items by location, description, and timing to help you find matches faster.
                            </p>
                        </div>

                        <div className={`text-center transition-all duration-700 delay-400 ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}>
                            <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                                3
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Safe Reunion</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Connect securely through our messaging system and arrange safe meetups at verified public locations.
                            </p>
                        </div>
                    </div>

                    <div className={`text-center mt-16 transition-all duration-700 delay-600 ${howItWorksAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                        <Link
                            to="/post-item"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Get Started Now
                            <Plus className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;