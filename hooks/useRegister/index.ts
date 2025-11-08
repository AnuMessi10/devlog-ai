'use client';

import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { registerUser } from '@/lib/services/auth';
import type { RegisterFormData } from '@/lib/validations/auth';

export function useRegister() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const register = useCallback(
        async (data: RegisterFormData) => {
            try {
                setIsLoading(true);
                const payload = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                };

                await registerUser(payload);
                toast.success('Account created! You can now sign in.');
                router.push('/login');
            } catch (error) {
                if (isAxiosError(error)) {
                    const message =
                        error.response?.data?.message ??
                        'Unable to create your account. Please try again.';
                    toast.error(message);
                } else {
                    console.error(error);
                    toast.error('We encountered an issue while creating your account.');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    return {
        register,
        isLoading,
    };
}
