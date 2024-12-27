import Header from "../components/Header";
import Footer from "../components/Footer";

const MyQueryList = () => {
    return (
        <div>
            <Header></Header>
            <div className="w-11/12 mx-auto py-10">
                <h2 className="font-bold text-5xl">Your Queries:</h2>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MyQueryList;