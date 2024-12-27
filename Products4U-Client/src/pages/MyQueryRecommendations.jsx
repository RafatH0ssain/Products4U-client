import Header from "../components/Header";
import Footer from "../components/Footer";

const MyQueryRecommendations = () => {
    return (
        <div>
            <Header/>
            {/* 
            On This Route User can show all the recommendations made by others only for his All queries in a table format. With some details. ( It also up to you )
            */}
            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl">What others think of your queries:</h2>
            </div>
            <Footer/>
        </div>
    );
};

export default MyQueryRecommendations;