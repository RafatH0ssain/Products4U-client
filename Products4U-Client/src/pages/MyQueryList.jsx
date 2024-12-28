import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import QueryUpdateModal from "../components/QueryUpdateModal";
import handleChange from "../components/QueryUpdateModal";

const MyQueryList = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productBrand: "",
        productImageURL: "",
        queryTitle: "",
        boycottingReasonDetails: "",
    });

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [selectedQueryId, setSelectedQueryId] = useState(null); // Track the selected query ID for updating
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const userEmail = user.email;

    useEffect(() => {
        const fetchUserQueries = async () => {
            if (!userEmail) return;

            try {
                const response = await fetch(`http://localhost:5000/queries/byUserEmail?userEmail=${userEmail}`);
                const data = await response.json();
                setQueries(data);
            } catch (error) {
                console.error("Error fetching queries:", error);
                setMessage("Error fetching queries.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserQueries();
    }, [userEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { productName, productBrand, productImageURL, queryTitle, boycottingReasonDetails } = formData;

        if (!productName || !productBrand || !productImageURL || !queryTitle || !boycottingReasonDetails) {
            setMessage("All fields are required!");
            return;
        }

        if (!userEmail) {
            setMessage("You must be logged in to add a query.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/queries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productName,
                    productBrand,
                    productImageURL,
                    queryTitle,
                    boycottingReasonDetails,
                    userEmail,
                }),
            });

            if (response.ok) {
                setMessage("Query added successfully!");
                setFormData({
                    productName: "",
                    productBrand: "",
                    productImageURL: "",
                    queryTitle: "",
                    boycottingReasonDetails: "",
                });
                fetchUserQueries();
            } else {
                setMessage("Failed to add query.");
            }
        } catch (error) {
            console.error("Error adding query:", error);
            setMessage("An error occurred while adding the query.");
        }
    };

    const handleDelete = async (queryId) => {
        const confirmation = window.confirm("Are you sure you want to delete this query?");
        if (confirmation) {
            try {
                await fetch(`http://localhost:5000/query/${queryId}`, { method: 'DELETE' });
                setQueries(queries.filter(query => query._id !== queryId));
            } catch (error) {
                console.error("Error deleting query:", error);
            }
        }
    };

    const handleUpdate = (queryId) => {
        setSelectedQueryId(queryId); // Open modal with the selected query
    };

    const handleCloseModal = () => {
        setSelectedQueryId(null); // Close modal by resetting selectedQueryId
    };

    const handleUpdateQuery = (updatedQuery) => {
        setQueries((prevQueries) =>
            prevQueries.map((query) =>
                query._id === updatedQuery._id ? updatedQuery : query
            )
        );
    };

    return (
        <div>
            <Header />
            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl mb-8">Your Queries:</h2>

                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : message ? (
                    <p className="text-gray-400">{message}</p>
                ) : queries.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">No queries found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {queries.map((query) => (
                            <div key={query._id} className="bg-black p-6 border-4 border-white rounded-3xl shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4">{query.queryTitle}</h3>
                                <p className="text-gray-400 mb-2"><strong>Product:</strong> {query.productName}</p>
                                <p className="text-gray-400 mb-2"><strong>Brand:</strong> {query.productBrand}</p>
                                <p className="text-gray-400 mb-4"><strong>Reason:</strong> {query.boycottingReasonDetails || "No reason specified"}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleUpdate(query._id)}
                                        className="bg-yellow-500 text-white p-2 rounded-lg"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(query._id)}
                                        className="bg-red-500 text-white p-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Query Form */}
                <div className="bg-black p-6 border-4 border-white rounded-3xl shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Add a New Query</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-gray-300" htmlFor="productName">Product Name</label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300" htmlFor="productBrand">Product Brand</label>
                            <input
                                type="text"
                                id="productBrand"
                                name="productBrand"
                                value={formData.productBrand}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300" htmlFor="productImageURL">Product Image URL</label>
                            <input
                                type="text"
                                id="productImageURL"
                                name="productImageURL"
                                value={formData.productImageURL}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300" htmlFor="queryTitle">Query Title</label>
                            <input
                                type="text"
                                id="queryTitle"
                                name="queryTitle"
                                value={formData.queryTitle}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-300" htmlFor="boycottingReasonDetails">Boycotting Reason</label>
                            <textarea
                                id="boycottingReasonDetails"
                                name="boycottingReasonDetails"
                                value={formData.boycottingReasonDetails}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 rounded-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-lg"
                        >
                            Add Query
                        </button>
                    </form>
                </div>
            </div>

            <Footer />

            {/* Modal */}
            {selectedQueryId && (
                <QueryUpdateModal
                    queryId={selectedQueryId}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateQuery}
                />
            )}
        </div>
    );
};

export default MyQueryList;