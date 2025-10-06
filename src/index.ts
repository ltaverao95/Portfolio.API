import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import blogRoutes from './blogs/blogs.routes';
import authRoutes from './auth/auth.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(
 express.json({
    limit: '20mb',
 })
);

app.use('/api', blogRoutes);
app.use('/api/auth', authRoutes);

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
