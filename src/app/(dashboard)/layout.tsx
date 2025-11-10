import type { ReactNode } from 'react';

import DashboardLayout from '@/layouts/dashboard';

export default function Layout({ children }: { children: ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}
