const AboutUs = () => {
    return (
        <div id="about-us">
            <h2 className="text-5xl mt-20 mb-5 font-extrabold text-left">Our Timeline:</h2>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <div className="timeline-middle bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">December 20, 2024</time>
                        <div className="text-lg font-black">The Idea Sparked</div>
                        After finishing my third semester, I realized I wanted to take my skills to the next level during the winter break. I came up with the idea of creating a product recommendation platform to help users easily find and recommend products. I spent the first day researching and planning out the entire project, gathering inspiration from various sources.
                    </div>
                    <hr className="bg-white" />
                </li>
                <li>
                    <hr className="bg-white" />
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-end mb-10">
                        <time className="font-mono italic">December 22, 2024</time>
                        <div className="text-lg font-black">Setting Up the Foundations</div>
                        I started by setting up the basic project structure, choosing Vite for fast development, and creating a clean user interface using Tailwind CSS and DaisyUI. The next few days were spent working on authentication and creating the first few routes.
                    </div>
                    <hr className="bg-white" />
                </li>
                <li>
                    <hr className="bg-white" />
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">December 25, 2024</time>
                        <div className="text-lg font-black">Feature Implementation</div>
                        I began adding more functionality, such as user accounts, product queries, and recommendation systems. It was a bit of a challenge to integrate the database with Firebase, but I slowly started seeing the project come together.
                    </div>
                    <hr className="bg-white" />
                </li>
                <li>
                    <hr className="bg-white" />
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-end mb-10">
                        <time className="font-mono italic">December 28, 2024</time>
                        <div className="text-lg font-black">Finishing Touches</div>
                        The last few days were spent fine-tuning the UI, debugging, and testing features like login/logout, user queries, and recommendations. I also made sure to add responsiveness and mobile support for a smooth user experience across devices.
                    </div>
                    <hr className="bg-white" />
                </li>
                <li>
                    <hr className="bg-white" />
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="timeline-start mb-10 md:text-end">
                        <time className="font-mono italic">December 30, 2024</time>
                        <div className="text-lg font-black">Project Complete</div>
                        After a week of consistent effort, I finally completed the project. It was an incredibly satisfying experience, and I felt proud of what I had accomplished in such a short period of time. This was a good project that helped me hone the fundamentals of full-stack web development.
                    </div>
                </li>
            </ul>

        </div>
    );
};

export default AboutUs;