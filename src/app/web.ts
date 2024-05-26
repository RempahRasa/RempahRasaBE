import express from 'express';

export const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
