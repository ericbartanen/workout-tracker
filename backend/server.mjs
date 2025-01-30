
import express from 'express';
import 'dotenv/config';
import run from "./db/connection.mjs";
import exercise_controller from './controllers/exercise_controller.mjs';
import cors from 'cors';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

// Allow cross origin resource sharing
app.use(cors({ origin: 'https://exercise-tracker-eb.wn.r.appspot.com' }));

// start mongoDB
run().catch(console.dir);

// Connect to api routes in separate modules
app.use('/api', exercise_controller)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));