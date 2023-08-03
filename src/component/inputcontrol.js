import React, { useState } from "react";

const Chandrayaan3Control = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [direction, setDirection] = useState('N');

  const handleInitialValuesSubmit = (e) => {
    e.preventDefault();
    const [x, y, z] = e.target.position.value.split(',').map((val) => parseInt(val.trim(), 10));
    setPosition({ x, y, z });
    setDirection(e.target.direction.value);
  };

  return (
    <div>
      <h2>Chandrayaan 3 Lunar Craft Control</h2>
      <form onSubmit={handleInitialValuesSubmit}>
        <label>
          Enter Initial Position (x, y, z):
          <input type="text" name="position" defaultValue={`${position.x}, ${position.y}, ${position.z}`} />
        </label>
        <label>
          Enter Initial Direction:
          <input type="text" name="direction" defaultValue={direction} />
        </label>
        <button type="submit">Set Initial Values</button>
      </form>
      <p>Current Position: ({position.x}, {position.y}, {position.z})</p>
      <p>Current Direction: {direction}</p>

      <form>
        <label>
          Enter Commands:
          <input type="text" />
          <button type="submit">Execute Commands</button>
        </label>
      </form>
    </div>
  );
};

export default Chandrayaan3Control;
