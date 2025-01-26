
import express from 'express';
import 'dotenv/config';
import run from "./db/connection.mjs";
import exercise_controller from './controllers/exercise_controller.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// start mongoDB
run().catch(console.dir);

// Connect to api routes in separate modules
app.use('/api', exercise_controller)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));