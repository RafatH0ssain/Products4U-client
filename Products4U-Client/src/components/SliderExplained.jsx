import Carousel from "./Carousel";
const SliderExplained = () => {
    return (
        <div className="md:flex justify-between gap-5">
            <Carousel/>
            <div className="flex flex-col justify-center items-start px-10 border-4 border-white text-white rounded-3xl md:7/12 w-full h-[500px]">
                <h2 className="text-4xl font-bold mb-8 mx-auto underline">Why Choose Products4U?</h2>
                <p className="text-xl mb-4">
                    Our product recommendation platform allows you to easily manage your queries about products, view alternatives, and share recommendations. Whether you are looking for better alternatives, or simply want to find the best product for your needs, we’ve got you covered!
                </p>
                <p className="text-xl mb-4">
                    Join a growing community of users who are sharing their experiences and helping each other make informed purchasing decisions.
                </p>
            </div>
        </div>
    );
};

export default SliderExplained;