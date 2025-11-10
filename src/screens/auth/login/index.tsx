'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import { Input } from '@/components/input';
import { useLogin } from '@/hooks/useLogin';
import type { LoginFormData } from '@/lib/validations/auth';
import { loginSchema } from '@/lib/validations/auth';

import styles from './index.module.scss';

export default function LoginScreen() {
    const { login, isLoading } = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = form.handleSubmit(async values => {
        await login(values);
    });

    const isSubmitting = form.formState.isSubmitting || isLoading;

    return (
        <div className={styles.root}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Log in to Devlog AI</h1>
                    <p className={styles.subtitle}>
                        Track your work, reflect on progress, and uncover insights.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={styles.actions}>
                            <Link href="/register" className={styles.link}>
                                Need an account?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing in…' : 'Sign in'}
                        </Button>
                    </form>
                </Form>

                <p className={styles.footer}>
                    By continuing you agree to our{' '}
                    <Link href="#" className={styles.link}>
                        terms of service
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
