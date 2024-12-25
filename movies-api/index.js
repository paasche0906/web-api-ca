import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';
import authenticate from './authenticate';
import reviewRoutes from './api/reviews/reviewRoutes';
import favoriteRoutes from './api/favorites/favoriteRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use(defaultErrHandler);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});