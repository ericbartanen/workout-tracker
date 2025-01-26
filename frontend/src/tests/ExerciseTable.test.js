import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ExerciseTable from '../components/ExerciseTable';

describe('Exercise Table', () => {

  // Mock Exercise Component (formatted as individual row in table)
  jest.mock('../components/Exercise', () => ({ exercise, onDelete, onEdit }) => (
    <tr>
        <td>{exercise.name}</td>
        <td>{exercise.equipment}</td>
        <td>{exercise.weight}</td>
        <td>{exercise.unit}</td>
        <td>{exercise.reps}</td>
        <td>{exercise.description}</td>
        <td><button name="edit-button" onClick={() => onEdit(exercise)}>Edit</button></td>
        <td><button onClick={() => onDelete(exercise)}>Delete</button></td>
    </tr>
  ));

  // Mock Exercises
  const mockExercises = [
    {name: 'Bench Press', equipment: 'barbell', weight: 100, unit: 'lbs', reps: 10, description: 'standard grip', _id: '1'},    
    {name: 'Row', equipment: 'dumbbell', weight: 25, unit: 'kg', reps: 5, description: '', _id: '2'}
  ]

  // Mock Edit and Delete functions
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
    mockOnEdit.mockClear();
  });

  // TESTS //
  test('renders exercise table with headers', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.getByText('Reps')).toBeInTheDocument();
    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('renders correct number of exercises (2 from mock)', () => {
    render(<ExerciseTable exercises={mockExercises} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getAllByText(/Bench Press|Row/)).toHaveLength(mockExercises.length);
  });

});