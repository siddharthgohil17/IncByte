import React from 'react';
import { render, screen,fireEvent} from '@testing-library/react';
import Chandrayaan from './inputcontrol'

test("header",()=>{
    render(<Chandrayaan/>)
    const linkelement=screen.getByText("Chandrayaan 3 Lunar Craft Control");
    expect(linkelement).toBeVisible();
})
test('define intial position and direction', () => {
    render(<Chandrayaan />);
    
    const initialPositionInput = screen.getByLabelText('Enter Initial Position (x, y, z):');
    expect(initialPositionInput).toBeVisible();
    fireEvent.change(initialPositionInput, { target: { value: '10, 20, 30' } });
    expect(initialPositionInput.value).toBe('10, 20, 30');

    const initialDirection = screen.getByLabelText('Enter Initial Direction:');
    expect(initialDirection).toBeVisible();
    fireEvent.change(initialDirection,{target:{value:'N'}});
    expect(initialDirection.value).toBe('N');

    const currentPositionElement = screen.getByText('Current Position: (0, 0, 0)');
  const currentDirectionElement = screen.getByText('Current Direction: N');

  expect(currentPositionElement).toBeInTheDocument();
  expect(currentDirectionElement).toBeInTheDocument();


  });
  