import { ZodSchema } from 'zod';
import { ResponseError } from '../error/response-error';

const validate = <T>(schema: ZodSchema<T>, request: unknown): T => {
  const result = schema.safeParse(request);
  if (result.error) {
    const message = result.error.errors.map((error) => {
      return error.message;
    });
    throw new ResponseError(400, message.join(', '));
  } else {
    return result.data;
  }
};

export { validate };
