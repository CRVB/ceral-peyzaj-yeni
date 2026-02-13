import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Send, Clock } from 'lucide-react';
import Button from '../components/Button';

export default function Contact() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formState);
        alert('Mesajınız alındı! En kısa sürede size döneceğiz.');
        setFormState({ name: '', email: '', message: '' });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Telefon',
            value: '+90 (555) 123 45 67',
            desc: 'Hafta içi 09:00 - 18:00',
            href: 'tel:+905551234567',
            delay: 0.1
        },
        {
            icon: Mail,
            title: 'E-posta',
            value: 'info@ceralpeyzaj.com',
            desc: 'Her zaman bize yazabilirsiniz',
            href: 'mailto:info@ceralpeyzaj.com',
            delay: 0.2
        },
        {
            icon: MapPin,
            title: 'Ofis',
            value: 'Levent, Büyükdere Cd. No:123',
            desc: 'Beşiktaş / İstanbul',
            href: 'https://maps.google.com',
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen pt-28 md:pt-40 pb-12 bg-secondary">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark mb-4 md:mb-6"
                >
                    İletişime Geçin
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-base md:text-lg text-dark/60 max-w-2xl mx-auto leading-relaxed px-4"
                >
                    Hayalinizdeki peyzaj projesini gerçeğe dönüştürmek için buradayız.
                    Sorularınız, teklif talepleriniz veya tanışmak için bize ulaşın.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Contact Info Column */}
                    <div>
                        <div className="grid gap-6 mb-12">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel="noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: item.delay }}
                                    className="group flex items-start gap-6 p-6 rounded-2xl bg-white shadow-sm border border-secondary-dark/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-lg text-dark mb-1">{item.title}</h3>
                                        <p className="text-primary font-medium mb-1 group-hover:underline">{item.value}</p>
                                        <p className="text-sm text-dark/50">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-dark text-white p-8 rounded-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-primary/20 rounded-full blur-2xl" />

                            <h3 className="font-serif font-bold text-xl mb-6 relative z-10">Bizi Takip Edin</h3>
                            <div className="flex gap-4 relative z-10">
                                <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors backdrop-blur-sm">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors backdrop-blur-sm">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors backdrop-blur-sm">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary-dark/30"
                    >
                        <h2 className="font-serif font-bold text-2xl text-dark mb-2">Bize Yazın</h2>
                        <p className="text-dark/50 mb-8">Formu doldurun, en kısa sürede size dönüş yapalım.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-2">
                                    Adınız Soyadınız
                                </label>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-dark/30"
                                    placeholder="Adınız Soyadınız"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-2">
                                    E-posta Adresiniz
                                </label>
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-dark/30"
                                    placeholder="ornek@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark/70 mb-2">
                                    Mesajınız
                                </label>
                                <textarea
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-secondary-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-dark/30 resize-none"
                                    placeholder="Projeniz hakkında kısaca bilgi verin..."
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full justify-center py-4 text-base">
                                <Send className="h-5 w-5 mr-2" />
                                Mesaj Gönder
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 md:mt-32 rounded-3xl overflow-hidden shadow-lg h-[400px] md:h-[500px] relative grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12037.769974112185!2d29.0063259!3d41.0370014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sBe%C5%9Fikta%C5%9F%2C%20Istanbul!5e0!3m2!1sen!2str!4v1707222444444!5m2!1sen!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    />
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg md:block hidden">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-xs text-dark/60 font-medium">Çalışma Saatleri</p>
                                <p className="text-sm font-bold text-dark">09:00 - 18:00</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
