import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const QueryDetails = () => {
    const { id } = useParams(); // Get the query ID from URL
    const [query, setQuery] = useState(null);
    const [recommendation, setRecommendation] = useState({
        title: '',
        productName: '',
        productImage: '',
        reason: '',
    });
    const [message, setMessage] = useState('');
    const { user } = useContext(AuthContext); // Get logged-in user details

    // Fetch query details from the server
    useEffect(() => {
        const fetchQueryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/query/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch query details");
                }
                const data = await response.json();
                setQuery(data);
            } catch (error) {
                console.error("Error fetching query details:", error);
            }
        };

        fetchQueryDetails();
    }, [id]);

    const handleRecommendationChange = (e) => {
        const { name, value } = e.target;
        setRecommendation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRecommendationSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setMessage('You need to log in to submit a recommendation');
            return;
        }

        const newRecommendation = {
            ...recommendation,
            queryId: id,
            queryTitle: query.queryTitle,
            productName: query.productName,
            userEmail: query.userEmail,
            userName: query.userName,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch('http://localhost:5000/recommendation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecommendation),
            });

            if (response.ok) {
                setMessage('Recommendation added successfully!');
                // Increase recommendation count on the query page
                await fetch(`http://localhost:5000/update-query/${id}`, { method: 'PATCH' });
            } else {
                throw new Error('Failed to add recommendation');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    if (!query) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <Header />
            <div className="max-w-5xl mx-auto my-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={query.productImageURL}
                        alt={query.productName}
                        className="w-full md:w-1/2 rounded-3xl shadow-lg"
                    />
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-4">{query.queryTitle}</h2>
                        <p className="text-gray-400"><strong>Product Name:</strong> {query.productName}</p>
                        <p className="text-gray-400"><strong>Brand:</strong> {query.productBrand}</p>
                        <p className="text-gray-400"><strong>Boycotting Reason:</strong> {query.boycottingReasonDetails}</p>
                        <p className="text-gray-400"><strong>Created by:</strong> {query.userName} ({query.userEmail})</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-3xl font-bold mb-5">Add a Recommendation</h3>
                    {message && <p className="text-lg text-green-500">{message}</p>}
                    <form onSubmit={handleRecommendationSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="title"
                            value={recommendation.title}
                            onChange={handleRecommendationChange}
                            placeholder="Recommendation Title"
                            className="p-3 w-full rounded-md bg-gray-800 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="productName"
                            value={recommendation.productName}
                            onChange={handleRecommendationChange}
                            placeholder="Recommended Product Name"
                            className="p-3 w-full rounded-md bg-gray-800 text-white"
                            required
                        />
                        <input
                            type="text"
                            name="productImage"
                            value={recommendation.productImage}
                            onChange={handleRecommendationChange}
                            placeholder="Recommended Product Image URL"
                            className="p-3 w-full rounded-md bg-gray-800 text-white"
                        />
                        <textarea
                            name="reason"
                            value={recommendation.reason}
                            onChange={handleRecommendationChange}
                            placeholder="Recommendation Reason"
                            className="p-3 w-full rounded-md bg-gray-800 text-white"
                            rows="4"
                            required
                        />
                        <button type="submit" className="btn bg-blue-700 text-white border-none rounded-xl">Add Recommendation</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default QueryDetails;