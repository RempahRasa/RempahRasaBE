import z from 'zod';

const favoriteValidation = z.string().min(1).max(100);

export { favoriteValidation };