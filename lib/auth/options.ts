import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/lib/db/prisma';

export const authConfig: NextAuthConfig = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (
                    typeof email !== 'string' ||
                    email.length === 0 ||
                    typeof password !== 'string' ||
                    password.length === 0
                ) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    return null;
                }

                const isValidPassword = await compare(password, user.password);

                if (!isValidPassword) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email ?? email,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    ...session.user,
                    id: (token.id as string | undefined) ?? token.sub ?? '',
                } as typeof session.user & { id: string };
            }

            return session;
        },
    },
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
};
