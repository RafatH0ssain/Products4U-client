import React, { useState } from 'react';

const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here (for example, save the data or show a success message)
        console.log("Form submitted:", { email, query });
        setEmail('');
        setQuery('');
    };

    return (
        <div id="contact-us" className="bg-black text-white p-6 mb-20 rounded-lg border-2 border-white w-5/6 mx-auto mt-12">
            <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-xl font-medium">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 bg-black text-white border-2 border-white rounded-md mt-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="query" className="block text-xl font-medium">Your Query</label>
                    <textarea
                        id="query"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                        className="w-full p-3 bg-black text-white border-2 border-white rounded-md mt-2"
                        rows="5"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 mt-4 bg-white text-black font-semibold rounded-md"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
