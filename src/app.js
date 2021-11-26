import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-in', userController.signIn);
app.post('/sign-up', userController.signUp);

export default app;
