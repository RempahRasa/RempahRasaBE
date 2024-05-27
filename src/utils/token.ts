import * as cr from 'crypto';
const generateToken = () => {
  return cr.randomBytes(32).toString('hex');
};

export { generateToken };
