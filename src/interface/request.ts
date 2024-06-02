import { Request } from 'express';

export interface RequestSignupInterface {
  firstName: string;
  image?: File;
  password: string;
  email: string;
  lastName: string;
}

export interface RequestLoginInterface {
  email: string;
  password: string;
}

export interface MulterRequest extends Request {
  image: File;
}
