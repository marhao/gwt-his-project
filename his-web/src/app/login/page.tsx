"use client"

import { useEffect, useCallback, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldCheck } from 'lucide-react'
import { Heart, User, Lock, Eye, EyeOff, Loader2, AlertCircle, Sun, Moon } from 'lucide-react';
import { useAuth, useTheme } from '@/components/providers';
import { ToggleSwitch } from '@/components/ui';
import { useSearchParams, useRouter } from 'next/navigation';
import FormLogin from './Form';
import HeaderLogin from './Header';
import { authApi } from '../../lib/api/auth';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

// ============================================
// Config
// ============================================
const PROVIDER_ID_CONFIG = {
  authUrl: 'https://moph.id.th/oauth/redirect',
  clientId: '9a818731-c67a-45a8-bd4e-f72979dc1b70',  // Health ID PRD
  redirectUri: 'http://localhost:3000',
  scope: 'ProviderID',
};

// ============================================
// Helper: สร้าง random state ป้องกัน CSRF
// ============================================
function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// ============================================
// Redirect ไป moph.id.th เพื่อ login
// ============================================
function redirectToProviderId() {
  const state = generateState();
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: PROVIDER_ID_CONFIG.clientId,
    redirect_uri: PROVIDER_ID_CONFIG.redirectUri,
    scope: PROVIDER_ID_CONFIG.scope,
    state,
  });

  window.location.href = `${PROVIDER_ID_CONFIG.authUrl}?${params.toString()}`;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providerLoading, setProviderLoading] = useState(false);
  const { login, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const providerCallbackCalled = useRef(false);  // ← ป้องกัน React Strict Mode เรียกซ้ำ

  // ============================================
  // จับ code จาก URL หลัง Health ID redirect กลับมา
  //
  // Flow:
  //   moph.id.th → redirect http://localhost:3000?code=xxx&state=xxx
  //   → middleware.ts ดัก → redirect /login?code=xxx&state=xxx
  //   → useEffect จับ code → เรียก backend
  // ============================================
  const handleProviderCallback = useCallback(async (code: string, state: string | null) => {
    setProviderLoading(true);
    setError(null);

    try {
      // ตรวจสอบ state
      const savedState = sessionStorage.getItem('oauth_state');
      if (savedState && state !== savedState) {
        throw new Error('Invalid state — กรุณาลองใหม่อีกครั้ง');
      }
      sessionStorage.removeItem('oauth_state');

      // ============================================
      // เรียก backend ผ่าน authApi (ไม่ต้องระบุ full URL)
      // api.post จะเติม /api/v1 prefix ให้อัตโนมัติ
      // → POST /api/v1/auth/login-provider { code }
      // ============================================
      const data = await authApi.loginWithProvider(code);

      // ============================================
      // ได้ JWT token กลับมา format เดียวกับ login ปกติ
      // → เก็บ token + เข้าระบบ
      // ============================================
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      window.location.href = '/';

    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'เข้าสู่ระบบด้วย Provider ID ไม่สำเร็จ');
      router.replace('/login');
    } finally {
      setProviderLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (code && !providerCallbackCalled.current) {
      providerCallbackCalled.current = true;  // ← ป้องกันเรียกซ้ำ
      handleProviderCallback(code, state);
    }
  }, [searchParams, handleProviderCallback]);

  // ============================================
  // Login ปกติ (username + password)
  // ============================================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const { login, isLoading } = useAuth();
  // const { theme, toggleTheme } = useTheme();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginForm>({
  //   resolver: zodResolver(loginSchema),
  // });
  // console.log('Form errors', errors);

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      await login(data.username, data.password);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg" />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">KORAT HIS</h1>
              <p className="text-primary-100">HOSPITAL INFORMATION SYSTEM</p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
            Advanced Healthcare<br />Management Platform
          </h2>

          <p className="text-lg text-primary-100 mb-8 max-w-md">
            Streamline patient care, manage appointments, and access medical records 
            with our comprehensive hospital information system.
          </p>

          <div className="space-y-4">
            {['Real-time Patient Monitoring', 'Integrated Laboratory System', 'Electronic Medical Records', 'Appointment Scheduling'].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-slate-50 dark:bg-slate-950">
        {/* Theme Toggle */}
        <HeaderLogin />

        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Korat HIS</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hospital</p>
              </div>
            </div>

            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
              <p className="text-slate-500 dark:text-slate-400">Please enter your credentials to access your account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-critical-50 dark:bg-critical-500/10 border border-critical-200 dark:border-critical-500/20 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-critical-500 shrink-0" />
                <p className="text-sm text-critical-600 dark:text-critical-400">{error}</p>
              </div>
            )}

            {/* Provider ID Loading */}
            {providerLoading && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-spin shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">กำลังเข้าสู่ระบบด้วย Provider ID...</p>
                  <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60 mt-0.5">กรุณารอสักครู่ ระบบกำลังตรวจสอบข้อมูล</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="w-5 h-5 text-slate-400" /></div>
                  <input type="text" {...register('username')} className={`w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${errors.username ? 'border-critical-500' : 'border-slate-200 dark:border-slate-700'}`} placeholder="Enter your username" />
                </div>
                {errors.username && <p className="mt-2 text-sm text-critical-500">{errors.username.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="w-5 h-5 text-slate-400" /></div>
                  <input type={showPassword ? 'text' : 'password'} {...register('password')} className={`w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${errors.password ? 'border-critical-500' : 'border-slate-200 dark:border-slate-700'}`} placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-critical-500">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</a>
              </div>

              <button type="submit" disabled={isLoading || providerLoading} className="w-full py-3.5 px-4 rounded-xl font-semibold text-white gradient-primary shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                {isLoading ? (<><Loader2 className="w-5 h-5 animate-spin" />Signing in...</>) : ('Sign In')}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-3 bg-slate-50 dark:bg-slate-950 text-slate-400">or continue with</span></div>
            </div>

            {/* Provider ID Button */}
            <button type="button" onClick={redirectToProviderId} disabled={isLoading || providerLoading} className="w-full py-3.5 px-4 rounded-xl font-semibold bg-white dark:bg-slate-800 border-2 border-emerald-500/30 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-colors">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>Sign in with Provider ID</span>
            </button>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">Protected by MedCore Security System</p>
          </div>
        </div>

        {/* <div className="p-6 text-center text-xs text-slate-400">© 2024 MedCore HIS. All rights reserved.</div> */}
            {/* <FormLogin /> */}

            {/* Form Footer */}
            {/* <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Protected by MedCore Security System
            </p> */}
          {/* </div> */}
        {/* </div> */}

        {/* Page Footer */}
        <div className="p-6 text-center text-xs text-slate-400">
          © 2024 MedCore HIS. All rights reserved.
        </div>
      </div>
    </div>
  );
}