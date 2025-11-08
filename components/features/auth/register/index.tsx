'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/lib/services/auth';
import type { RegisterFormData } from '@/lib/validations/auth';
import { registerSchema } from '@/lib/validations/auth';

import styles from './index.module.scss';

export function RegisterView() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleSubmit = form.handleSubmit(async values => {
        try {
            setIsSubmitting(true);
            const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
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
            setIsSubmitting(false);
        }
    });

    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create your Devlog AI account</h1>
                    <p className={styles.subtitle}>
                        Start logging sessions, tracking progress, and unlocking insights.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Ada Lovelace"
                                            autoComplete="name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="you@example.com"
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Create a strong password"
                                            autoComplete="new-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Repeat your password"
                                            autoComplete="new-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={styles.actions}>
                            <Link href="/login" className={styles.link}>
                                Already have an account?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating account…' : 'Create account'}
                        </Button>
                    </form>
                </Form>

                <p className={styles.footer}>
                    By creating an account you agree to our{' '}
                    <Link href="#" className={styles.link}>
                        terms
                    </Link>{' '}
                    and{' '}
                    <Link href="#" className={styles.link}>
                        privacy policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

export default RegisterView;
