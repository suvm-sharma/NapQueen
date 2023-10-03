import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import app from './app';

const mongoose_url = process.env.DATABASE;

mongoose
  .connect(mongoose_url ?? '')
  .then(() => {
    console.log('DataBase is connected Successfully!!');
  })
  .catch((error: any) => {
    console.error('Error getting from DataBase', error);
  });

const port = process.env.PORT || 1997;

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
