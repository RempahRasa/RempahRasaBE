import z from 'zod';

const emailValidation = z.string().email({ message: 'Invalid email address' }).max(100);

export { emailValidation };
