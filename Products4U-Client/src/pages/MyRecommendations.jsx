import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyRecommendations = () => {
    const { user } = useContext(AuthContext); // Accessing the logged-in user's info from AuthContext
    const [recommendations, setRecommendations] = useState([]);

    // Fetch recommendations for the logged-in user
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`http://localhost:5000/recommendations?userEmail=${user.email}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch recommendations");
                    }
                    const data = await response.json();
                    setRecommendations(data);
                } catch (error) {
                    console.error("Error fetching recommendations:", error);
                }
            }
        };

        fetchRecommendations();
    }, [user]);

    return (
        <div>
            <Header />

            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl mb-8">Queries You Recommended:</h2>

                {recommendations.length > 0 ? (
                    <div className="space-y-6 text-white">
                        {recommendations.map((recommendation) => (
                            <div key={recommendation._id} className="p-6 bg-gray-800 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold">{recommendation.recommendationTitle}</h3>
                                <p className="text-gray-400 mt-2"><strong>Product Name:</strong> {recommendation.productName}</p>
                                <img
                                    src={recommendation.productImage}
                                    alt={recommendation.productName}
                                    className="w-full md:w-1/2 rounded-xl mt-4"
                                />
                                <p className="text-gray-400 mt-2"><strong>Recommended by:</strong> {recommendation.recommenderName}</p>
                                <p className="text-gray-400 mt-2"><strong>Recommendation Reason:</strong> {recommendation.reason}</p>
                                <p className="text-gray-400 mt-2"><strong>Query Title:</strong> {recommendation.queryTitle}</p>
                                <p className="text-gray-400 mt-2"><strong>Query ID:</strong> {recommendation.queryId}</p>
                                <p className="text-gray-400 mt-2"><strong>Recommender Email:</strong> {recommendation.recommenderEmail}</p>
                                <p className="text-gray-400 mt-2"><strong>Timestamp:</strong> {new Date(recommendation.timestamp).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">You haven't recommended any products yet.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyRecommendations;