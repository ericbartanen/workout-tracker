import React from 'react';
import Exercise from './Exercise';

function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Equipment</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Reps</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <Exercise 
                    exercise={exercise} 
                    onDelete={onDelete} 
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ExerciseTable;