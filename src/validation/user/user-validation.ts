import z from 'zod';

const loginUserValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }).max(100),
  password: z.string().max(100)
});

export { loginUserValidation };
