import { z } from 'zod';

const registerUserValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((value) => {
      return /[a-zA-Z]/.test(value) && /\d/.test(value) && /\W/.test(value);
    }, 'Password must contain at least one letter, one number, and one symbol')
});

export { registerUserValidation };
