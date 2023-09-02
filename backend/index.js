import express from 'express';
import { config } from 'dotenv';
config();
import connectDB from './config/mongooseConfig.js';
connectDB();
import mainRoute from './router/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mainRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});
