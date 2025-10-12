import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapPin, Calendar, User, Phone, ArrowLeft, Flag, Mail } from 'lucide-react';
import axios from "axios";

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
};

const ViewDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3000/post/getPosts");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching items", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [id]);

  const itemData = data.find(item => item._id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <Link 
          to="/searchItems" 
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Search
        </Link>
        <div className="text-center border border-red-300 bg-red-50 rounded-2xl p-10 shadow-md">
          <Flag className="w-10 h-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h2>
          <p className="text-gray-600">The item you’re looking for doesn’t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          to="/searchItems"
          className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold transition-all duration-300 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-blue-50   shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center">
                {itemData.image ? (
                  <img
                    src={itemData.image}
                    alt={itemData.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center mb-4 shadow-inner">
                      <MapPin className="w-12 h-12 text-blue-600" />
                    </div>
                    <span className="text-gray-500 text-lg font-semibold">
                      No Image Available
                    </span>
                  </div>
                )}

                {/* Status Badge – now always visible */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg border transition-all duration-300 ${
                      itemData.itemType === 'lost'
                        ? 'bg-red-500 text-white border-red-400'
                        : 'bg-emerald-500 text-white border-emerald-400'
                    }`}
                  >
                    {itemData.itemType === 'lost' ? '🔍 Lost Item' : '✓ Found Item'}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl bg-blue-50 border border-blue-200 p-8 shadow-md hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">📝 Description</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {itemData.description}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all">
              <h1 className="text-3xl font-extrabold text-blue-700 mb-3">
                {itemData.title}
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold text-sm shadow-md">
                 {itemData.category}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white border border-blue-200 rounded-xl hover:border-blue-400 transition-all">
                  <MapPin className="text-blue-600 h-5 w-5" />
                  <span className="text-gray-700 font-semibold">{itemData.location}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all">
                  <Calendar className="text-purple-600 h-5 w-5" />
                  <span className="text-gray-700 font-semibold">{itemData.date}</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-3xl bg-blue-50 border border-blue-200 p-8 shadow-md hover:shadow-lg transition-all">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">📞 Contact</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all">
                  <User className="text-blue-600 h-5 w-5" />
                  <span className="text-gray-800 font-semibold text-lg">
                    {itemData.contactInfo}
                  </span>
                </div>

                <a
                  href={`tel:${itemData.contactInfo}`}
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Phone className="h-5 w-5 mr-2" /> Contact Owner
                </a>

                <button className="w-full py-4 rounded-xl bg-white border border-gray-300 font-bold text-gray-700 hover:bg-blue-50 transition-all shadow-sm">
                  <Mail className="h-5 w-5 mr-2 inline" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
