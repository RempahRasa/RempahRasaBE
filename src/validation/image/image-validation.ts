import { z } from 'zod';

const FILESIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const imageValidation = z
  .any()
  .optional()
  .refine(
    (file) => {
      if (!file) {
        return false;
      }
      if (file.size >= FILESIZE) {
        return false;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
        return false;
      }
      return true;
    },
    {
      message: 'file size over 5mb or only jpeg, jpg, png, allowed'
    }
  );
