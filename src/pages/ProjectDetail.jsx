import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const docRef = doc(db, 'projects', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProject({ id: docSnap.id, ...docSnap.data() });
            }
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextImage = () => {
        if (project?.images) {
            setCurrentImageIndex((prev) =>
                prev === project.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (project?.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? project.images.length - 1 : prev - 1
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass p-8 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-dark/70">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-dark/60">Proje bulunamadı.</p>
            </div>
        );
    }

    return (
        <div className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Left Side - Gallery */}
                    <div className="space-y-4">
                        {/* Video if exists */}
                        {project.video && (
                            <div className="mb-6">
                                <video
                                    controls
                                    className="w-full rounded-lg shadow-lg"
                                    src={project.video}
                                >
                                    Tarayıcınız video etiketini desteklemiyor.
                                </video>
                            </div>
                        )}

                        {/* Image Gallery/Carousel */}
                        {project.images && project.images.length > 0 && (
                            <div className="relative">
                                <div className="relative h-96 bg-gradient-to-br from-primary-light/20 to-primary/30 rounded-lg overflow-hidden">
                                    <img
                                        src={project.images[currentImageIndex]}
                                        alt={`${project.title} - ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {project.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                            >
                                                <ChevronLeft className="w-6 h-6 text-dark" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                                            >
                                                <ChevronRight className="w-6 h-6 text-dark" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {project.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2 mt-4">
                                        {project.images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={`aspect-square rounded-md overflow-hidden ${idx === currentImageIndex ? 'ring-2 ring-primary' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${idx + 1}`}
                                                    className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Details */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">
                            {project.title}
                        </h1>

                        <div className="flex gap-6 mb-8 text-dark/70">
                            <div>
                                <p className="text-sm font-medium text-dark/50">Yıl</p>
                                <p className="text-lg">{project.year}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-dark/50">Konum</p>
                                <p className="text-lg">{project.location}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-dark/50">Tür</p>
                                <p className="text-lg capitalize">{project.type}</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-2xl font-serif font-bold text-dark mb-4">
                                Proje Hakkında
                            </h2>
                            <p className="text-dark/70 leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
