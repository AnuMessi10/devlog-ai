import { http } from '@/lib/http';
import type { RegisterFormData } from '@/lib/validations/auth';

type RegisterPayload = Pick<RegisterFormData, 'name' | 'email' | 'password'>;

export async function registerUser(payload: RegisterPayload) {
    const response = await http.post('/auth/register', payload);
    return response.data;
}
