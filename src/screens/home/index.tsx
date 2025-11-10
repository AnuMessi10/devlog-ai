import Link from 'next/link';

import styles from './index.module.scss';

export default function HomeScreen() {
    return (
        <div className={styles.root}>
            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.pill}>Developer journaling made intelligent</span>
                        <h1 className={styles.title}>
                            Capture your daily wins, reflect on progress, and unlock AI-powered
                            insights.
                        </h1>
                        <p className={styles.subtitle}>
                            Devlog AI keeps your project updates, blockers, and highlights in one
                            place while surfacing trends you can act on. Stay accountable, ship
                            faster, and build better habits.
                        </p>
                        <div className={styles.actions}>
                            <Link href="/register" className={styles.primaryCta}>
                                Get Started
                            </Link>
                            <Link href="/login" className={styles.secondaryCta}>
                                Sign In
                            </Link>
                        </div>
                        <dl className={styles.metrics}>
                            <div>
                                <dt>Daily prompts</dt>
                                <dd>Keep momentum with structured reflections.</dd>
                            </div>
                            <div>
                                <dt>AI summaries</dt>
                                <dd>Spot recurring blockers before they slow you down.</dd>
                            </div>
                            <div>
                                <dt>Team ready</dt>
                                <dd>Share sprint-ready updates with a single click.</dd>
                            </div>
                        </dl>
                    </div>
                    <div className={styles.heroAside}>
                        <div className={styles.card}>
                            <h2>Today&apos;s wins</h2>
                            <ul>
                                <li>
                                    <span>✅</span>
                                    <div>
                                        <p>Implemented protected dashboard shell</p>
                                        <small>Ready for auth-enabled navigation</small>
                                    </div>
                                </li>
                                <li>
                                    <span>⚡️</span>
                                    <div>
                                        <p>Hook-driven logging workflow</p>
                                        <small>Clean MVW separation across features</small>
                                    </div>
                                </li>
                                <li>
                                    <span>🧠</span>
                                    <div>
                                        <p>AI insights queued</p>
                                        <small>Prepare training data with structured logs</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <header className={styles.sectionHeader}>
                        <h2>Why teams adopt Devlog AI</h2>
                        <p>
                            Lightweight daily logging meets powerful insights so you can focus on
                            what matters most: building.
                        </p>
                    </header>
                    <div className={styles.features}>
                        <article>
                            <h3>Human-friendly logging</h3>
                            <p>
                                Structured prompts help you capture context quickly without breaking
                                flow.
                            </p>
                        </article>
                        <article>
                            <h3>Always-on insights</h3>
                            <p>
                                Automatic summaries highlight blockers, velocity trends, and morale
                                shifts.
                            </p>
                        </article>
                        <article>
                            <h3>Secure by design</h3>
                            <p>
                                Fine-grained access controls and audit trails keep your updates safe
                                and review-ready.
                            </p>
                        </article>
                    </div>
                </section>

                <section className={styles.cta}>
                    <div>
                        <h2>Ready to log smarter?</h2>
                        <p>
                            Spin up your account in minutes and start building a narrative your team
                            can rally around.
                        </p>
                    </div>
                    <div className={styles.ctaActions}>
                        <Link href="/register" className={styles.primaryCta}>
                            Create Account
                        </Link>
                        <Link href="/login" className={styles.secondaryCta}>
                            I already have access
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
