import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { motion } from 'framer-motion';
import { Upload, X, Trash2, Edit2, Check } from 'lucide-react';
import Button from '../components/Button';

export default function Admin() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: new Date().getFullYear(),
        location: '',
        type: 'residential',
        isFeatured: false,
    });
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFiles = async (projectId) => {
        const uploadedImages = [];

        // Upload images
        for (let i = 0; i < images.length; i++) {
            const imageRef = ref(storage, `projects/${projectId}/image_${i}_${Date.now()}`);
            await uploadBytes(imageRef, images[i]);
            const url = await getDownloadURL(imageRef);
            uploadedImages.push(url);
        }

        // Upload video if exists
        let videoUrl = null;
        if (video) {
            const videoRef = ref(storage, `projects/${projectId}/video_${Date.now()}`);
            await uploadBytes(videoRef, video);
            videoUrl = await getDownloadURL(videoRef);
        }

        return { images: uploadedImages, video: videoUrl };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                // Update existing project
                const { images: uploadedImages, video: videoUrl } = await uploadFiles(editingId);

                const projectRef = doc(db, 'projects', editingId);
                await updateDoc(projectRef, {
                    ...formData,
                    images: uploadedImages.length > 0 ? uploadedImages : undefined,
                    video: videoUrl || undefined,
                });

                alert('Proje güncellendi!');
                setEditingId(null);
            } else {
                // Create new project
                const docRef = await addDoc(collection(db, 'projects'), {
                    ...formData,
                    createdAt: new Date(),
                });

                const { images: uploadedImages, video: videoUrl } = await uploadFiles(docRef.id);

                await updateDoc(docRef, {
                    images: uploadedImages,
                    video: videoUrl,
                });

                alert('Proje başarıyla eklendi!');
            }

            // Reset form
            setFormData({
                title: '',
                description: '',
                year: new Date().getFullYear(),
                location: '',
                type: 'residential',
                isFeatured: false,
            });
            setImages([]);
            setVideo(null);
            fetchProjects();
        } catch (error) {
            console.error('Error adding/updating project:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return;

        try {
            await deleteDoc(doc(db, 'projects', id));
            alert('Proje silindi!');
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Silme işlemi başarısız oldu.');
        }
    };

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            year: project.year,
            location: project.location,
            type: project.type,
            isFeatured: project.isFeatured || false,
        });
        setEditingId(project.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="py-12 bg-secondary min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold text-dark mb-8">
                    CMS - Proje Yönetimi
                </h1>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg p-8 mb-12"
                >
                    <h2 className="text-2xl font-serif font-bold text-dark mb-6">
                        {editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-dark mb-2">
                                    Proje Adı *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark mb-2">
                                    Yıl *
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark mb-2">
                                    Konum *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-dark mb-2">
                                    Tür *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="residential">Konut</option>
                                    <option value="commercial">Ticari</option>
                                    <option value="public">Kamu</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark mb-2">
                                Açıklama *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <label className="ml-2 text-sm font-medium text-dark">
                                Öne Çıkan Proje
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-dark mb-2">
                                Görseller
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {images.length > 0 && (
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative">
                                            <img
                                                src={URL.createObjectURL(img)}
                                                alt={`Preview ${idx}`}
                                                className="w-full h-24 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Video Upload */}
                        <div>
                            <label className="block text-sm font-medium text-dark mb-2">
                                Video (Opsiyonel)
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {video && (
                                <p className="mt-2 text-sm text-dark/60">
                                    Seçilen video: {video.name}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Yükleniyor...
                                    </span>
                                ) : editingId ? (
                                    'Güncelle'
                                ) : (
                                    'Yayınla'
                                )}
                            </Button>
                            {editingId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({
                                            title: '',
                                            description: '',
                                            year: new Date().getFullYear(),
                                            location: '',
                                            type: 'residential',
                                            isFeatured: false,
                                        });
                                        setImages([]);
                                        setVideo(null);
                                    }}
                                >
                                    İptal
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* Projects List */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-serif font-bold text-dark mb-6">
                        Tüm Projeler ({projects.length})
                    </h2>

                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-dark">{project.title}</h3>
                                    <p className="text-sm text-dark/60">
                                        {project.year} • {project.location} • {project.type}
                                        {project.isFeatured && (
                                            <span className="ml-2 text-primary">★ Öne Çıkan</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="p-2 hover:bg-primary/10 rounded-md transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5 text-primary" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {projects.length === 0 && (
                            <p className="text-center text-dark/60 py-8">
                                Henüz proje eklenmemiş.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
