import type { Metadata } from 'next';

import { RegisterView } from '@/components/features/auth/register';

export const metadata: Metadata = {
    title: 'Create account | Devlog AI',
    description: 'Set up your Devlog AI workspace and start capturing progress.',
};

export default function RegisterPage() {
    return <RegisterView />;
}
