import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

import movies from './routes/movies.js';

import cookieParser from 'cookie-parser';
import Movie from './models/Movie.js';
import Data from './data.js';

import errorHandlerMiddleware from './middleware/error-handler.js';
import { authenticateUser } from './middleware/authMiddleware.js';


import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';

// public: for porduction
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

//for parsing http cookies so that JWT can be used
app.use(cookieParser());
app.use(express.json());

// test url
app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
  });

const port = process.env.PORT || 5100;

// movie api endpoints, authentication end points, an end point to get the current user
app.use('/api/v1/movies', authenticateUser,  movies);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not really found' });
  });
    
app.use(errorHandlerMiddleware);  

/*const movies = Data.map((movie) => { // run it only once
    Movie.create({...movie});
  });*/
   

// starting the server after connecting to mogodb database
const start = async () => {
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        
        console.log(`server running on PORT ${port}...`);
    });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  
  };
  
  
start();
  
