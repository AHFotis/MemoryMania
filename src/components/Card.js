import React, { useState, useEffect } from "react";
import {useSpring, animated as a} from "react-spring";
//if you have problems, try chaning setFlipped to set
function Card ({
    id,
    color,
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
}) {
    const [flipped, setFlipped] = useState(false)
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg`,
        config: {mass: 5, tension: 500, friction: 80},
    })

    useEffect(() => {
        console.log('Flipped Indexes Changed')
    }, [flippedIndexes])

    const onCardClick = () => {
        if (!game[id].flipped && flippedCount % 3 === 0) {
            setFlipped(state => !state)
            setFlippedCount(flippedCount + 1)
            const newIndexes = [...flippedIndexes]
            newIndexes.push(id)
            setFlippedIndexes(newIndexes)
        } else if (flippedCount % 3 === 1 && !game[id].flipped && flippedIndexes.indexOf(id) < 0) {
            setFlipped(state => !state)
            setFlippedCount(flippedCount + 1)
            const newIndexes = [...flippedIndexes]
            newIndexes.push(id)
            setFlippedIndexes(newIndexes)
        }
        // console.log('Card Clicked')
        // setFlipped(state => state)
        // setFlipped((state) => !state)
    }
    return (
    <div onClick={onCardClick}>
        <a.div className="c back" style={{opacity: opacity.interpolate(o => 1 -o), transform,}} />
        <a.div className="c front" style={{opacity, transform: transform.interpolate(t => `${t}rotateX(180deg)`), background: color,}} />
    </div>
    )
}

export default Card