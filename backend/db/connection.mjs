import mongoose from 'mongoose';
import 'dotenv/config';

const clientOptions = { serverApi: {version: '1', strict: true, deprecationErrors: true }, family: '4' };

async function run() {
    mongoose.connection.on('connected', () => console.log('connected to mongoDB'));
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
};

export default run;