import * as gdebugger from '@google-cloud/debug-agent';
gdebugger.start();
import * as dotenv from 'dotenv';
import { initializeWeb } from './app/web';
dotenv.config();

const init = async () => {
  try {
    const web = await initializeWeb();
    web.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Failed to initialize web server:', error);
  }
};

init();
