import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import Button from './Button';

export default function Layout({ children }) {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Ana Sayfa' },
        { path: '/projects', label: 'Projeler' },
        { path: '/contact', label: 'İletişim' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-dark/5 ${isScrolled ? 'py-2' : 'py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center group">
                            <div className={`rounded-full overflow-hidden transition-all duration-300 bg-white shadow-lg ${isScrolled ? 'h-14 w-14 ring-2 ring-primary/20' : 'h-20 w-20 ring-4 ring-primary/10'
                                }`}>
                                <img
                                    src={logo}
                                    alt="Ceral Peyzaj Tasarım"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="relative px-2 py-1 text-sm font-medium transition-colors group"
                                >
                                    <span className={`relative z-10 ${location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-dark hover:text-primary'
                                        }`}>
                                        {link.label}
                                    </span>
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-secondary-dark/50 transition-colors text-dark"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-2xl font-serif font-bold ${location.pathname === link.path ? 'text-primary' : 'text-dark'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content with Page Transitions */}
            <motion.main
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
            >
                {children}
            </motion.main>

            {/* Footer */}
            <footer className="bg-dark text-secondary py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">Ceral Peyzaj</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Doğanın estetiğini modern yaşamın konforuyla buluşturuyoruz. Sürdürülebilir ve yenilikçi peyzaj çözümleri.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">İletişim</h3>
                            <p className="text-white/60 text-sm mb-2">info@ceralpeyzaj.com</p>
                            <p className="text-white/60 text-sm">+90 (555) 123 45 67</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif font-bold mb-4">Adres</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Levent Mah. Büyükdere Cad. No:123<br />
                                Beşiktaş / İstanbul
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
                        <p>© {new Date().getFullYear()} Ceral Peyzaj Tasarım. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
