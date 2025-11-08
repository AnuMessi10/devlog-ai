import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { prisma } from '@/lib/db/prisma';
import { registerSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
    try {
        const rawBody = await request.json();
        const parsedBody = registerSchema.parse(rawBody);
        const payload = {
            name: parsedBody.name,
            email: parsedBody.email,
            password: parsedBody.password,
        };

        const existingUser = await prisma.user.findUnique({
            where: { email: payload.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'An account with that email already exists.' },
                { status: 409 }
            );
        }

        const hashedPassword = await hash(payload.password, 12);

        await prisma.user.create({
            data: {
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: 'Account created successfully.' }, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: 'Invalid form submission.', issues: error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Something went wrong while creating the account.' },
            { status: 500 }
        );
    }
}
