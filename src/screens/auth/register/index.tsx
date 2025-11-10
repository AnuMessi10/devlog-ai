'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import { Input } from '@/components/input';
import { useRegister } from '@/hooks/useRegister';
import type { RegisterFormData } from '@/lib/validations/auth';
import { registerSchema } from '@/lib/validations/auth';

import styles from './index.module.scss';

export default function RegisterScreen() {
    const { register, isLoading } = useRegister();

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
        await register(values);
    });

    const isSubmitting = form.formState.isSubmitting || isLoading;

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
