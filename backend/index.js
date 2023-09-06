import express from 'express';
import { config } from 'dotenv';
config();
import connectDB from './config/mongooseConfig.js';
connectDB();
import mainRoute from './router/index.js';
import layout from 'express-ejs-layouts';
import { dirname, join } from 'path';
import { fileURLToPath  } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(layout);
app.use('./public', express.static(join(__dirname, './public')));
app.use(mainRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});
