import { http } from '@/lib/http/client';
import type { RegisterFormData } from '@/lib/schemas/auth';

type RegisterPayload = Pick<RegisterFormData, 'name' | 'email' | 'password'>;

export async function registerUser(payload: RegisterPayload) {
    const response = await http.post('/auth/register', payload);
    return response.data;
}
