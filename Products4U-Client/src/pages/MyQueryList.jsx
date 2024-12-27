import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyQueryList = () => {
    const [formData, setFormData] = useState({
        productName: "",
        productBrand: "",
        productImageURL: "",
        queryTitle: "",
        boycottingReasonDetails: ""
    });

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    // Assuming the user's email is stored in localStorage (you can use sessionStorage or context instead)
    const {user} = useContext(AuthContext);
    const userEmail = user.email;
    console.log(userEmail);
    useEffect(() => {
        const fetchUserQueries = async () => {
            if (!userEmail) return; // If no user is logged in, do not fetch

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

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productName,
                    productBrand,
                    productImageURL,
                    queryTitle,
                    boycottingReasonDetails,
                    userEmail // Include the logged-in user's email in the query data
                })
            });

            if (response.ok) {
                setMessage("Query added successfully!");
                setFormData({
                    productName: "",
                    productBrand: "",
                    productImageURL: "",
                    queryTitle: "",
                    boycottingReasonDetails: ""
                });
                // Fetch updated queries after adding a new one
                fetchUserQueries();
            } else {
                setMessage("Failed to add query.");
            }
        } catch (error) {
            console.error("Error adding query:", error);
            setMessage("An error occurred while adding the query.");
        }
    };

    // Handle delete query
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

    // Handle update query
    const handleUpdate = (queryId) => {
        navigate(`/query/update/${queryId}`);
    };

    // Handle view query details
    const handleViewDetails = (queryId) => {
        navigate(`/query/${queryId}`);
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
                            <div key={query._id} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4">{query.queryTitle}</h3>
                                <p className="text-gray-400 mb-2">
                                    <strong>Product:</strong> {query.productName}
                                </p>
                                <p className="text-gray-400 mb-2">
                                    <strong>Brand:</strong> {query.productBrand}
                                </p>
                                <p className="text-gray-400 mb-4">
                                    <strong>Reason:</strong> {query.boycottingReasonDetails || "No reason specified"}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleViewDetails(query._id)}
                                        className="bg-blue-500 text-white p-2 rounded-lg"
                                    >
                                        View Details
                                    </button>
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
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
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
        </div>
    );
};

export default MyQueryList;