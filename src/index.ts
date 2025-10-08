import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import blogRoutes from './blogs/blogs.routes';
import authRoutes from './auth/auth.routes';

dotenv.config();

const app = express();
app.disable('x-powered-by');

const helmet = require('helmet')
app.use(helmet());

const corsOptions = {
  origin: ['http://localhost:9002', 'https://taveralabs.com', 'https://portfolio-ui-six-fawn.vercel.app'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(
 express.json({
    limit: '20mb',
 })
);

app.use('/api', blogRoutes);
app.use('/api/auth', authRoutes);

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

if(process.env.NODE_ENV === 'production') {
  console.log('in production');

}

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
