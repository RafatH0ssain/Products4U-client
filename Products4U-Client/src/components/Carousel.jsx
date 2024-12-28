import { useState, useEffect } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of image URLs (same images as in your original code)
    const images = [
        "https://i.ibb.co/QPZcPt1/mouse1.jpg",
        "https://i.ibb.co/grGWDCy/earbuds2.jpg",
        "https://i.ibb.co/vVFHVDr/keyboard1.jpg",
        "https://i.ibb.co/XkZQkdn/monitor2.jpg",
        "https://i.ibb.co/Brcnm52/earbuds1.jpg",
        "https://i.ibb.co/RTqzvmJ/monitor1.jpg"
    ];

    useEffect(() => {
        // Change the image every 2 seconds
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length); // Loop back to the first image when reaching the end
        }, 2000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="carousel carousel-center rounded-3xl max-w-md w-[500px] space-x-4">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`carousel-item h-[500px] w-full transition-all duration-500 ${
                        index === currentIndex ? 'block' : 'hidden'
                    }`}
                >
                    <img
                        src={src}
                        className="rounded-box w-full h-full object-cover"
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}
        </div>
    );
};

export default Carousel;