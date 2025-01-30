import mongoose from 'mongoose';
import 'dotenv/config';
import http from 'http';

// Import GCP Secret Manager client and instantiate
// const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secretManagerClient = new SecretManagerServiceClient();

// Get Mongo URI from GCP Secret Manager
async function getMongoUri() {
    const [accessResponse] = await secretManagerClient.accessSecretVersion({
        name: 'projects/163187482564/secrets/MONGO_URI/versions/1',
    });
    return accessResponse.payload.data.toString('utf8');
}

// MongoDB Client Options
const mongoClientOptions = { serverApi: {version: '1', strict: true, deprecationErrors: true }, family: '4' };

// Connect to mongoDB
async function run() {

    mongoose.connection.on('connected', () => console.log('connected to mongoDB'));

    // use process.env for local testing //
    // await mongoose.connect(process.env.MONGO_URI, mongoClientOptions); 

    // GCP secret manager for production
    getMongoUri().then((mongoUri) => {
        mongoose.connect(mongoUri, mongoClientOptions);
    })
};

export default run;