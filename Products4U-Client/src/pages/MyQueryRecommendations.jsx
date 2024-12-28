import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyQueryRecommendations = () => {
    const { user } = useContext(AuthContext); // Accessing the logged-in user's info from AuthContext
    const [recommendations, setRecommendations] = useState([]); // To store recommendations for user's queries

    // Fetch recommendations for the user's queries
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`http://localhost:5000/recommendations/byUserQueries?userEmail=${user.email}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch recommendations");
                    }
                    const data = await response.json();
                    console.log("Recommendations Data:", data);
                    setRecommendations(data); // Set recommendations to state
                } catch (error) {
                    console.error("Error fetching recommendations:", error);
                }
            }
        };
    
        fetchRecommendations();
    }, [user]);
    

    // Delete recommendation
    const deleteRecommendation = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/recommendations/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error("Failed to delete recommendation");
            }
            // Remove deleted recommendation from state
            setRecommendations(recommendations.filter(r => r._id !== id));
        } catch (error) {
            console.error("Error deleting recommendation:", error);
        }
    };

    return (
        <div>
            <Header />

            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl mb-8">What others think of your queries:</h2>

                {recommendations.length > 0 ? (
                    <div className="overflow-x-auto bg-gray-800 p-6 rounded-xl shadow-lg">
                        <table className="min-w-full table-auto text-white">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Query Title</th>
                                    <th className="px-4 py-2">Recommendation Title</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Recommended By</th>
                                    <th className="px-4 py-2">Reason</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((recommendation) => (
                                    <tr key={recommendation._id}>
                                        <td className="px-4 py-2">{recommendation.queryTitle}</td>
                                        <td className="px-4 py-2">{recommendation.recommendationTitle}</td>
                                        <td className="px-4 py-2">{recommendation.productName}</td>
                                        <td className="px-4 py-2">{recommendation.recommenderName}</td>
                                        <td className="px-4 py-2">{recommendation.reason}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-red-500 text-white p-2 rounded"
                                                onClick={() => deleteRecommendation(recommendation._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">No recommendations for your queries yet.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyQueryRecommendations;