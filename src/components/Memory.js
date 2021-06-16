import React, { useState, useEffect } from "react";
import Card from "./Card"

function Memory({options, setOptions, highScore, setHighScore}) {
    const [game, setGame] = useState([])
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippedIndexes, setFlippedIndexes] = useState([])

    const colors = [
        '#ecdb54',
        '#e34132',
        '#6ca0dc',
        '#944743',
        '#dbb2d1',
        '#ec9787',
        '#00a68c',
        '#645394',
        '#6c4f3d',
        '#ebe1df',
        '#bc6ca7',
        '#bfd833',
    ]
    
    useEffect(() => {
        const newGame = []
        for (let i = 0; i < options / 2; i++) {
            const firstOption = {
                id: 2 * i,
                colorId: i,
                color: colors[i],
                flipped: false,
            }
            const secondOption = {
                id: 2 * i + 1,
                colorId: i,
                color: colors[i],
                flipped: false,
            }

            newGame.push(firstOption)
            newGame.push(secondOption)
        }

        const shuffledGame = newGame.sort(() => Math.random() - 0.5)
        setGame(shuffledGame)
    }, [])

    useEffect(() => {
        const finished = !game.some(card => !card.flipped)
        if (finished && game.length > 0) {
            setTimeout(() => {
                const bestPossible = game.length
                let multiplier

                if (options === 12) {
                    multiplier = 5
                } else if (options === 18) {
                    multiplier = 2.5
                } else if (options === 24) {
                    multiplier = 1
                }

                const pointsLost = multiplier * (0.66 * flippedCount - bestPossible)

                let score
                if (pointsLost < 100) {
                    score = 100 - pointsLost
                } else {
                    score = 0
                }

                if (score > highScore) {
                    setHighScore(score)
                    const newHighScore = JSON.stringify(score)
                    localStorage.setItem('memorymaniahighscore', newHighScore)
                }
            })
        }
    }, [game])

    if (flippedIndexes.length === 2) {
        const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId

        if (match) {
            const newGame = [...game]
            newGame[flippedIndexes[0]].flipped = true
            newGame[flippedIndexes[1]].flipped = true
            setGame(newGame)

            const newIndexes = [...flippedIndexes]
            newIndexes.push(false)
            setFlippedIndexes(newIndexes)
        } else {
            const newIndexes = [...flippedIndexes]
            newIndexes.push(true)
            setFlippedIndexes(newIndexes)
        }
    }

    if (game.length === 0) return <div>loading mania...</div>
    else {
        return (
            <div id="cards">
                {game.map((card, index) => (
                    <div className="card" key={index}>
                        <Card 
                        id={index}
                        color={card.color}
                        game={game}
                        flippedCount={flippedCount}
                        setFlippedCount={setFlippedCount}
                        flippedIndexes={flippedIndexes}
                        setFlippedIndexes={setFlippedIndexes}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default Memory