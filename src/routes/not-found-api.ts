import express from 'express';

export const notFoundRouter = express.Router();

notFoundRouter.get('*', (req, res) => {
  res.status(404).send('Not Found');
});
