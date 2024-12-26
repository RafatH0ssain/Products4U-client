const FAQSection = () => {
    return (
        <div className="text-white bg-black">
            <h2 className="text-5xl mt-10 mb-5 font-extrabold text-left">FAQ:</h2>
            <div className="collapse collapse-arrow bg-black border-white border mb-5">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">I cannot access many parts of the website, what do I do?</div>
                <div className="collapse-content">
                    <p>Many parts of the website are locked and only available for users once they have registered an account and logged in. Make sure that you are logged in when trying to access the data.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-black border-white border mb-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Where can I see a list of all my queries?</div>
                <div className="collapse-content">
                    <p>There is a blue button at the very top right, My Queries. Pressing that button takes you to a page with a list of all your queris across all products on the website. Here you can add/update/delete your query about a product.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-black border-white border mb-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How can I view all queries in one place?</div>
                <div className="collapse-content">
                    <p>Press the second button at the top navbar, Queries. Then, select your requirede product and press add recommendation.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-black border-white border mb-5">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How can I add a new query?</div>
                <div className="collapse-content">
                    <p>At first login using your email and password. Then press the My Queries button at the top right. Then, fill in the form at the bottom and press add query.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;