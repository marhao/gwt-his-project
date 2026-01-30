// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { Heart, User, Lock, Eye, EyeOff, Loader2, AlertCircle, Sun, Moon } from 'lucide-react';
// import { useAuth, useTheme } from '@/components/providers';
// import { ToggleSwitch } from '@/components/ui';
import FormLogin from './Form';
import HeaderLogin from './Header';

// const loginSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(1, 'Password is required'),
// });

// type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
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

  // const onSubmit = async (data: LoginForm) => {
  //   setError(null);
  //   try {
  //     await login(data.username, data.password);
  //   } catch (err: unknown) {
  //     const error = err as { message?: string };
  //     setError(error.message || 'Invalid username or password');
  //   }
  // };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
        {/* Background Pattern */}
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

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg" />

        {/* Content */}
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

          {/* Features */}
          <div className="space-y-4">
            {[
              'Real-time Patient Monitoring',
              'Integrated Laboratory System',
              'Electronic Medical Records',
              'Appointment Scheduling',
            ].map((feature, index) => (
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

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col bg-slate-50 dark:bg-slate-950">
        {/* Theme Toggle */}
        <HeaderLogin />

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Korat HIS</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hospital </p>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Please enter your credentials to access your account
              </p>
            </div>

            <FormLogin />

            {/* Form Footer */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Protected by MedCore Security System
            </p>
          </div>
        </div>

        {/* Page Footer */}
        <div className="p-6 text-center text-xs text-slate-400">
          © 2024 MedCore HIS. All rights reserved.
        </div>
      </div>
    </div>
  );
}