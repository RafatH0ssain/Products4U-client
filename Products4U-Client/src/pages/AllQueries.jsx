import Header from "../components/Header";
import Footer from '../components/Footer';
import AuthProvider from '../provider/AuthProvider.jsx';
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import QueryCard from "../components/QueryCard"; // Import the QueryCard component

const AllQueries = () => {
    let loadedData;
    try {
        loadedData = useLoaderData();
    } catch (error) {
        console.error("useLoaderData error:", error);
        loadedData = { queries: [] }; // Adjusted to queries instead of queries
    }

    const [queries, setProducts] = useState([]);

    // Ensure we handle data properly after the component mounts
    useEffect(() => {
        if (loadedData?.queries) {
            setProducts(loadedData.queries); // Adjusted for queries
        }
    }, [loadedData]);

    return (
        <AuthProvider>
            <div>
                <Header />
                <div className="w-11/12 mx-auto px-4 py-10">
                    <h2 className="text-5xl font-bold text-left mb-6">All queries:</h2>
                    {queries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {queries.map((product) => (
                                <QueryCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p>No queries available at the moment.</p>
                    )}
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default AllQueries;