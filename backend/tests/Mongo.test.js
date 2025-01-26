const {MongoClient} = require('mongodb');
const { beforeEach } = require('node:test');
require('dotenv').config()

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URI, {});
        db = connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    test('insert exercise into collection', async () => {
        const exercises = db.collection('testExercises');
       
        // add mock exercise to testExercises collection in mongo
        const mockExercise = {_id: 45678, name: 'Bent over row', equipment: 'barbell', weight: '100', unit: 'lbs', reps: '10', description: 'standard grip'};
        await exercises.insertOne(mockExercise);
       
        // find and test mock exercise in db
        const insertedExercise = await exercises.findOne({_id: 45678});
        expect(insertedExercise).toEqual(mockExercise);

        // clear mock exercise from mongodb
        await exercises.deleteOne({_id: 45678});
    });
});