"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { safeZodResolver } from '@/lib/zod';
import { z } from 'zod';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/components/providers';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const FormLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: safeZodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchemaType) => {
        setError(null);
        try {
            await login(data.username, data.password);
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || 'Invalid username or password');
        }
    };

    return (
        <div>
            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-critical-50 dark:bg-critical-500/10 border border-critical-200 dark:border-critical-500/20 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-critical-500 shrink-0" />
                    <p className="text-sm text-critical-600 dark:text-critical-400">{error}</p>
                </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Username Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Username
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            {...register('username')}
                            className={`
                                w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 
                                border rounded-xl text-slate-900 dark:text-white
                                placeholder-slate-400 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                                ${errors.username 
                                    ? 'border-critical-500' 
                                    : 'border-slate-200 dark:border-slate-700'
                                }
                            `}
                            placeholder="Enter your username"
                        />
                    </div>
                    {errors.username && (
                        <p className="mt-2 text-sm text-critical-500">{errors.username.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className={`
                                w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-800 
                                border rounded-xl text-slate-900 dark:text-white
                                placeholder-slate-400 transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                                ${errors.password 
                                    ? 'border-critical-500' 
                                    : 'border-slate-200 dark:border-slate-700'
                                }
                            `}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-2 text-sm text-critical-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                        Forgot password?
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                        w-full py-3.5 px-4 rounded-xl font-semibold text-white
                        gradient-primary shadow-lg shadow-primary-500/25
                        hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02]
                        active:scale-[0.98] transition-all duration-200
                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                        flex items-center justify-center gap-2
                `}
                >
                    {isLoading ? (
                        <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormLogin