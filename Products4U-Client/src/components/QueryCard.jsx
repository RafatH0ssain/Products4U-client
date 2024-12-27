import { Link } from "react-router-dom";

const QueryCard = ({ product }) => {
    return (
        <div className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <img src={product.productImageURL} alt={product.productName} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-700 mb-4">{product.queryTitle}</p>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{product.boycottingReasonDetails}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="font-semibold">{product.productBrand}</span>
                    <Link to={`/query/${product._id}`} className="text-blue-500 hover:text-blue-700">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QueryCard;