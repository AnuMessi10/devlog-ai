'use client';

import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import type { RegisterFormData } from '@/lib/validations/auth';
import { registerUser } from '@/services/auth';

type RegisterResult = {
    success: boolean;
    error?: string;
};

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);

    const register = useCallback(async (values: RegisterFormData): Promise<RegisterResult> => {
        setIsLoading(true);

        try {
            await registerUser({
                email: values.email,
                password: values.password,
                name: values.name,
            });
            toast.success('Account created successfully. Signing you in…');

            const signInResult = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (signInResult?.error) {
                toast.info('Account created. Please sign in manually.');
                return { success: false, error: signInResult.error };
            }

            return { success: true };
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Unable to create your account.';
            toast.error(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { register, isLoading };
}
