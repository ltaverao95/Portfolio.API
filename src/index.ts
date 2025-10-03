import express from 'express';
import * as dotenv from 'dotenv';
import blogRoutes from './blogs/blogs.routes';

dotenv.config();

const app = express();

app.use(
 express.json({
    limit: '20mb',
 }),
);

app.use('/api', blogRoutes);

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
