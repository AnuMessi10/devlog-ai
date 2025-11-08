'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import type { LoginFormData } from '@/lib/validations/auth';

export function useLogin() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(
        async (data: LoginFormData) => {
            try {
                setIsLoading(true);
                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error(result.error);
                    return;
                }

                toast.success('Welcome back! Redirecting to your dashboard.');
                router.push('/dashboard');
                router.refresh();
            } catch (error) {
                console.error(error);
                toast.error('We encountered an issue while signing you in. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    return {
        login,
        isLoading,
    };
}
