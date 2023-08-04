import React, { useState, useEffect } from 'react';

const Chandrayaan3Control = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [direction, setDirection] = useState('N');
  const [initialPosition, setInitialPosition] = useState('0, 0, 0');
  const [initialDirection, setInitialDirection] = useState('N');
  const [commands, setCommands] = useState("");
  const [stopExecution, setStopExecution] = useState(false); // Initially set to true

  const moveForward = (currentPosition, currentDirection) => {
    // Implement the logic to move the spacecraft one step forward based on its current direction
    switch (currentDirection) {
      case 'N':
        return { x: currentPosition.x, y: currentPosition.y + 1, z: currentPosition.z };
      case 'S':
        return { x: currentPosition.x, y: currentPosition.y - 1, z: currentPosition.z };
      case 'E':
        return { x: currentPosition.x + 1, y: currentPosition.y, z: currentPosition.z };
      case 'W':
        return { x: currentPosition.x - 1, y: currentPosition.y, z: currentPosition.z };
      case 'U':
        return { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z + 1 };
      case 'D':
        return { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z - 1 };
      default:
        return currentPosition;
    }
  };

  const moveBackward = (currentPosition, currentDirection) => {
    switch (currentDirection) {
      case 'N':
        return { x: currentPosition.x, y: currentPosition.y - 1, z: currentPosition.z };
      case 'S':
        return { x: currentPosition.x, y: currentPosition.y + 1, z: currentPosition.z };
      case 'E':
        return { x: currentPosition.x - 1, y: currentPosition.y, z: currentPosition.z };
      case 'W':
        return { x: currentPosition.x + 1, y: currentPosition.y, z: currentPosition.z };
      case 'U':
        return { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z - 1 };
      case 'D':
        return { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z + 1 };
      default:
        return currentPosition;
    }
  };

  const turnLeft = (currentDirection) => {
    // Implement the logic to turn the spacecraft 90 degrees left based on its current direction
    switch (currentDirection) {
      case 'N':
        return 'W';
      case 'S':
        return 'E';
      case 'E':
        return 'N';
      case 'W':
        return 'S';
      case 'U':
        return 'W';
      case 'D':
        return 'E';
      default:
        return currentDirection;
    }
  };

  const turnRight = (currentDirection) => {
    // Implement the logic to turn the spacecraft 90 degrees right based on its current direction
    switch (currentDirection) {
      case 'N':
        return 'E';
      case 'S':
        return 'W';
      case 'E':
        return 'S';
      case 'W':
        return 'N';
      case 'U':
        return 'E';
      case 'D':
        return 'W';
      default:
        return currentDirection;
    }
  };

  const turnUp = () => {
    // Implement the logic to turn the spacecraft upward
    return 'U';
  };

  const turnDown = () => {
    // Implement the logic to turn the spacecraft downward
    return 'D';
  };

  const handleCommandsSubmit = (e) => {
    e.preventDefault();
    setStopExecution(false); // Reset the stopExecution flag

    if (commands.length === 0) {
      return; // Don't proceed if there are no commands
    }

    const commandArray = commands.split(','); // Split commands into an array

    let currentPosition = { ...position };
    let currentDirection = direction;

    for (let command of commandArray) {
      switch (command.trim().toLowerCase()) {
        case "f":
          currentPosition = moveForward(currentPosition, currentDirection);
          break;
        case "b":
          currentPosition = moveBackward(currentPosition, currentDirection);
          break;
        case "r":
          currentDirection = turnRight(currentDirection);
          break;
        case "l":
          currentDirection = turnLeft(currentDirection);
          break;
        case "u":
          currentDirection = turnUp();
          break;
        case "d":
          currentDirection = turnDown();
          break;
        default:
          break;
      }
    }

    // Update the final position and direction
    setPosition(currentPosition);
    setDirection(currentDirection);

    // Once all commands are executed, set the stopExecution flag to true
    setStopExecution(true);
  };

  const handleStopExecution = () => {
    setStopExecution(true);

  };

  const handleInitialValuesSubmit = (e) => {
    e.preventDefault();
    // Set the initial position and direction based on the user input
    const [x, y, z] = initialPosition.split(',').map((val) => parseInt(val.trim(), 10));
    setPosition({ x, y, z });
    setDirection(initialDirection);
  };

  useEffect(() => {
    console.log("Position updated:", position);
  }, [position, direction]);

  return (
    <div>
      <h2>Chandrayaan 3 Lunar Craft Control</h2>

      <form onSubmit={handleInitialValuesSubmit}>
        <label>
          Enter Initial Position (x, y, z):
          <input type="text" value={initialPosition} onChange={(e) => setInitialPosition(e.target.value)} required />
        </label>
        <label>
          Enter Initial Direction:
          <input type="text" value={initialDirection} onChange={(e) => setInitialDirection(e.target.value)} required />
        </label>
        <button type="submit">Set Initial Values</button>
      </form>

      <p>Current Position: ({position.x}, {position.y}, {position.z})</p>
      <p>Current Direction: {direction}</p>

      <form onSubmit={handleCommandsSubmit}>
        <label>
          Enter Commands:
          <input type="text" value={commands} onChange={(e) => setCommands(e.target.value)} required />
        </label>
        <button type="submit" onClick={handleStopExecution}>Execute Commands</button>

      </form>

      {/* Display the final position and direction here */}
      {stopExecution && (
        <div>
          <h3>Final Position:</h3>
          <p>Position: ({position.x}, {position.y}, {position.z})</p>
          <p>Direction: {direction}</p>
        </div>
      )}
    </div>
  );
};

export default Chandrayaan3Control;
