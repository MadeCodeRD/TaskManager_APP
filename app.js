import * as dotenv from 'dotenv';
import express from 'express';


import { taskRoutes } from './routes/tasks.js';
import connectDB from './db/connect.js';
import { notFound } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

// db connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
