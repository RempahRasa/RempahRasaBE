import { Request } from "express";

export interface requestSignupInterface {
  firstName: string;
  image?: File;
  password: string;
  email: string;
  lastName: string;
}

export interface requestLoginInterface {
  email: string;
  password: string;
}

export interface MulterRequest extends Request {
  file: any;
}
