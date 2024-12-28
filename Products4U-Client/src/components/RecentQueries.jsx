import { useState, useEffect } from "react";

const RecentQueries = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchRecentQueries = async () => {
            try {
                const response = await fetch(`http://localhost:5000/queries/latest`);
                if (!response.ok) throw new Error("Failed to fetch recent queries");
                const data = await response.json();
                setQueries(data);  // Use setQueries instead of setRecentQueries
            } catch (error) {
                console.error("Error fetching recent queries:", error);
            }
        };

        fetchRecentQueries();
    }, []);

    return (
        <div className="w-11/12 mx-auto py-10">
            <h2 className="font-bold text-5xl mb-8">Recent Queries:</h2>

            {queries.length > 0 ? (
                <div className="space-y-6">
                    {queries.map((query) => (
                        <div key={query._id} className="flex gap-5 p-6 bg-black border-4 border-white rounded-3xl shadow-lg">
                            <div>
                                <img src={query.productImageURL} alt={query.productName} className="w-64" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{query.queryTitle}</h3>
                                <p className="text-gray-400 mt-2">
                                    <strong>Product:</strong> {query.productName}
                                </p>
                                <p className="text-gray-400 mt-2">
                                    <strong>Reason:</strong> {query.boycottingReasonDetails || "No reason specified"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No recent queries available.</p>
            )}
        </div>
    );
};

export default RecentQueries;