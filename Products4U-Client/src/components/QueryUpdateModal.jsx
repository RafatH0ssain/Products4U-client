import React, { useState, useEffect } from "react";

const QueryUpdateModal = ({ queryId, onClose, onUpdate }) => {
    const [queryDetails, setQueryDetails] = useState({
        productName: "",
        productBrand: "",
        productImageURL: "",
        queryTitle: "",
        boycottingReasonDetails: "",
    });
    
    useEffect(() => {
        const fetchQueryDetails = async () => {
            try {
                const response = await fetch(`https://products4-u-server-rafat-hossains-projects.vercel.app/query/${queryId}`);
                const data = await response.json();
                setQueryDetails(data);
            } catch (error) {
                console.error("Error fetching query details:", error);
            }
        };

        if (queryId) {
            fetchQueryDetails();
        }
    }, [queryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQueryDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { productName, productBrand, productImageURL, queryTitle, boycottingReasonDetails } = queryDetails;

        if (!productName || !productBrand || !productImageURL || !queryTitle || !boycottingReasonDetails) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch(`https://products4-u-server-rafat-hossains-projects.vercel.app/query/${queryId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryDetails),
            });

            if (response.ok) {
                onUpdate(queryDetails); // Pass updated query back to parent
                onClose(); // Close the modal
            } else {
                alert("Failed to update query.");
            }
        } catch (error) {
            console.error("Error updating query:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-black p-6 rounded-3xl border-white border-8 w-1/3">
                <h2 className="text-xl font-semibold mb-4">Update Query</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={queryDetails.productName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Product Brand</label>
                        <input
                            type="text"
                            name="productBrand"
                            value={queryDetails.productBrand}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Product Image URL</label>
                        <input
                            type="text"
                            name="productImageURL"
                            value={queryDetails.productImageURL}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Query Title</label>
                        <input
                            type="text"
                            name="queryTitle"
                            value={queryDetails.queryTitle}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Boycotting Reason</label>
                        <textarea
                            name="boycottingReasonDetails"
                            value={queryDetails.boycottingReasonDetails}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white p-2 rounded"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QueryUpdateModal;