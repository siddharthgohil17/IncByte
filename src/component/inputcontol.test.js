import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chandrayaan from './inputcontrol';

test('Header renders correctly', () => {
  render(<Chandrayaan />);
  const headerElement = screen.getByText('Chandrayaan 3 Lunar Craft Control');
  expect(headerElement).toBeVisible();
});

test('Define initial position and direction', () => {
  render(<Chandrayaan />);

  const initialPositionInput = screen.getByLabelText('Enter Initial Position (x, y, z):');
  const initialDirectionInput = screen.getByLabelText('Enter Initial Direction:');
  const setInitialValuesButton = screen.getByText('Set Initial Values');

  expect(initialPositionInput).toBeVisible();
  expect(initialDirectionInput).toBeVisible();

  fireEvent.change(initialPositionInput, { target: { value: '10, 20, 30' } });
  expect(initialPositionInput.value).toBe('10, 20, 30');

  fireEvent.change(initialDirectionInput, { target: { value: 'N' } });
  expect(initialDirectionInput.value).toBe('N');

  fireEvent.click(setInitialValuesButton);

  const currentPositionElement = screen.getByText('Current Position: (10, 20, 30)');
  const currentDirectionElement = screen.getByText('Current Direction: N');

  expect(currentPositionElement).toBeInTheDocument();
  expect(currentDirectionElement).toBeInTheDocument();
});

test('Display final position and direction after command execution', () => {
  render(<Chandrayaan />);

  // Find the input field for commands and the "Execute Commands" button
  const commandsInput = screen.getByLabelText('Enter Commands:');
  const executeCommandsButton = screen.getByText('Execute Commands');

  // Set initial position and direction
  const initialPositionInput = screen.getByLabelText('Enter Initial Position (x, y, z):');
  const initialDirectionInput = screen.getByLabelText('Enter Initial Direction:');
  const setInitialValuesButton = screen.getByText('Set Initial Values');

  fireEvent.change(initialPositionInput, { target: { value: '0, 0, 0' } });
  fireEvent.change(initialDirectionInput, { target: { value: 'N' } });
  fireEvent.click(setInitialValuesButton);

  // Set commands to move the spacecraft and change its direction
  fireEvent.change(commandsInput, { target: { value: 'f,r,u,b,l' } });

  // Click the "Execute Commands" button
  fireEvent.click(executeCommandsButton);

  // Find the elements displaying the final position and direction
  const finalPositionElement = screen.getByText('Final Position:');
  const positionElement = screen.getByText('Position: (0, 1, -1)');
  const directionElement = screen.getByText('Direction: W');

  // Check if the correct final position and direction are displayed
  expect(finalPositionElement).toBeVisible();
  expect(positionElement).toBeVisible();
  expect(directionElement).toBeVisible();
});

test('Second test case', () => {
  render(<Chandrayaan />);

  // Find the input field for commands and the "Execute Commands" button
  const commandsInput = screen.getByLabelText('Enter Commands:');
  const executeCommandsButton = screen.getByText('Execute Commands');

  // Set initial position and direction
  const initialPositionInput = screen.getByLabelText('Enter Initial Position (x, y, z):');
  const initialDirectionInput = screen.getByLabelText('Enter Initial Direction:');
  const setInitialValuesButton = screen.getByText('Set Initial Values');

  fireEvent.change(initialPositionInput, { target: { value: '-1, 0, 2' } });
  fireEvent.change(initialDirectionInput, { target: { value: 'W' } });
  fireEvent.click(setInitialValuesButton);

  // Set commands to move the spacecraft and change its direction
  fireEvent.change(commandsInput, { target: { value: 'r,f,u,f,r,b,l' } });

  // Click the "Execute Commands" button
  fireEvent.click(executeCommandsButton);

  // Find the elements displaying the final position and direction
  const finalPositionElement = screen.getByText('Final Position:');
  const positionElement = screen.getByText('Position: (-2, 1, 3)');
  const directionElement = screen.getByText('Direction: N');

  // Check if the correct final position and direction are displayed
  expect(finalPositionElement).toBeVisible();
  expect(positionElement).toBeVisible();
  expect(directionElement).toBeVisible();
});
