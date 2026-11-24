import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/login.routes';
import materiasRoutes from './routes/materias.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/materias', materiasRoutes);

export default app;