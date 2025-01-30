import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ( { exerciseToEdit } ) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [equipment, setEquipment] = useState(exerciseToEdit.equipment);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [description, setDescription] = useState(exerciseToEdit.description);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, equipment, weight, unit, reps, description};
        const response = await fetch(`https://backend-dot-exercise-tracker-eb.wn.r.appspot.com/api/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            alert(`You successfully updated ${name}`)
        } else {
            alert('Hmm, something went wrong. Please try again.')
        }
        navigate("/");
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <div className='input-form'>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    value={equipment}
                    onChange={e => setEquipment(e.target.value)} />
                <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <select value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>
                <input
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                <input
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </div>
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;