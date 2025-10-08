import 'dotenv/config';
import { body, validationResult } from 'express-validator';
import * as exercises from '../models/exercise_model.mjs';
import express from 'express';

const router = express.Router();

// CREATE new exercise
router.post(
    '/exercises', 
    body('name').isLength({min: 1}),
    body('equipment').isLength({min: 1}),
    body('weight').isInt({min: 0}),
    body('unit').isIn(['kgs', 'lbs']),
    body('reps').isInt({min: 1}),
    body('description'),
    (req, res) => {

    exercises.createExercise(req.body.name, req.body.equipment, req.body.weight, req.body.unit, req.body.reps, req.body.description)    
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.log(req.body)
            res.status(400).json({Error: 'Request Failed', message: error.message});
        });
});

// READ all exercises
router.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed', message: error.message});
        });
});

// READ one exercise by id
router.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercises => {
            if (exercises !== null) {
                res.json(exercises);  
            } else {
                res.status(404).json({ Error: 'Not found', message: errors.message});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed', message: error.message});
        });
});

// UPDATE exercise by id
router.put(
    '/exercises/:_id', 
    body('name').isLength({min: 1}),
    body('equipment').isLength({min: 1}),
    body('weight').isInt({min: 0}),
    body('unit').isIn(['kgs', 'lbs']),
    body('reps').isInt({min: 1}),
    body('description'),
    (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Error: 'Invalid request', message: errors.message})
    };
    
    const exerciseId = req.params._id;

    exercises.updateExercise({_id: exerciseId}, req.body)
        .then(result => {
            if (result === 1) {
                res.json({_id: exerciseId, name: req.body.name, equipment: req.body.equipment, weight: req.body.weight, unit: req.body.unit, reps: req.body.reps, description: req.body.description})
            } else {
                res.status(404).json({ Error: 'Not found', message: errors.message});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed', message: error.message});
        });
});

// DELETE exercise by id
router.delete('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.deleteExercise({_id: exerciseId})
        .then(result => {
            if (result === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found', message: errors.message});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request Failed', message: error.message});
        });
});

export default router;
