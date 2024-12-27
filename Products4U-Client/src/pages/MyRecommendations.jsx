import Header from "../components/Header";
import Footer from "../components/Footer";

const MyRecommendations = () => {
    return (
        <div>
            <Header/>
            {/* 
            On This Route the user will show all the recommendations made by him from the recommendation collection in a table format. With some details ( it's up to you ). 

User can’t modify his recommendation.  He can only delete recommendations.  So create a button for deleting his recommendation.  Hitting the delete button will delete the recommendation with confirmation.  

After successful  deletion decreases the recommendation count of the query. 

            */}
            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl">Queries you recommend:</h2>
            </div>
            <Footer/>
        </div>
    );
};

export default MyRecommendations;