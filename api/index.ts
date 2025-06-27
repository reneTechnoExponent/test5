import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import newsletterRouter from './routes/newsletter';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    
    next();
});

app.use('/api/newsletter', newsletterRouter);
app.get('/api', (req: Request, res: Response) => res.json({ message: 'API Server is up and running!' }));

export default app;