import React, { useState, useEffect } from "react";
import {useSpring, animated as a} from "react-spring";
import Memory from "../components/Memory"

export default function Game() {
    const [options, setOptions] = useState(null)
    const [highScore, setHighScore] = useState(0)

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="gameContainer">
                <h1>Memory Mania</h1>
                <div>High Score: {highScore}</div>
                <div>
                    {options === null ? (
                    <div>
                        <button onClick={() => setOptions(12)}>Easy</button>
                        <button onClick={() => setOptions(18)}>Medium</button>
                        <button onClick={() => setOptions(24)}>Hard</button>
                    </div>
                    ) : (
                    <div>
                        <button onClick={() => {
                            const prevOptions = options
                            setOptions(null)
                            setTimeout(() => {
                                setOptions(prevOptions)
                            }, 5)
                            }}
                            >
                            Start Over
                            </button>
                        <button onClick={() => setOptions(null)}>Main Menu</button>   
                    </div>
                    )}
                </div>
            </div>

            {options ? (
                <Memory
                options={options}
                setOptions={setOptions}
                highScore={highScore}
                setHighScore={setHighScore}
                />
            
            ) : (
                <h2>Ready to get manic and test that memory? Choose a difficulty level to begin!</h2>
            ) }
        </div>
    )
}

