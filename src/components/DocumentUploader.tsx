import React, { useState, useRef } from 'react';
import { UploadCloud, File, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentUploaderProps {
  onFileSelected: (file: { name: string; size: string; type: string; rawFile: File }) => void;
  onFileCleared?: () => void;
  acceptedTypes?: string;
  maxSizeMB?: number;
  label?: string;
}

export default function DocumentUploader({
  onFileSelected,
  onFileCleared,
  acceptedTypes = '.pdf,.docx,.doc,.xlsx,.xls,.png,.jpg,.jpeg',
  maxSizeMB = 10,
  label = 'Drag and drop your document here, or click to browse files'
}: DocumentUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processFile = (file: File) => {
    setError(null);

    // Validate size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    // Extract type (extension)
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const acceptedList = acceptedTypes.split(',').map(t => t.trim().toLowerCase());
    
    // Simple extension check
    if (acceptedTypes !== '*' && !acceptedList.includes(extension)) {
      setError(`Unsupported file type. Accepted types: ${acceptedTypes}`);
      return;
    }

    const fileMeta = {
      name: file.name,
      size: formatFileSize(file.size),
      type: extension.substring(1).toUpperCase() || 'FILE'
    };

    setSelectedFile(fileMeta);
    onFileSelected({
      name: file.name,
      size: fileMeta.size,
      type: fileMeta.type,
      rawFile: file
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileCleared) {
      onFileCleared();
    }
  };

  return (
    <div className="w-full space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedTypes}
        onChange={handleChange}
      />

      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={triggerFileInput}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 select-none ${
              isDragActive
                ? 'border-blue-500 bg-blue-50/40 scale-[1.01] ring-4 ring-blue-500/10'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-full border transition-transform ${
              isDragActive ? 'bg-blue-100 text-blue-600 border-blue-200 scale-110' : 'bg-white text-slate-400 border-slate-200'
            }`}>
              <UploadCloud className="h-6 w-6 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-800">
                {isDragActive ? 'Drop your file here' : label}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                Supports {acceptedTypes.replace(/\./g, '').toUpperCase()} up to {maxSizeMB}MB
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="filecard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl border border-blue-200 bg-blue-50/20 p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-blue-100 border border-blue-200 text-blue-900 shrink-0">
                <File className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-800 rounded px-1 uppercase">
                    {selectedFile.type}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 font-mono">
                    {selectedFile.size}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5 ml-1">
                    <CheckCircle2 className="h-3 w-3" /> Ready
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={clearFile}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-250 hover:text-rose-650 text-slate-400 transition-all cursor-pointer shadow-sm"
              title="Remove uploaded file"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
