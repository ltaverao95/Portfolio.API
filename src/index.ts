import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.info(`listening on port ${port} `);
});
