import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes.js/auth.js';
import postRouter from './routes.js/posts.js';
import bodyParser from 'body-parser';

require('dotenv').config();
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rdgwukn.mongodb.net/?retryWrites=true&w=majority`, {
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
}

connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))