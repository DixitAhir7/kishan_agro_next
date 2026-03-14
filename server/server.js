import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import adminRoute from './routes/adminRoutes.js';
dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();

// Middleware
app.use(cors());
app.use(express.json())

// Routes
app.use('/api/products', productRoutes);
app.use("/api", adminRoute)

app.get('/', (req, res) => {
    res.send('welcome to kishan agro');
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});