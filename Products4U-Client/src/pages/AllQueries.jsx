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

    const [queries, setQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [queriesPerPage, setQueriesPerPage] = useState(6); // Default to 6 queries per page

    // Ensure we handle data properly after the component mounts
    useEffect(() => {
        if (loadedData?.queries) {
            setQueries(loadedData.queries); // Adjusted for queries
        }
    }, [loadedData]);

    // Get the current queries to display based on pagination
    const indexOfLastQuery = currentPage * queriesPerPage;
    const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
    const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle queries per page change
    const handleQueriesPerPageChange = (event) => {
        setQueriesPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to page 1 when the number of queries per page is changed
    };

    // Calculate total pages
    const totalPages = Math.ceil(queries.length / queriesPerPage);

    return (
        <AuthProvider>
            <div>
                <Header />
                <div className="w-11/12 mx-auto px-4 py-10">
                    <h2 className="text-5xl font-bold text-left mb-6">All queries:</h2>

                    {/* Queries Per Page Dropdown */}
                    <div className="mb-4">
                        <label htmlFor="queriesPerPage" className="mr-2">Queries per page:</label>
                        <select
                            id="queriesPerPage"
                            value={queriesPerPage}
                            onChange={handleQueriesPerPageChange}
                            className="p-2 border rounded"
                        >
                            {[6, 9, 12, 15].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {queries.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {currentQueries.map((query) => (
                                    <QueryCard key={query._id} product={query} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
                                >
                                    Previous
                                </button>

                                <div className="mx-4 flex items-center">
                                    <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                                </div>

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-500"
                                >
                                    Next
                                </button>
                            </div>
                        </>
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