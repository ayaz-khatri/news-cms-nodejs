import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import frontendRoutes from './routes/frontend.js';
import adminRoutes from './routes/admin.js';
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------------- Initialize Express App ------------------------- */
const app = express();

/* ------------------------------- Middlewares ------------------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');

/* --------------------------- Database Connection -------------------------- */
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database Connected."))
.catch(err => console.log(err));

/* --------------------------------- Routes --------------------------------- */
app.use('/', frontendRoutes);
app.use('/admin', (res, req, next)=>{
  res.locals.layout = ' admin/layout';
  next();
});
app.use('/admin', adminRoutes);


/* ---------------------------- Start the server ---------------------------- */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
