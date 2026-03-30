import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  Tag, 
  IndianRupee, 
  Package, 
  Archive, 
  Camera, 
  Globe, 
  Image as ImageIcon 
} from 'lucide-react';
import { InputField } from './AdminComponents';

type UploadMode = 'url' | 'file' | 'camera';

interface Category {
  _id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  stock: string;
  weight: string;
  description: string;
  image: string;
  images: string[];
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: { _id: string } | null;
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
  categories: Category[];
  uploadMode: UploadMode;
  setUploadMode: (mode: UploadMode) => void;
  previewImage: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  galleryFiles: File[];
  setGalleryFiles: (files: File[]) => void;
  handleGalleryFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCameraActive: boolean;
  startCamera: () => void;
  stopCamera: () => void;
  takePhoto: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  handleSubmit: (e: React.FormEvent) => void;
}

const ProductModal = ({ 
  isOpen, 
  onClose, 
  editingProduct, 
  formData, 
  setFormData, 
  categories,
  uploadMode,
  setUploadMode,
  previewImage,
  handleFileChange,
  galleryFiles,
  setGalleryFiles,
  handleGalleryFileChange,
  isCameraActive,
  startCamera,
  stopCamera,
  takePhoto,
  videoRef,
  canvasRef,
  handleSubmit
}: ProductModalProps) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { stopCamera(); onClose(); }} className="absolute inset-0 bg-black/40" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" 
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
               <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white"><Package size={18} /></div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  </div>
               </div>
               <button onClick={() => { stopCamera(); onClose(); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"><X size={20} /></button>
            </div>

            {/* Form Content Wrapper */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
               <div className="flex-1 flex flex-col md:flex-row divide-x divide-gray-100 overflow-hidden">
                  {/* Left: General Info */}
                  <div className="flex-1 p-8 pb-32 space-y-6 overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                           <InputField label="Product Name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} icon={<Tag size={14} />} placeholder="Enter product name..." />
                        </div>
                        <div className="space-y-2 text-left md:col-span-2">
                           <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">Category</label>
                           <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-sm focus:border-blue-500 focus:bg-white focus:outline-none appearance-none cursor-pointer transition-all">
                              <option value="">Select category...</option>
                              {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                           </select>
                        </div>
                        <InputField label="Price (₹)" value={formData.price} onChange={(v) => setFormData({...formData, price: v})} icon={<IndianRupee size={14} />} type="number" />
                        <InputField label="Weight" value={formData.weight} onChange={(v) => setFormData({...formData, weight: v})} icon={<Package size={14} />} placeholder="e.g. 100g" />
                        <InputField label="Stock Units" value={formData.stock} onChange={(v) => setFormData({...formData, stock: v})} icon={<Archive size={14} />} type="number" />
                     </div>
                     <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">Description</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-blue-500 resize-none transition-all" placeholder="Enter product description..." />
                     </div>
                  </div>

                  {/* Right: Images */}
                  <div className="w-full md:w-[45%] p-8 pb-32 space-y-8 flex flex-col overflow-y-auto custom-scrollbar bg-gray-50/50">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Display Image</span>
                        <div className="flex bg-white border border-gray-200 p-1 rounded-lg gap-1">
                           {[ {id:'url' as UploadMode,icon:Globe}, {id:'file' as UploadMode,icon:ImageIcon}, {id:'camera' as UploadMode,icon:Camera} ].map(m => (
                              <button key={m.id} type="button" onClick={() => { setUploadMode(m.id); stopCamera(); }} className={`size-8 rounded-md flex items-center justify-center transition-all ${uploadMode === m.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}><m.icon size={14} /></button>
                           ))}
                        </div>
                     </div>

                     <div className="aspect-square bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center relative shadow-sm overflow-hidden p-6 text-center">
                        {uploadMode === 'url' && (
                           <div className="w-full space-y-4">
                              <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-50 p-3 rounded-lg text-xs font-medium border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all" placeholder="Paste image URL here..." />
                              {formData.image && <img src={formData.image} className="h-40 mx-auto rounded-xl shadow-md object-contain" alt="" />}
                           </div>
                        )}
                        {uploadMode === 'file' && (
                           <div className="flex flex-col items-center gap-4">
                              {previewImage ? <img src={previewImage} className="size-48 object-contain rounded-xl shadow-md" alt="" /> : <ImageIcon size={48} className="text-gray-200" />}
                              <label className="text-xs font-bold uppercase tracking-widest text-blue-600 cursor-pointer py-2 px-6 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all">Select Image<input type="file" accept="image/*" className="hidden" onChange={handleFileChange} /></label>
                           </div>
                        )}
                        {uploadMode === 'camera' && (
                           <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                              {!isCameraActive ? <button type="button" onClick={startCamera} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-6 py-3 border-2 border-dashed border-gray-200 rounded-lg hover:bg-white hover:border-blue-500 transition-all">Start Camera</button> : (
                                 <div className="relative w-full h-full bg-black">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                    <canvas ref={canvasRef} className="hidden" />
                                    <button type="button" onClick={takePhoto} className="absolute bottom-4 left-1/2 -translate-x-1/2 size-12 bg-white rounded-full p-1 shadow-lg hover:scale-110 transition-all"><div className="size-full rounded-full border-2 border-blue-600 flex items-center justify-center"><div className="size-4 bg-red-600 rounded-full" /></div></button>
                                 </div>
                              )}
                           </div>
                        )}
                     </div>

                     <div className="space-y-4 shrink-0 pt-6 border-t border-gray-200">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Selection Gallery</p>
                        <div className="flex flex-wrap gap-3">
                           {formData.images.map((img, i) => (
                              <div key={i} className="size-16 rounded-xl bg-white border border-gray-200 p-2 relative group shadow-sm transition-all hover:border-blue-500">
                                 <img src={img} className="size-full object-contain rounded-lg" alt="" />
                                 <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 size-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-95"><X size={12}/></button>
                              </div>
                           ))}
                           {galleryFiles.map((f, i) => (
                              <div key={i} className="size-16 rounded-xl bg-blue-50 border border-blue-100 p-2 relative group shadow-sm">
                                 <img src={URL.createObjectURL(f)} className="size-full object-contain rounded-lg opacity-50" alt="" />
                                 <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_,idx)=>idx!==i))} className="absolute -top-2 -right-2 size-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-95"><X size={12}/></button>
                              </div>
                           ))}
                           <label className="size-16 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-white transition-all group">
                              <ImageIcon size={18} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                              <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryFileChange} />
                           </label>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Footer */}
               <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hidden sm:block">Asian Chocolate Store Admin Panel</span>
                  <div className="flex gap-4 ml-auto">
                     <button type="button" onClick={() => { stopCamera(); onClose(); }} className="h-12 px-8 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-900 transition-all uppercase">Discard</button>
                     <button type="submit" className="h-12 px-10 bg-blue-600 text-white rounded-xl flex items-center gap-2 text-xs font-bold uppercase shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all">
                        <ShieldCheck size={16} />
                        {editingProduct ? 'Update Product' : 'Create Product'}
                     </button>
                  </div>
               </div>
            </form>
         </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
