import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { ThemeToggle } from '@/components/themeToggle';
import { auth } from '@/lib/auth';
import styles from './index.module.scss';

type DashboardLayoutProps = {
    children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.userInfo}>
                        <span className={styles.userLabel}>Signed in as</span>
                        <span className={styles.userName}>
                            {session.user.name ?? session.user.email}
                        </span>
                    </div>
                    <ThemeToggle />
                </div>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
