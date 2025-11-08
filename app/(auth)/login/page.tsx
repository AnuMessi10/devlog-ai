import type { Metadata } from 'next';

import { LoginView } from '@/components/features/auth/login';

export const metadata: Metadata = {
    title: 'Sign in | Devlog AI',
    description: 'Access your developer journal and continue logging your progress.',
};

export default function LoginPage() {
    return <LoginView />;
}
