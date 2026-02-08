// src/components/nhso/NhsoLoginModal.tsx
'use client';

import { useState } from 'react';
import { X, Shield, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { nhsoApi } from '@/lib/api/nhso';

interface NhsoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

export function NhsoLoginModal({ isOpen, onClose, onSuccess }: NhsoLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberUsername, setRememberUsername] = useState(true);

  // Load saved username on mount
  useState(() => {
    const savedUsername = nhsoApi.getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('กรุณากรอก Username และ Password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await nhsoApi.login(username, password, rememberUsername);
      
      if (result.success) {
        onSuccess(username);
        onClose();
        // Clear password after successful login
        setPassword('');
      } else {
        setError(result.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          {/* Icon & Title */}
          <div className="flex items-center gap-4">
            <div className="size-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Shield size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">เข้าสู่ระบบ NHSO</h2>
              <p className="text-blue-100 text-sm mt-0.5">สำนักงานหลักประกันสุขภาพแห่งชาติ</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Username */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="กรอก Username"
              disabled={isLoading}
              className="
                w-full px-4 py-3 
                bg-slate-50 dark:bg-slate-800 
                border border-slate-200 dark:border-slate-700 
                rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
              autoFocus
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอก Password"
                disabled={isLoading}
                className="
                  w-full px-4 py-3 pr-12
                  bg-slate-50 dark:bg-slate-800 
                  border border-slate-200 dark:border-slate-700 
                  rounded-xl text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Username */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberUsername}
              onChange={(e) => setRememberUsername(e.target.checked)}
              className="size-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500/20"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              จดจำ Username
            </span>
          </label>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="
                flex-1 px-4 py-3 
                bg-slate-100 dark:bg-slate-800 
                text-slate-600 dark:text-slate-400 
                rounded-xl font-medium
                hover:bg-slate-200 dark:hover:bg-slate-700
                disabled:opacity-50
                transition-colors
              "
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !username.trim() || !password.trim()}
              className="
                flex-1 px-4 py-3 
                bg-blue-500 text-white 
                rounded-xl font-medium
                hover:bg-blue-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center pt-2">
            Token จะหมดอายุใน 24 ชั่วโมง หลังจากนั้นต้องเข้าสู่ระบบใหม่
          </p>
        </form>
      </div>
    </div>
  );
}

export default NhsoLoginModal;