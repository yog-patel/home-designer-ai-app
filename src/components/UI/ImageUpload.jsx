import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageSelect, preview = null }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelect(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full aspect-square rounded-3xl overflow-hidden cursor-pointer group"
        >
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white text-center">
              <Upload size={32} className="mx-auto mb-2" />
              <p className="font-semibold">Change Photo</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-red-50 transition-colors group"
        >
          <div className="p-3 bg-gray-100 group-hover:bg-red-100 rounded-full transition-colors">
            <Upload size={28} className="text-gray-600 group-hover:text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">Upload a Photo</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG • Max 10MB</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
