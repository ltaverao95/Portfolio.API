import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { inject } from "@vercel/analytics"

import blogRoutes from './blogs/blogs.routes';
import authRoutes from './auth/auth.routes';

dotenv.config();
inject();

const app = express();

const corsOptions = {
  origin: ['http://localhost:9002', 'https://taveralabs.com', 'https://portfolio-ui-six-fawn.vercel.app'],
  
}

app.use(cors(corsOptions));
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
