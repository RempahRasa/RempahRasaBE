import { ZodSchema } from 'zod';

const validate = <T>(schema: ZodSchema<T>, request: unknown): T => {
  const result = schema.safeParse(request);
  if (result.error) {
    throw new Error(result.error.message);
  } else {
    return result.data;
  }
};

export { validate };
