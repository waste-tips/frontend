import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const { t } = useLanguage();
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300 ease-in-out
            ${isDragActive
              ? 'border-green-400 bg-green-50 scale-[1.02]'
              : 'border-green-300 bg-green-25 hover:border-green-400 hover:bg-green-50 hover:scale-[1.01]'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`
              p-6 rounded-full transition-all duration-300
              ${isDragActive
                ? 'bg-green-100 text-green-600 scale-110'
                : 'bg-green-100 text-green-500 hover:bg-green-200'
              }
            `}>
              <Camera className="w-12 h-12" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-800">
                {t('uploadPhoto')}
              </h3>
              <p className="text-green-600 max-w-md mx-auto">
                {t('uploadPhotoDescription')}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-500">
              <Upload className="w-4 h-4" />
              <span>JPG, PNG, WEBP</span>
            </div>
          </div>

          {isDragActive && (
            <div className="absolute inset-0 bg-green-100/50 rounded-2xl flex items-center justify-center">
              <div className="text-green-700 font-medium">
                Drop your photo here
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative bg-white border-2 border-green-200 rounded-2xl p-6">
          <button
            onClick={clearSelection}
            className="absolute top-4 right-4 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="space-y-4">
            {previewUrl && (
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Uploaded waste"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="text-center">
              <p className="text-green-800 font-medium">
                {selectedFile.name}
              </p>
              <p className="text-green-600 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;