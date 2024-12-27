import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MyQueryRecommendations = () => {
    const { user } = useContext(AuthContext); // Accessing the logged-in user's info from AuthContext
    const [userQueries, setUserQueries] = useState([]); // To store logged-in user's queries
    const [recommendations, setRecommendations] = useState([]); // To store recommendations for user's queries

    // Fetch user's queries
    useEffect(() => {
        const fetchUserQueries = async () => {
            if (user && user.email) {
                try {
                    const response = await fetch(`http://localhost:5000/queries?userEmail=${user.email}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user queries");
                    }
                    const data = await response.json();
                    setUserQueries(data); // Set the queries to state
                } catch (error) {
                    console.error("Error fetching queries:", error);
                }
            }
        };

        fetchUserQueries();
    }, [user]);

    // Fetch recommendations for each query
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (userQueries.length > 0) {
                try {
                    const recommendationsPromises = userQueries.map(async (query) => {
                        const response = await fetch(`http://localhost:5000/recommendations?queryId=${query._id}`);
                        if (!response.ok) {
                            throw new Error("Failed to fetch recommendations");
                        }
                        const data = await response.json();
                        return {
                            queryTitle: query.queryTitle,
                            recommendations: data
                        };
                    });

                    const recommendationsData = await Promise.all(recommendationsPromises);
                    setRecommendations(recommendationsData); // Set recommendations to state
                } catch (error) {
                    console.error("Error fetching recommendations:", error);
                }
            }
        };

        fetchRecommendations();
    }, [userQueries]);

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
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((queryRecommendation, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{queryRecommendation.queryTitle}</td>
                                        {queryRecommendation.recommendations.length > 0 ? (
                                            queryRecommendation.recommendations.map((recommendation) => (
                                                <tr key={recommendation._id}>
                                                    <td className="px-4 py-2">{recommendation.recommendationTitle}</td>
                                                    <td className="px-4 py-2">{recommendation.productName}</td>
                                                    <td className="px-4 py-2">{recommendation.recommenderName}</td>
                                                    <td className="px-4 py-2">{recommendation.reason}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <td className="px-4 py-2" colSpan="5">No recommendations yet.</td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400">You haven't posted any queries yet.</p>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyQueryRecommendations;