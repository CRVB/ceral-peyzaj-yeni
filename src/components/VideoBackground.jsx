import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoBackground({ videos }) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const videoElement = document.getElementById(`video-${currentVideoIndex}`);

        if (videoElement) {
            const handleVideoEnd = () => {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
                    setIsTransitioning(false);
                }, 800); // Transition duration
            };

            videoElement.addEventListener('ended', handleVideoEnd);

            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, [currentVideoIndex, videos.length]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
                {videos.map((video, index) => (
                    index === currentVideoIndex && (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0"
                        >
                            <video
                                id={`video-${index}`}
                                className="w-full h-full object-cover"
                                playsInline
                                muted
                                autoPlay
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-black/30" />
                        </motion.div>
                    )
                ))}
            </AnimatePresence>
        </div>
    );
}
