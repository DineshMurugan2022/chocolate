import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, X, Tag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import api from '@/utils/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Product, type Order, type Category } from '@shared/types';
import toast from 'react-hot-toast';

// Sub-components
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import InventoryTable from '@/components/admin/InventoryTable';
import OrdersTable from '@/components/admin/OrdersTable';
import ProductModal from '@/components/admin/ProductModal';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
import { StatsCard } from '@/components/admin/AdminComponents';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'categories' | 'overview' | 'analytics'>('inventory');
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
    name: '', price: '', category: '', stock: '', weight: '', description: '', image: '', images: [] as string[], brand: '', events: ''
  });

  const [newCatName, setNewCatName] = useState('');

  // Queries
  const { data: products = [], isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/products')).data
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => (await api.get('/categories')).data
  });

  const { data: orders = [], isLoading: isOrdersLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => (await api.get('/orders')).data
  });

  const loading = isProductsLoading || isCategoriesLoading || isOrdersLoading;

  // Mutations
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => 
      await api.patch(`/orders/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    }
  });

  const productMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (editingProduct) return await api.put(`/products/${editingProduct._id}`, data);
      return await api.post('/products', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
      toast.success(editingProduct ? 'Product updated' : 'Product created');
    }
  });

  const handleUpdateOrderStatus = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: (product.stock ?? 0).toString(),
        weight: product.weight || '',
        description: product.description,
        image: product.image,
        images: product.images || [],
        brand: product.brand || '',
        events: product.events ? product.events.join(', ') : ''
      });
      setPreviewImage(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '', price: '', category: '', stock: '', weight: '', description: '', image: '', images: [], brand: '', events: ''
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
      if (key === 'events' && typeof value === 'string' && value.trim() !== '') {
        value.split(',').forEach(e => data.append('events', e.trim()));
      } else if (key !== 'image' && key !== 'images' && key !== 'events') {
        data.append(key, value as string);
      }
    });
    
    if (selectedFile) data.append('image', selectedFile);
    else data.append('image', formData.image);

    formData.images.forEach(img => data.append('images', img));
    galleryFiles.forEach(file => data.append('images', file));

    galleryFiles.forEach(file => data.append('images', file));

    productMutation.mutate(data);
  };

  const categoryMutation = useMutation({
    mutationFn: async (name: string) => await api.post('/categories', { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNewCatName('');
      toast.success('Category added');
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => await api.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => await api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted');
    }
  });

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    categoryMutation.mutate(newCatName);
  };

  const handleDeleteCategory = (id: string) => {
    if (!window.confirm('Delete this category?')) return;
    deleteCategoryMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen bg-transparent font-body text-cocoa-deep overflow-hidden selection:bg-burnt-caramel selection:text-white">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        logout={handleLogout}
      />

      <main className="flex-1 overflow-hidden flex flex-col relative">
        <AdminHeader 
          activeTab={activeTab} 
          setIsSidebarOpen={setIsSidebarOpen} 
          handleOpenModal={handleOpenModal} 
          newCatName={newCatName} 
          setNewCatName={setNewCatName} 
          handleAddCategory={handleAddCategory} 
        />

        <div className="p-6 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === 'inventory' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <StatsCard label="Total Products" value={products.length.toString()} icon={<Package size={20} className="text-blue-600" />} />
                <StatsCard label="Out of Stock" value={products.filter(p => p.stock === 0).length.toString()} icon={<X size={20} className="text-red-600" />} />
                <StatsCard label="Categories" value={categories.length.toString()} icon={<Tag size={20} className="text-purple-600" />} />
              </div>
              
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                 <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory</h2>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Admin Panel</span>
              </div>
              
              <InventoryTable products={products} loading={loading} handleOpenModal={handleOpenModal} handleDelete={handleDelete} />
            </motion.div>
          ) : activeTab === 'orders' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                 <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h2>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order History</span>
              </div>
              <OrdersTable orders={orders} loading={loading} handleUpdateOrderStatus={handleUpdateOrderStatus} setSelectedOrder={setSelectedOrder} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
               <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                 <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Categories</h2>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Manage Categories</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <motion.div key={cat._id} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                     <div className="flex items-center justify-between relative z-10">
                        <h4 className="text-lg font-bold text-gray-900">{cat.name}</h4>
                        <button onClick={() => handleDeleteCategory(cat._id)} className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white">
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
