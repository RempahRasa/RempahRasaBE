// import * as gdebugger from '@google-cloud/debug-agent';
// gdebugger.start();
import { web } from './app/web';
import * as dotenv from 'dotenv';
dotenv.config();

web.listen(3000, () => {
  console.log('Server is running on port 3000');
});
