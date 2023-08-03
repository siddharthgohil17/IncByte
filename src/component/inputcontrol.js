import React, { useState } from "react";

const Chandrayaan3Control = () => {
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const [direction, setDirection] = useState('N');
    const [commands, SetCommands] = useState('')
    const [stopExecution, SetStopExecution] = useState(false);

    const moveforward = () => {
        switch (direction) {
            case 'N':
                setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
                break;
            case 'S':
                setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 1 }));
                break;
            case 'E':
                setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 1 }));
                break;
            case 'W':
                setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 1 }));
                break;
            case 'U':
                setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z + 1 }));
                break;
            case 'P':
                setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z - 1 }));
                break;
            default:
                break;
        }
    }

    const movebackward = () => {
        switch (direction) {
            case 'N':
                setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 1 }));
                break;
            case 'S':
                setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
                break;
            case 'E':
                setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 1 }));
                break;
            case 'W':
                setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 1 }));
                break;
            case 'U':
                setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z - 1 }));
                break;
            case 'P':
                setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z + 1 }));
                break;
            default:
                break;
        }
    }
    
    const turnLeft = () => {
        // Implement the logic to turn the spacecraft 90 degrees left based on its current direction
        switch (direction) {
            case 'N':
                setDirection('W');
                break;
            case 'S':
                setDirection('E');
                break;
            case 'E':
                setDirection('N');
                break;
            case 'W':
                setDirection('S');
                break;
            case 'U':
                setDirection('W');
                break;
            case 'D':
                setDirection('W');
                break;

            default:
                break;
        }
    };

    const turnRight = () => {
        // Implement the logic to turn the spacecraft 90 degrees right based on its current direction
        switch (direction) {
            case 'N':
                setDirection('E');
                break;
            case 'S':
                setDirection('W');
                break;
            case 'E':
                setDirection('S');
                break;
            case 'W':
                setDirection('N');
                break;
            case 'U':
                setDirection('E');
                break;
            case 'D':
                setDirection('E');
                break;
            default:
                break;
        }
    };

    const turnUp = () => {
        // Implement the logic to turn the spacecraft upward
        setDirection('U');
    };

    const turnDown = () => {
        // Implement the logic to turn the spacecraft downward
        setDirection('D');
    };


    const handleCommands = (e) => {
        e.preventDefault();
        
        for (let command of commands) {
            switch (command) {
                case 'f':
                    moveforward();
                    break;
                case 'b':
                    movebackward();
                    break;
                case 'r':
                    turnRight();
                    break;
                case 'l':
                    turnLeft();
                    break;
                case 'u':
                    turnUp();
                    break;
                case 'd':
                    turnDown();
                    break;
                default:
                    break;
            }
            SetCommands('')
        }


    }

    const handleDeclareResutlt = (e) => {
        e.preventDefault();
        SetCommands("");
        
        SetStopExecution(true);
    }


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

            <form onSubmit={handleCommands}>
                <label>
                    Enter Commands:
                    <input type="text" value={commands} onChange={(e) => SetCommands(e.target.value)} />
                    <button type="submit">Execute Commands</button>
                    <button onClick={handleDeclareResutlt}>Stop</button>
                </label>
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
