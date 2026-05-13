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
  brand: string;
  events: string;
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
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => { stopCamera(); onClose(); }} 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0F0A09] border border-gold-soft/20 rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]" 
          >
            {/* Header */}
            <div className="px-10 py-8 border-b border-gold-soft/10 flex items-center justify-between bg-black/40 shrink-0">
               <div className="flex items-center gap-5">
                  <div className="size-12 rounded-2xl bg-gold-soft/10 border border-gold-soft/20 flex items-center justify-center text-gold-soft shadow-inner">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-gold-soft italic uppercase tracking-tighter">
                      {editingProduct ? 'Update_Artifact' : 'Register_New_Artifact'}
                    </h3>
                    <p className="text-[10px] font-black text-gold-soft/30 uppercase tracking-[0.3em]">Protocol: Secure_Entry_v2.0</p>
                  </div>
               </div>
               <button 
                 onClick={() => { stopCamera(); onClose(); }} 
                 className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-soft/40 hover:text-gold-soft hover:bg-gold-soft/20 transition-all active:scale-90"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Form Content Wrapper */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
               <div className="flex-1 flex flex-col lg:flex-row divide-x divide-gold-soft/10 overflow-hidden">
                  {/* Left: General Info */}
                  <div className="flex-1 p-10 space-y-8 overflow-y-auto custom-scrollbar">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2">
                           <InputField 
                             label="Artifact Name" 
                             value={formData.name} 
                             onChange={(v) => setFormData({...formData, name: v})} 
                             icon={<Tag size={16} />} 
                             placeholder="NOMENCLATURE_ID..." 
                           />
                        </div>
                        <div className="space-y-3 text-left md:col-span-2">
                           <label className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.2em] px-1">Taxonomy_Class</label>
                           <div className="relative group">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-soft/20 group-focus-within:text-gold-soft transition-colors pointer-events-none">
                                <Tag size={16} />
                              </div>
                              <select 
                                value={formData.category} 
                                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                                className="w-full h-14 bg-black/40 border border-gold-soft/10 rounded-2xl pl-12 pr-4 text-sm focus:border-gold-soft focus:bg-black/60 focus:outline-none text-gold-soft appearance-none cursor-pointer transition-all"
                              >
                                 <option value="" className="bg-[#0F0A09]">Select Classification...</option>
                                 {categories.map((cat) => (
                                   <option key={cat._id} value={cat.name} className="bg-[#0F0A09]">{cat.name}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                        <InputField label="Valuation (₹)" value={formData.price} onChange={(v) => setFormData({...formData, price: v})} icon={<IndianRupee size={16} />} type="number" placeholder="0.00" />
                        <InputField label="Mass_Metric" value={formData.weight} onChange={(v) => setFormData({...formData, weight: v})} icon={<Package size={16} />} placeholder="e.g. 250G" />
                        <InputField label="Registry_Count" value={formData.stock} onChange={(v) => setFormData({...formData, stock: v})} icon={<Archive size={16} />} type="number" placeholder="UNITS" />
                        <InputField label="Origin_Brand" value={formData.brand} onChange={(v) => setFormData({...formData, brand: v})} icon={<Tag size={16} />} placeholder="ESTATE_SOURCE" />
                        <InputField label="Event_Tags" value={formData.events} onChange={(v) => setFormData({...formData, events: v})} icon={<Package size={16} />} placeholder="WEDDING, ANNIVERSARY..." />
                     </div>
                     <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.2em] px-1">Artifact_Description</label>
                        <textarea 
                          value={formData.description} 
                          onChange={(e) => setFormData({...formData, description: e.target.value})} 
                          className="w-full h-40 bg-black/40 border border-gold-soft/10 rounded-2xl p-6 text-sm text-gold-soft focus:bg-black/60 focus:outline-none focus:border-gold-soft resize-none transition-all placeholder:text-gold-soft/10" 
                          placeholder="Provide technical specifications and tasting notes..." 
                        />
                     </div>
                  </div>

                  {/* Right: Images */}
                  <div className="w-full lg:w-[45%] p-10 space-y-10 flex flex-col overflow-y-auto custom-scrollbar bg-black/20">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.2em]">Visual_Signature</span>
                        <div className="flex bg-black/60 border border-gold-soft/10 p-1.5 rounded-2xl gap-1.5">
                           {[ 
                             {id:'url' as UploadMode,icon:Globe}, 
                             {id:'file' as UploadMode,icon:ImageIcon}, 
                             {id:'camera' as UploadMode,icon:Camera} 
                           ].map(m => (
                              <button 
                                key={m.id} 
                                type="button" 
                                onClick={() => { setUploadMode(m.id); stopCamera(); }} 
                                className={`size-10 rounded-xl flex items-center justify-center transition-all ${
                                  uploadMode === m.id 
                                    ? 'bg-gold-soft text-black shadow-lg' 
                                    : 'text-gold-soft/30 hover:text-gold-soft hover:bg-white/5'
                                }`}
                              >
                                <m.icon size={18} />
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="aspect-square bg-black/40 border border-gold-soft/10 rounded-[32px] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden p-8 text-center group">
                        {uploadMode === 'url' && (
                           <div className="w-full space-y-6">
                              <input 
                                type="text" 
                                value={formData.image} 
                                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                                className="w-full bg-black/40 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gold-soft/10 focus:border-gold-soft focus:bg-black/60 focus:outline-none transition-all text-gold-soft placeholder:text-gold-soft/10" 
                                placeholder="INPUT_SOURCE_URL..." 
                              />
                              {formData.image ? (
                                <img src={formData.image} className="h-48 mx-auto rounded-2xl shadow-2xl object-contain mix-blend-screen transition-transform group-hover:scale-105 duration-500" alt="" />
                              ) : (
                                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gold-soft/10 rounded-2xl"><Globe size={48} className="text-gold-soft/10" /></div>
                              )}
                           </div>
                        )}
                        {uploadMode === 'file' && (
                           <div className="flex flex-col items-center gap-6 w-full">
                              {previewImage ? (
                                <img src={previewImage} className="size-56 object-contain rounded-2xl shadow-2xl mix-blend-screen transition-transform group-hover:scale-105 duration-500" alt="" />
                              ) : (
                                <ImageIcon size={64} className="text-gold-soft/10" />
                              )}
                              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-soft cursor-pointer py-4 px-10 border border-gold-soft/20 rounded-2xl hover:bg-gold-soft hover:text-black transition-all shadow-xl">
                                INGEST_BINARY_FILE
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                              </label>
                           </div>
                        )}
                        {uploadMode === 'camera' && (
                           <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                              {!isCameraActive ? (
                                <button 
                                  type="button" 
                                  onClick={startCamera} 
                                  className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-soft/40 px-10 py-5 border-2 border-dashed border-gold-soft/10 rounded-2xl hover:border-gold-soft hover:text-gold-soft hover:bg-gold-soft/5 transition-all shadow-inner"
                                >
                                  ACTIVATE_OPTIC_SENSOR
                                </button>
                              ) : (
                                 <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden ring-1 ring-gold-soft/20">
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                    <canvas ref={canvasRef} className="hidden" />
                                    <button 
                                      type="button" 
                                      onClick={takePhoto} 
                                      className="absolute bottom-6 left-1/2 -translate-x-1/2 size-16 bg-white/10 backdrop-blur-md rounded-full p-1.5 shadow-2xl hover:scale-110 active:scale-95 transition-all border border-white/20"
                                    >
                                      <div className="size-full rounded-full border-2 border-gold-soft flex items-center justify-center">
                                        <div className="size-6 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                                      </div>
                                    </button>
                                 </div>
                              )}
                           </div>
                        )}
                     </div>

                     <div className="space-y-6 shrink-0 pt-8 border-t border-gold-soft/10">
                        <p className="text-[10px] font-black text-gold-soft/40 uppercase tracking-[0.2em]">Asset_Gallery_Matrix</p>
                        <div className="flex flex-wrap gap-4">
                           {formData.images.map((img, i) => (
                              <div key={i} className="size-20 rounded-2xl bg-black/40 border border-gold-soft/10 p-2 relative group shadow-2xl hover:border-gold-soft transition-all">
                                 <img src={img} className="size-full object-contain rounded-xl mix-blend-screen" alt="" />
                                 <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_, idx) => idx !== i)})} className="absolute -top-2 -right-2 size-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-2xl active:scale-90 border border-red-400/20"><X size={14}/></button>
                              </div>
                           ))}
                           {galleryFiles.map((f, i) => (
                              <div key={i} className="size-20 rounded-2xl bg-gold-soft/5 border border-gold-soft/20 p-2 relative group shadow-2xl">
                                 <img src={URL.createObjectURL(f)} className="size-full object-contain rounded-xl opacity-40 mix-blend-screen" alt="" />
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-[8px] font-black text-gold-soft uppercase tracking-tighter bg-black/60 px-2 py-1 rounded">PENDING</div>
                                 </div>
                                 <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_,idx)=>idx!==i))} className="absolute -top-2 -right-2 size-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-2xl active:scale-90 border border-red-400/20"><X size={14}/></button>
                              </div>
                           ))}
                           <label className="size-20 rounded-2xl border-2 border-dashed border-gold-soft/10 flex flex-col items-center justify-center cursor-pointer hover:border-gold-soft hover:bg-gold-soft/5 transition-all group shadow-inner">
                              <ImageIcon size={20} className="text-gold-soft/20 group-hover:text-gold-soft transition-colors" />
                              <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryFileChange} />
                           </label>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Footer */}
               <div className="px-10 py-8 border-t border-gold-soft/10 bg-black/40 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3 opacity-20 hover:opacity-50 transition-opacity cursor-default">
                    <ShieldCheck size={14} className="text-gold-soft" />
                    <span className="text-[10px] font-black text-gold-soft uppercase tracking-[0.4em]">AUTHENTICATED_SECURE_BYPASS</span>
                  </div>
                  <div className="flex gap-6 ml-auto">
                     <button type="button" onClick={() => { stopCamera(); onClose(); }} className="h-14 px-8 rounded-2xl text-[10px] font-black text-gold-soft/40 hover:text-gold-soft transition-all uppercase tracking-widest active:scale-95">Discard_Changes</button>
                     <button type="submit" className="h-14 px-12 bg-gold-soft text-black rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:shadow-[0_25px_50px_rgba(212,175,55,0.25)] hover:bg-gold-bright transition-all active:scale-95">
                        <ShieldCheck size={18} />
                        {editingProduct ? 'Commit_Update' : 'Commit_Registry'}
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
