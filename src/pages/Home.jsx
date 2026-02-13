import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import VideoBackground from '../components/VideoBackground';
import { Leaf, Sparkles, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import video1 from '../assets/video-1.mp4';
import video2 from '../assets/video-2.mp4';

export default function Home() {
    const navigate = useNavigate();
    const videos = [video1, video2];

    const stats = [
        { value: '150+', label: 'Tamamlanan Proje' },
        { value: '12+', label: 'Yıllık Deneyim' },
        { value: '98%', label: 'Müşteri Memnuniyeti' },
        { value: '25+', label: 'Ödül & Sertifika' },
    ];

    const services = [
        {
            icon: Leaf,
            title: 'Peyzaj Tasarımı',
            description: 'Yerleşim alanlarınız için doğayla uyumlu, sürdürülebilir peyzaj çözümleri.',
        },
        {
            icon: Sparkles,
            title: 'Konsept Geliştirme',
            description: 'Yaratıcı ve özgün konseptlerle projenizi hayata geçiriyoruz.',
        },
        {
            icon: Award,
            title: 'Danışmanlık',
            description: 'Uzman kadromuzla peyzaj projelerinizde profesyonel danışmanlık hizmeti.',
        },
        {
            icon: Users,
            title: 'Proje Yönetimi',
            description: 'Baştan sona eksiksiz proje takibi ve uygulama yönetimi.',
        },
    ];

    const features = [
        'Sürdürülebilir Tasarım Anlayışı',
        'Yenilikçi Peyzaj Çözümleri',
        'Profesyonel Ekip',
        'Zamanında Teslimat',
    ];

    return (
        <div className="relative bg-secondary">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <VideoBackground videos={videos} />

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/3 right-20 w-40 h-40 bg-accent-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                    >
                        <span className="text-white/90 text-sm font-medium">🌿 Premium Peyzaj Tasarımı</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold text-white mb-6 drop-shadow-2xl leading-tight tracking-tight"
                    >
                        Doğa ile Tasarımı<br />
                        <span className="inline-block text-accent-sage pb-2 font-display font-black tracking-wide drop-shadow-lg">
                            Buluşturuyoruz
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 drop-shadow-lg px-4 max-w-3xl mx-auto font-light"
                    >
                        Peyzaj mimarisinde yenilikçi ve sürdürülebilir çözümler.
                        Her proje, doğanın güzelliğini modern estetiğe dönüştürüyor.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex justify-center"
                    >
                        <Button onClick={() => navigate('/projects')} className="group text-lg px-8 py-4 flex items-center gap-2">
                            <span>Projelerimizi Keşfedin</span>
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-20 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-primary/5 hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-3xl md:text-5xl font-display font-bold bg-gradient-to-br from-primary-600 to-primary-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-dark/60 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
                            Hizmetlerimiz
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-6">
                            Sizin İçin Neler
                            <span className="inline-block text-accent-sage pb-2 font-display font-black tracking-wide drop-shadow-lg">
                                Yapabiliriz
                            </span>
                        </h2>
                        <p className="text-lg text-dark/60 max-w-2xl mx-auto">
                            Profesyonel ekibimiz ve yenilikçi yaklaşımımızla hayalinizdeki açık alanları yaratıyoruz.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-secondary-dark/20 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <service.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-dark/60 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About + Features Section */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-sage rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">
                                Hakkımızda
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6 leading-tight">
                                Doğayı ve Tasarımı
                                <span className="block text-primary">Harmanlıyoruz</span>
                            </h2>
                            <p className="text-lg text-dark/70 leading-relaxed mb-8">
                                Ceral Peyzaj Tasarım olarak, açık alanları yaşanabilir sanat eserlerine
                                dönüştürüyoruz. Her proje, doğanın güzelliğini modern tasarım anlayışıyla
                                harmanlayarak benzersiz deneyimler yaratmayı hedefliyor.
                            </p>
                            <p className="text-base text-dark/60 leading-relaxed">
                                Yılların deneyimi ve tutkulu ekibimizle, konut, ticari ve kamu projelerinde
                                sürdürülebilir ve estetik çözümler sunuyoruz.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4 p-5 bg-secondary rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                        <CheckCircle2 className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-dark text-lg">{feature}</h4>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-gold rounded-full blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            Bir Sonraki Projeniz İçin
                            <span className="block text-accent-gold">Hazır mısınız?</span>
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                            Hayalinizdeki peyzajı birlikte tasarlayalım. Ücretsiz danışmanlık için hemen iletişime geçin.
                        </p>
                        <Button
                            onClick={() => navigate('/contact')}
                            className="bg-white text-primary hover:bg-secondary group"
                        >
                            Hemen Başlayın
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
