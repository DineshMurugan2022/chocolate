import React, { useRef } from 'react';
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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: any;
  formData: any;
  setFormData: (data: any) => void;
  categories: any[];
  uploadMode: 'url' | 'file' | 'camera';
  setUploadMode: (mode: 'url' | 'file' | 'camera') => void;
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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { stopCamera(); onClose(); }} className="absolute inset-0 bg-cocoa-deep/10 backdrop-blur-md" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]" 
          >
            {/* Minimal Header */}
            <div className="px-8 py-5 border-b border-cocoa-deep/5 flex items-center justify-between bg-ivory-warm/30 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-botanical-green flex items-center justify-center text-white shadow-lg"><ShieldCheck size={20} /></div>
                  <div>
                    <h3 className="text-xl font-display font-black text-cocoa-deep italic">{editingProduct ? 'Commit Matrix Update' : 'New Harvest Induction'}</h3>
                    <p className="text-[8px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep/20">Protocol Matrix 4.0</p>
                  </div>
               </div>
               <button onClick={() => { stopCamera(); onClose(); }} className="size-8 rounded-full bg-white border border-cocoa-deep/5 flex items-center justify-center text-cocoa-deep/20 hover:text-rose-500 transition-all"><X size={16} /></button>
            </div>

            {/* Compact Command Panel */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col md:flex-row divide-x divide-cocoa-deep/5 overflow-hidden">
               {/* Left: Technical Registry (Identity & Specs) */}
               <div className="flex-1 p-8 space-y-6 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-2 gap-5">
                     <div className="col-span-2">
                        <InputField label="Harvest Identity" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} icon={<Tag size={14} />} placeholder="NAME_REQUIRED" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[9px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep/30 ml-2">Estate Sector</label>
                        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-12 bg-ivory-warm border border-cocoa-deep/5 rounded-xl px-4 text-[9px] font-body font-black uppercase tracking-widest focus:border-burnt-caramel focus:outline-none appearance-none cursor-pointer">
                           <option value="">SELECT_SECTOR</option>
                           {categories.map((cat: any) => <option key={cat._id} value={cat.name}>{cat.name.toUpperCase()}</option>)}
                        </select>
                     </div>
                     <InputField label="Valuation" value={formData.price} onChange={(v) => setFormData({...formData, price: v})} icon={<IndianRupee size={14} />} type="number" />
                     <InputField label="Product Mass" value={formData.weight} onChange={(v) => setFormData({...formData, weight: v})} icon={<Package size={14} />} placeholder="e.g. 78G" />
                     <InputField label="Reserve Qty" value={formData.stock} onChange={(v) => setFormData({...formData, stock: v})} icon={<Archive size={14} />} type="number" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep/30 ml-2">Curatorial Narrative</label>
                     <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full h-24 bg-ivory-warm border border-cocoa-deep/5 rounded-xl p-4 text-[10px] font-body text-cocoa-deep focus:outline-none focus:border-burnt-caramel resize-none shadow-inner" placeholder="Enter technical records..." />
                  </div>
               </div>

               {/* Right: Visual Matrix (Media & Gallery) */}
               <div className="w-full md:w-[42%] p-8 space-y-6 flex flex-col overflow-hidden bg-ivory-warm/10 text-center md:text-left">
                  <div className="flex items-center justify-between">
                     <span className="text-[9px] font-body font-black uppercase tracking-[0.4em] text-cocoa-deep/30">Visual Assets</span>
                     <div className="flex bg-white border border-cocoa-deep/5 p-1 rounded-lg gap-1">
                        {[ {id:'url',icon:Globe}, {id:'file',icon:ImageIcon}, {id:'camera',icon:Camera} ].map(m => (
                           <button key={m.id} type="button" onClick={() => { setUploadMode(m.id as any); stopCamera(); }} className={`size-7 rounded-md flex items-center justify-center transition-all ${uploadMode === m.id ? 'bg-botanical-green text-white shadow-md' : 'text-cocoa-deep/20 hover:text-cocoa-deep'}`}><m.icon size={12} /></button>
                        ))}
                     </div>
                  </div>

                  <div className="flex-1 min-h-[120px] bg-white border border-cocoa-deep/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group shadow-sm">
                     {uploadMode === 'url' && (
                        <div className="w-full px-6 space-y-3">
                           <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-ivory-warm p-3 rounded-lg text-[8px] font-body font-black tracking-widest text-center focus:outline-none border border-transparent focus:border-burnt-caramel text-cocoa-deep" placeholder="PASTE_CLOUD_ASSET_URL" />
                           {formData.image && <img src={formData.image} className="h-16 mx-auto rounded-lg shadow-lg object-contain" alt="" />}
                        </div>
                     )}
                     {uploadMode === 'file' && (
                        <div className="flex flex-col items-center gap-3">
                           {previewImage ? <img src={previewImage} className="size-20 object-cover rounded-xl shadow-md" alt="" /> : <ImageIcon size={20} className="text-cocoa-deep/10" />}
                           <label className="text-[7px] font-body font-black uppercase tracking-[0.4em] text-burnt-caramel cursor-pointer py-1.5 px-3 bg-ivory-warm rounded-md hover:bg-burnt-caramel hover:text-white transition-all">Select_File<input type="file" accept="image/*" className="hidden" onChange={handleFileChange} /></label>
                        </div>
                     )}
                     {uploadMode === 'camera' && (
                        <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-3">
                           {!isCameraActive ? <button type="button" onClick={startCamera} className="text-[8px] font-body font-black uppercase tracking-widest text-cocoa-deep/40 px-4 py-2 border border-dashed border-cocoa-deep/10 rounded-lg">Lens_Standby</button> : (
                              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                                 <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                 <button type="button" onClick={takePhoto} className="absolute bottom-2 left-1/2 -translate-x-1/2 size-8 bg-white rounded-full p-1 shadow-lg hover:scale-110 active:scale-95 transition-all"><div className="size-full rounded-full border-2 border-botanical-green flex items-center justify-center"><div className="size-2 bg-burnt-caramel rounded-full" /></div></button>
                              </div>
                           )}
                        </div>
                     )}
                  </div>

                  <div className="space-y-4 shrink-0 pt-4 border-t border-cocoa-deep/5">
                     <p className="text-[10px] font-body font-black uppercase tracking-[0.6em] text-burnt-caramel">Registry Expansion (Gallery)</p>
                     <div className="flex flex-wrap gap-4 justify-center md:justify-start pb-4">
                        {formData.images.map((img: string, i: number) => (
                          <div key={i} className="size-16 rounded-xl bg-white border border-cocoa-deep/5 p-1 relative group shadow-sm">
                             <img src={img} className="size-full object-contain rounded-lg" alt="" />
                             <button type="button" onClick={() => setFormData({...formData, images: formData.images.filter((_:any,idx:number)=>idx!==i)})} className="absolute -top-2 -right-2 size-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:rotate-90"><X size={12}/></button>
                          </div>
                        ))}
                        {galleryFiles.map((f, i) => (
                          <div key={i} className="size-16 rounded-xl bg-botanical-green/5 border border-botanical-green/10 p-1 relative group shadow-sm animate-in fade-in zoom-in">
                             <img src={URL.createObjectURL(f)} className="size-full object-contain rounded-lg grayscale group-hover:grayscale-0 transition-all" alt="" />
                             <button type="button" onClick={() => setGalleryFiles(galleryFiles.filter((_,idx)=>idx!==i))} className="absolute -top-2 -right-2 size-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"><X size={12}/></button>
                          </div>
                        ))}
                        <label className="size-16 rounded-xl border-2 border-dashed border-cocoa-deep/10 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-burnt-caramel hover:bg-white transition-all group">
                           <ImageIcon size={16} className="text-cocoa-deep/20 group-hover:text-burnt-caramel" />
                           <span className="text-[7px] font-body font-black uppercase tracking-tighter text-cocoa-deep/20">ADD_ASSET</span>
                           <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryFileChange} />
                        </label>
                     </div>
                  </div>
               </div>
            </form>

            {/* Commmmit Infrastructure */}
            <div className="px-8 py-5 border-t border-cocoa-deep/5 bg-ivory-warm/30 flex justify-end gap-3 shrink-0">
               <button type="button" onClick={() => { stopCamera(); onClose(); }} className="h-10 px-6 rounded-xl font-body font-black text-[9px] uppercase tracking-[0.4em] text-cocoa-deep/30 hover:text-cocoa-deep transition-all">Abort_Protocol</button>
               <button onClick={handleSubmit} className="h-10 px-8 bg-botanical-green text-white rounded-xl flex items-center gap-2 font-body text-[9px] font-black uppercase tracking-[0.4em] shadow-lg hover:bg-burnt-caramel transition-all">
                 <ShieldCheck size={12} />
                 {editingProduct ? 'Commit_Registry_Push' : 'Initialize_Induction'}
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
