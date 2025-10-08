import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [reps, setReps] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    
    const createExercise = async (e) => {
        e.preventDefault()
        const newExercise = {name, equipment, weight, unit, reps, description};        

        const response = await fetch(`https://backend-dot-exercise-tracker-eb.wn.r.appspot.com/api/exercises`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            navigate("/");
        } else {
            alert('Whoops, an error occured. Please try again.')
            navigate("/create-exercise");
         }
    };

    return (
        <form>
            <h2>New PR</h2>

            <div className='input-form'>
                <label htmlFor='exercise'>Exercise Name:</label>
                <input
                    id='exercise'
                    placeholder='Bench Press'
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div> 

            <div className='input-form'>
                <label htmlFor='equipment'>Equipment Type:</label>
                <input
                    id='equipment'
                    placeholder='barbell'
                    type="text"
                    value={equipment}
                    onChange={e => setEquipment(e.target.value)} />
            </div>

            <div className='input-form'>
                <label htmlFor='weight'>Weight:</label>
                <input
                    id='weight'
                    placeholder='e.g. 225'
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
            </div>

            <div className='input-form'>    
                <label htmlFor='units'>Units:</label>
                <select id='units' value={unit} onChange={e => setUnit(e.target.value)}>
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
                </select>
            </div>

            <div className='input-form'>
                <label htmlFor='reps'>Number of Reps:</label>
                <input
                    id='reps'
                    placeholder='e.g. 5'
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
            </div>

            <div className='input-form'>    
                <label htmlFor='description'>Description:</label>
                <input
                    id='description'
                    placeholder='standard flat bench'
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </div> 

            <button onClick={createExercise}>Save</button>
        </form>
    );
}

export default CreateExercisePage;