import mongoose from 'mongoose';
import 'dotenv/config';

const clientOptions = { serverApi: {version: '1', strict: true, deprecationErrors: true } };

async function run() {
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ping: 1});
    console.log("Connected to MongoDB!");
};

export default run;