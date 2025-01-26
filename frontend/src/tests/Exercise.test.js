import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Exercise from '../components/Exercise';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

describe('Exercise Component', () => {

  // Mock Exercise Component
  const mockExercise = {
    name: 'Back Squat',
    equipment: 'Barbell',
    reps: 5,
    weight: 225,
    unit: 'lbs',
    description: 'blah',
    _id: '1'
  };

  // Mock Edit and Delete Functions
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();


  // TESTS //
  test('renders exercise details', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    expect(screen.getByText('Back Squat')).toBeInTheDocument();
    expect(screen.getByText('Barbell')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('225')).toBeInTheDocument();
    expect(screen.getByText('lbs')).toBeInTheDocument();
    expect(screen.getByText('blah')).toBeInTheDocument();
  });

  test('calls onEdit with exercise object when edit button is clicked', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockExercise);
  });

  test('calls onDelete with exercise id when delete button is clicked', () => {
    render(<Exercise exercise={mockExercise} onDelete={mockOnDelete} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockExercise._id);
  });
});