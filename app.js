import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

export default app;


