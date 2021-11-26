import express from 'express';
import cors from 'cors';
import auth from './middlewares/auth.js';
import * as userController from './controllers/userController.js';
import * as financialEventsController from './controllers/financialEventsController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-in', userController.signIn);
app.post('/sign-up', userController.signUp);

// authenticated routes
app.get('/financial-events-history', auth, financialEventsController.getFinancialHistory);

app.post('/financial-events', auth, financialEventsController.postFinancialEvent);

export default app;
