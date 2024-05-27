import { z } from 'zod';

const FILESIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const registerUserValidation = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  image: z
    .any()
    .optional()
    .refine((file) => {
      return file.size < FILESIZE, 'file size too large';
    })
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.mimetype), 'only jpeg, jpg, png, webp allowed';
    })
});

export { registerUserValidation };
