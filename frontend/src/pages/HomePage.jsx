import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from "react-loader-spinner"

function HomePage( { setExerciseToEdit } ) {

    const [exercises, setExercises] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`https://backend-dot-exercise-tracker-eb.wn.r.appspot.com/api/exercises/${_id}`, {method: 'DELETE'});  
        if (response.status === 204) {
            const newExercises = exercises.filter(exercise => exercise._id !== _id)
            setExercises(newExercises)
        } else {
            console.error(`Failed to delete exercise with id ${_id}, status code ${response.status}`);
        };
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    };

    const loadExercises = async () => {
        setIsDataLoading(true);
        const response = await fetch('https://backend-dot-exercise-tracker-eb.wn.r.appspot.com/api/exercises');
        const exercises = await response.json();
        setExercises(exercises);
        setIsDataLoading(false);
    };

    useEffect(() => {
        loadExercises();
    }, []);


    // Spinning loader animation to show while data is fetched
    function Loader() {
        return (
            <RotatingLines
              strokeColor = "grey"
              strokeWidth = "5"
              animationDuration = "1.25"
              width = "56"
              visible={true}
            />
        )
    };

    function RenderData() {
        return <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>

    }

    return (
        <>
            <h2> Your PRs </h2>
            {isDataLoading ? <Loader /> : <RenderData />}
        </>
    );
};

export default HomePage;