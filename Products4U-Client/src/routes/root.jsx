import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import SliderExplained from "../components/SliderExplained";
import RecentQueries from "../components/RecentQueries";
import FAQSection from "../components/FAQSection";

export default function Root() {
    return (
        <>
            <Header />
                <div className="w-11/12 mx-auto">
                    {/* Explanation Slider */}
                    <SliderExplained/>
                    {/* Recent Queries */}
                    <RecentQueries/>
                    {/* FAQ (How to navigate website) */}
                    <FAQSection/>
                    {/* About Us (Timeline of proj)*/}
                    <AboutUs/>
                </div>
            <Footer />
        </>
    );
}