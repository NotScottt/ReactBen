import { useState, useRef } from "react";

export const useBenMovement = () => {
    const [x, setX] = useState(
        Math.floor(Math.random() * 51) - 100 // -100 bis -30
    );
    const y = -69;
    const timeoutRef = useRef();

    const move = () => {
        setX(Math.floor(Math.random() * 71) - 100);
        timeoutRef.current = setTimeout(move, 7000);
    };

    // Starte das erste Timeout nur einmal
    if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(move, 5000);
    }

    // Cleanup, falls das Component unmounted wird
    // (optional, falls du das Hook in einem Component verwendest)
    // useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const benStyle = {
        transform: `translate(${x}%, ${y}%)`
    };

    return benStyle;
}