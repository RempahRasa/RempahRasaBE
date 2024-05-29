import { web } from './app/web';
import * as dotenv from 'dotenv';
dotenv.config();

web.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
