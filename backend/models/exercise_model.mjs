import mongoose from 'mongoose';
// import db from '../db/connection.mjs';

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    equipment: { type: String, required: true},
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    reps: { type: Number, required: true },
    description: { type: String, required: false}
})

const Exercise = mongoose.model("Exercise", exerciseSchema);

// Create new exercise
const createExercise = async (name, equipment, weight, unit, reps, description) => {
    const exercise = new Exercise({name: name, equipment: equipment, weight: weight, unit: unit, reps: reps, description: description});
    return exercise.save();
};

// Read all exercises
const findExercises = async () => {
    const query = Exercise.find();
    return query.exec()
};

// Read exercise by id
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec()
};

// Update exercise by id
const updateExercise = async (_id, update) => {
    const result = await Exercise.updateOne(_id, update)
    return result.modifiedCount;
};

// Delete exercise by id
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne(_id)
    return result.deletedCount;
};

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise }