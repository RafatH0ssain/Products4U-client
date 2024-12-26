import Header from "../components/Header";
import Footer from '../components/Footer';
import AuthProvider from '../provider/AuthProvider.jsx';
import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AllQueries = () => {
    let loadedData;
    try {
        loadedData = useLoaderData();
    } catch (error) {
        console.error("useLoaderData error:", error);
        loadedData = { equipments: [], categories: [] };
    }

    const [equipments, setEquipment] = useState([]);

    // Ensure we handle data properly after the component mounts
    useEffect(() => {
        if (loadedData?.equipments) {
            setEquipment(loadedData.equipments);
        }
    }, [loadedData]);

    return (
        <AuthProvider>
            <div>
                <Header />
                <div className="w-11/12 mx-auto px-4 py-10">
                    <h2 className="text-5xl font-bold text-left mb-6">All Queries:</h2>
                    {equipments.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Category</th>
                                    <th className="px-4 py-2 border">Price</th>
                                    <th className="px-4 py-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipments.map((equipment) => (
                                    <tr key={equipment._id} className="border-b">
                                        <td className="px-4 py-2">{equipment.itemName}</td>
                                        <td className="px-4 py-2">{equipment.categoryName}</td>
                                        <td className="px-4 py-2">{equipment.price} USD</td>
                                        <td className="px-4 py-2">
                                            <Link to={`/equipment/${equipment._id}`} className="text-blue-500 hover:text-blue-700">
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No equipment available at the moment.</p>
                    )}
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default AllQueries;