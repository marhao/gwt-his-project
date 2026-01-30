// =============================================================================
// File: src/components/ui/patient-image/PatientImageUpload.tsx
// Description: Patient Image Upload Component with Camera & File Browse
// =============================================================================

'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Camera,
  Upload,
  X,
  RefreshCw,
  Trash2,
  User,
  Check,
  SwitchCamera,
  Image as ImageIcon,
  ZoomIn,
} from 'lucide-react';

interface PatientImageUploadProps {
  hn?: string;
  currentImage?: string | null;
  onImageChange?: (imageData: string | null, width?: number, height?: number) => void;
  onUpload?: (imageData: string, width: number, height: number) => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  className?: string;
}

export default function PatientImageUpload({
  hn,
  currentImage,
  onImageChange,
  onUpload,
  size = 'md',
  editable = true,
  className = '',
}: PatientImageUploadProps) {
  const [image, setImage] = useState<string | null>(currentImage || null);
  const [showCamera, setShowCamera] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'size-16',
    md: 'size-24',
    lg: 'size-32',
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 40,
  };

  // Update image when currentImage prop changes
  useEffect(() => {
    if (currentImage !== undefined) {
      setImage(currentImage);
    }
  }, [currentImage]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      // Stop existing stream
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setShowCamera(true);
      setShowOptions(false);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้งานกล้อง');
    }
  }, [facingMode, cameraStream]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  }, [cameraStream]);

  // Switch camera (front/back)
  const switchCamera = useCallback(async () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    if (showCamera) {
      // Restart camera with new facing mode
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacingMode, width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        setCameraStream(stream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error switching camera:', err);
      }
    }
  }, [facingMode, showCamera, cameraStream]);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0);

    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    setImage(imageData);
    onImageChange?.(imageData, canvas.width, canvas.height);
    
    stopCamera();
  }, [onImageChange, stopCamera]);

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกไฟล์รูปภาพ');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('ขนาดไฟล์ต้องไม่เกิน 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      
      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setImage(imageData);
        onImageChange?.(imageData, img.width, img.height);
        setShowOptions(false);
        setError(null);
      };
      img.src = imageData;
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  }, [onImageChange]);

  // Handle upload
  const handleUpload = useCallback(async () => {
    if (!image || !onUpload) return;

    setUploading(true);
    setError(null);

    try {
      // Get image dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image;
      });

      await onUpload(image, img.width, img.height);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('ไม่สามารถอัปโหลดรูปได้');
    } finally {
      setUploading(false);
    }
  }, [image, onUpload]);

  // Handle delete
  const handleDelete = useCallback(() => {
    setImage(null);
    onImageChange?.(null);
    setShowOptions(false);
  }, [onImageChange]);

  // Camera view
  if (showCamera) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Camera Preview */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Guide circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-64 border-4 border-white/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-black/80 p-6 flex items-center justify-center gap-8">
          {/* Cancel */}
          <button
            onClick={stopCamera}
            className="size-14 bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <X size={24} />
          </button>

          {/* Capture */}
          <button
            onClick={capturePhoto}
            className="size-20 bg-white rounded-full flex items-center justify-center border-4 border-white/50"
          >
            <div className="size-16 bg-white rounded-full" />
          </button>

          {/* Switch Camera */}
          <button
            onClick={switchCamera}
            className="size-14 bg-white/20 rounded-full flex items-center justify-center text-white"
          >
            <SwitchCamera size={24} />
          </button>
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  // Preview modal
  if (showPreview && image) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <button
          onClick={() => setShowPreview(false)}
          className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white"
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt="Preview"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Display */}
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer group relative`}
        onClick={() => editable && setShowOptions(!showOptions)}
      >
        {image ? (
          <>
            <img
              src={image}
              alt="Patient"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {editable ? (
                <Camera size={iconSizes[size] * 0.6} className="text-white" />
              ) : (
                <ZoomIn size={iconSizes[size] * 0.6} className="text-white" />
              )}
            </div>
          </>
        ) : (
          <User size={iconSizes[size]} className="text-slate-400" />
        )}
      </div>

      {/* Options Menu */}
      {showOptions && editable && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowOptions(false)} 
          />
          <div className="absolute left-full top-0 ml-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 min-w-[180px]">
            <button
              onClick={startCamera}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Camera size={18} className="text-blue-500" />
              ถ่ายรูป
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ImageIcon size={18} className="text-emerald-500" />
              เลือกรูปภาพ
            </button>
            {image && (
              <>
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => { setShowPreview(true); setShowOptions(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <ZoomIn size={18} className="text-purple-500" />
                  ดูรูปขนาดเต็ม
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={18} />
                  ลบรูป
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute left-0 right-0 -bottom-8 text-xs text-red-500 text-center">
          {error}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
