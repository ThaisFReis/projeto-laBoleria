import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import routes
import cakesRoutes from './routes/cakesRoutes.js';
import clientsRoutes from './routes/clientsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// use routes
app.use(cakesRoutes);
app.use(clientsRoutes);
app.use(ordersRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});