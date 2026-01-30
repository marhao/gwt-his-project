// =============================================================================
// File: src/hooks/usePatientImages.ts
// Description: React hooks for patient images management
// =============================================================================

import { useState, useEffect, useCallback } from 'react';
import { patientImageApi } from '@/lib/api';

// ============================================
// Types
// ============================================
export interface PatientImage {
  hn: string;
  imageName: string;
  width: number | null;
  height: number | null;
  captureDate: string | null;
}

export interface PatientImageWithData extends PatientImage {
  image: string; // Base64 encoded
}

// ============================================
// usePatientImages - Get all images for a patient
// ============================================
export function usePatientImages(hn: string | null | undefined) {
  const [images, setImages] = useState<PatientImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    if (!hn) {
      setImages([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await patientImageApi.getByHn(hn);
      setImages(data);
    } catch (err) {
      console.error('Error fetching patient images:', err);
      setError('ไม่สามารถโหลดรูปภาพได้');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, [hn]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
  };
}

// ============================================
// usePatientProfileImage - Get profile image for a patient
// ============================================
export function usePatientProfileImage(hn: string | null | undefined) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = useCallback(async () => {
    if (!hn) {
      setImageData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await patientImageApi.getProfileImage(hn);
      setImageData(data?.image || null);
    } catch (err) {
      console.error('Error fetching patient image:', err);
      setError('ไม่สามารถโหลดรูปภาพได้');
      setImageData(null);
    } finally {
      setLoading(false);
    }
  }, [hn]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return {
    imageData,
    loading,
    error,
    refetch: fetchImage,
  };
}

// ============================================
// usePatientImageUpload - Upload image for a patient
// ============================================
export function usePatientImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (
    hn: string,
    imageData: string,
    width?: number,
    height?: number
  ): Promise<boolean> => {
    setUploading(true);
    setError(null);

    try {
      await patientImageApi.upload(hn, imageData, width, height);
      return true;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('ไม่สามารถอัปโหลดรูปภาพได้');
      return false;
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    upload,
    uploading,
    error,
  };
}

// ============================================
// usePatientImageDelete - Delete image for a patient
// ============================================
export function usePatientImageDelete() {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteImage = useCallback(async (hn: string): Promise<boolean> => {
    setDeleting(true);
    setError(null);

    try {
      await patientImageApi.delete(hn);
      return true;
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('ไม่สามารถลบรูปภาพได้');
      return false;
    } finally {
      setDeleting(false);
    }
  }, []);

  return {
    deleteImage,
    deleting,
    error,
  };
}

// ============================================
// usePatientImageManager - Full image management
// ============================================
export function usePatientImageManager(hn: string | null | undefined) {
  const { images, loading: loadingList, error: listError, refetch } = usePatientImages(hn);
  const { imageData: primaryImage, loading: loadingPrimary, refetch: refetchImage } = usePatientProfileImage(hn);
  const { upload, uploading, error: uploadError } = usePatientImageUpload();
  const { deleteImage, deleting, error: deleteError } = usePatientImageDelete();

  const handleUpload = useCallback(async (
    imageData: string,
    width?: number,
    height?: number
  ): Promise<boolean> => {
    if (!hn) return false;

    const success = await upload(hn, imageData, width, height);
    if (success) {
      await refetchImage();
      await refetch();
    }
    return success;
  }, [hn, upload, refetch, refetchImage]);

  const handleDelete = useCallback(async (): Promise<boolean> => {
    if (!hn) return false;

    const success = await deleteImage(hn);
    if (success) {
      await refetchImage();
      await refetch();
    }
    return success;
  }, [hn, deleteImage, refetch, refetchImage]);

  return {
    images,
    primaryImage,
    loading: loadingList || loadingPrimary,
    uploading,
    deleting,
    error: listError || uploadError || deleteError,
    upload: handleUpload,
    delete: handleDelete,
    refetch,
  };
}
