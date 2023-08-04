import React, { useState, useEffect } from 'react';

const Chandrayaan3Control = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [direction, setDirection] = useState('N');
  const [initialPosition, setInitialPosition] = useState('0, 0, 0');
  const [initialDirection, setInitialDirection] = useState('N');
  const [commands, setCommands] = useState('');
  const [stopExecution, setStopExecution] = useState(false);
  const [positionsHistory, setPositionsHistory] = useState([]);
  const [stepCount, setStepCount] = useState(0); // New state to keep track of the step count

  const moveForward = (currentPosition, currentDirection) => {
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
    return 'U';
  };

  const turnDown = () => {
    return 'D';
  };

  const logPositions = (positions) => {
    console.log('Position History:');
    positions.forEach((pos, index) => {
      console.log(`Step ${index + 1}: x=${pos.x}, y=${pos.y}, z=${pos.z}`);
    });
  };

  const handleCommandsSubmit = (e) => {
    e.preventDefault();
    setStopExecution(false);
    setPositionsHistory([]);
  
  
    if (commands.length === 0) {
      return;
    }
  
    const commandArray = commands.split(',');
  
    let currentPosition = { ...position };
    let currentDirection = direction;
    let tempPositions = []; // Temporary array to store positions
  
    for (let command of commandArray) {
      setStepCount((prevStep) => prevStep + 1);
      switch (command.trim().toLowerCase()) {
        case 'f':
          currentPosition = moveForward(currentPosition, currentDirection);
          break;
        case 'b':
          currentPosition = moveBackward(currentPosition, currentDirection);
          break;
        case 'r':
          currentDirection = turnRight(currentDirection);
          break;
        case 'l':
          currentDirection = turnLeft(currentDirection);
          break;
        case 'u':
          currentDirection = turnUp();
          break;
        case 'd':
          currentDirection = turnDown();
          break;
        default:
          break;
      }
  
      tempPositions.push({ ...currentPosition });
    }
  
    // Update the position history after all commands are executed
    setPositionsHistory(tempPositions);
  
    setPosition(currentPosition);
    setDirection(currentDirection);
    setStopExecution(true);
  };
  

  useEffect(() => {
    logPositions(positionsHistory);
  }, [positionsHistory]);

  const handleStopExecution = () => {
    setStopExecution(true);
  };

  const handleInitialValuesSubmit = (e) => {
    e.preventDefault();
    const [x, y, z] = initialPosition.split(',').map((val) => parseInt(val.trim(), 10));
    setPosition({ x, y, z });
    setDirection(initialDirection);
  };

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
