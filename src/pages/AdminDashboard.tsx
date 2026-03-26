import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, X, Tag, ShieldCheck, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import api from '@/utils/api';

// Sub-components
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import InventoryTable from '@/components/admin/InventoryTable';
import OrdersTable from '@/components/admin/OrdersTable';
import ProductModal from '@/components/admin/ProductModal';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
import { StatsCard } from '@/components/admin/AdminComponents';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  weight: string;
  image: string;
  images: string[];
  description: string;
}

interface Order {
  _id: string;
  user: { _id: string; name: string; email: string; };
  items: any[];
  shippingAddress: any;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'categories' | 'overview' | 'analytics'>('inventory');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [uploadMode, setUploadMode] = useState<'url' | 'file' | 'camera'>('url');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    weight: '',
    description: '',
    image: '',
    images: [] as string[]
  });

  const [newCatName, setNewCatName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        api.get('/products'),
        api.get('/categories'),
        api.get('/orders')
      ]);

      if (results[0].status === 'fulfilled') setProducts(results[0].value.data);
      if (results[1].status === 'fulfilled') setCategories(results[1].value.data);
      if (results[2].status === 'fulfilled') {
        setOrders(results[2].value.data);
      } else {
        console.warn('Orders currently inaccessible (Authorized protocol required)');
        setOrders([]);
      }
    } catch (error) {
      console.error('Core synchronization failure:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        weight: product.weight || '',
        description: product.description,
        image: product.image,
        images: product.images || []
      });
      setPreviewImage(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', price: '', category: '', stock: '', weight: '', description: '', image: '', images: []
      });
      setPreviewImage(null);
    }
    setUploadMode('url');
    setSelectedFile(null);
    setGalleryFiles([]);
    setIsModalOpen(true);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Could not access camera");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured_photo.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(blob));
            stopCamera();
            setUploadMode('file');
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setUploadMode('file');
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryFiles(prev => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'images') data.append(key, value as string);
    });
    
    if (selectedFile) data.append('image', selectedFile);
    else data.append('image', formData.image);

    formData.images.forEach(img => data.append('images', img));
    galleryFiles.forEach(file => data.append('images', file));

    try {
      if (editingProduct) await api.put(`/products/${editingProduct._id}`, data);
      else await api.post('/products', data);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await api.post('/categories', { name: newCatName });
      setNewCatName('');
      fetchData();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] font-body text-cocoa-deep relative overflow-hidden selection:bg-burnt-caramel selection:text-white">
      {/* Background Motifs */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#1A0F0D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }} />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        logout={handleLogout}
      />

      <main className="flex-1 overflow-hidden flex flex-col relative z-10">
        <AdminHeader 
          activeTab={activeTab} 
          setIsSidebarOpen={setIsSidebarOpen} 
          handleOpenModal={handleOpenModal} 
          newCatName={newCatName} 
          setNewCatName={setNewCatName} 
          handleAddCategory={handleAddCategory} 
        />

        <div className="p-8 md:p-14 flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'inventory' ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <StatsCard label="Verified Artifacts" value={products.length.toString()} icon={<Package size={24} className="text-burnt-caramel" />} />
                <StatsCard label="Depleted Registry" value={products.filter(p => p.stock === 0).length.toString()} icon={<X size={24} className="text-rose-400" />} />
                <StatsCard label="Taxonomy Nodes" value={categories.length.toString()} icon={<Tag size={24} className="text-botanical-green" />} />
              </div>
              
              <div className="flex items-center justify-between border-b-2 border-cocoa-deep/5 pb-6">
                 <div className="flex items-center gap-6">
                    <ShieldCheck size={20} className="text-burnt-caramel/40" />
                    <h2 className="text-3xl font-display italic">Botanical <span className="text-burnt-caramel font-black not-italic tracking-tighter">Inventory Matrix</span></h2>
                 </div>
                 <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] text-cocoa-deep/10">Authorized_Registry_v04</span>
              </div>
              
              <InventoryTable products={products} loading={loading} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            </motion.div>
          ) : activeTab === 'orders' ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-12">
               <div className="flex items-center justify-between border-b-2 border-cocoa-deep/5 pb-6">
                 <div className="flex items-center gap-6">
                    <Zap size={20} className="text-botanical-green/40" />
                    <h2 className="text-3xl font-display italic">Acquisition <span className="text-botanical-green font-black not-italic tracking-tighter">Transmission Logs</span></h2>
                 </div>
                 <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] text-cocoa-deep/10">Encrypted_History_Active</span>
              </div>
              <OrdersTable orders={orders} loading={loading} handleUpdateOrderStatus={handleUpdateOrderStatus} setSelectedOrder={setSelectedOrder} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-12">
               <div className="flex items-center justify-between border-b-2 border-cocoa-deep/5 pb-6">
                 <div className="flex items-center gap-6">
                    <Tag size={20} className="text-burnt-caramel/40" />
                    <h2 className="text-3xl font-display italic">Botanical <span className="text-burnt-caramel font-black not-italic tracking-tighter">Taxonomy Nodes</span></h2>
                 </div>
                 <span className="font-body text-[9px] font-black uppercase tracking-[0.6em] text-cocoa-deep/10">Hierarchy_Management_v2</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categories.map((cat) => (
                  <motion.div key={cat._id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-[40px] border border-cocoa-deep/[0.03] shadow-sm hover:shadow-4xl transition-all group relative overflow-hidden group">
                     <div className="absolute top-[-30px] right-[-10px] text-[10vw] font-display font-black text-cocoa-deep/[0.02] select-none pointer-events-none italic tracking-tighter">{cat.name.charAt(0)}</div>
                     <div className="relative z-10 flex items-center justify-between">
                        <h4 className="text-2xl font-display text-cocoa-deep italic group-hover:pl-4 transition-all duration-700">{cat.name}</h4>
                        <button onClick={() => handleDeleteCategory(cat._id)} className="size-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-400 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center hover:bg-rose-500 hover:text-white transform group-hover:-translate-x-2">
                           <X size={16} />
                        </button>
                     </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <ProductModal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
        editingProduct={editingProduct} formData={formData} setFormData={setFormData}
        categories={categories} uploadMode={uploadMode} setUploadMode={setUploadMode}
        previewImage={previewImage} handleFileChange={handleFileChange}
        galleryFiles={galleryFiles} setGalleryFiles={setGalleryFiles} 
        handleGalleryFileChange={handleGalleryFileChange}
        isCameraActive={isCameraActive} startCamera={startCamera} stopCamera={stopCamera} takePhoto={takePhoto}
        videoRef={videoRef} canvasRef={canvasRef} handleSubmit={handleSubmit}
      />

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
