import { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.type === filter);

    const featuredProjects = filteredProjects.filter(p => p.isFeatured);
    const regularProjects = filteredProjects.filter(p => !p.isFeatured);

    const filters = [
        { id: 'all', label: 'Tümü' },
        { id: 'residential', label: 'Konut' },
        { id: 'commercial', label: 'Ticari' },
        { id: 'public', label: 'Kamu' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <p className="font-serif text-lg text-dark/60 animate-pulse">Projeler Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Animated Filter Tabs */}
                <div className="mb-12 md:mb-20 flex justify-center w-full overflow-x-auto pb-4 md:pb-0 no-scrollbar">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white p-2 shadow-sm border border-secondary-dark/50 whitespace-nowrap">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`relative px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${filter === f.id ? 'text-white' : 'text-dark/60 hover:text-dark'
                                    }`}
                            >
                                {filter === f.id && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Projects Section */}
                {featuredProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-24"
                    >
                        <div className="flex items-end gap-4 mb-8 border-b border-dark/10 pb-4">
                            <h2 className="text-3xl font-serif font-bold text-dark">Öne Çıkanlar</h2>
                            <span className="text-sm font-medium text-primary mb-1.5">Seçilmiş Özel Projeler</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {featuredProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} featured />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Regular Projects Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {featuredProjects.length > 0 && (
                        <div className="flex items-end gap-4 mb-8 border-b border-dark/10 pb-4">
                            <h2 className="text-2xl font-serif font-bold text-dark">Tüm Liste</h2>
                            <span className="text-sm text-dark/50 mb-1">{regularProjects.length} Proje</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-block p-6 rounded-full bg-secondary-dark/30 mb-4">
                            <MapPin className="h-8 w-8 text-dark/30" />
                        </div>
                        <p className="text-xl font-serif text-dark/50">
                            Bu kategoride henüz proje bulunmuyor.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}



function ProjectCard({ project, index, featured = false }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group sticky top-0 ${featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}`}
        >
            <Link to={`/projects/${project.id}`} className="block h-full cursor-none-target">
                <div className={`relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 group-hover:shadow-2xl ${featured ? 'aspect-[16/9]' : 'aspect-[4/5]'} isolate`}>

                    {/* Image Background */}
                    <div className="absolute inset-0 w-full h-full">
                        {project.images && project.images[0] ? (
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />
                        ) : (
                            <div className="h-full w-full bg-secondary-dark/30 animate-pulse" />
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                        {/* Floating Action Button */}
                        <div className="absolute top-6 right-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform duration-300 hover:bg-white hover:text-dark">
                                <ArrowUpRight className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                            <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                {project.type === 'residential' ? 'Konut' :
                                    project.type === 'commercial' ? 'Ticari' :
                                        project.type === 'public' ? 'Kamu' : 'Peyzaj'}
                            </span>

                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-tight">
                                {project.title}
                            </h3>

                            <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4" />
                                    <span>{project.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    <span>{project.year}</span>
                                </div>
                            </div>

                            <p className="mt-4 text-white/70 line-clamp-2 text-sm opacity-0 transition-all duration-500 group-hover:opacity-100 delay-100">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
