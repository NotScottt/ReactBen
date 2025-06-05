import React, { useRef } from 'react';

const HoldButton = ({ onHold, interval = 100, children, buttonClass }) => {
  const intervalRef = useRef(null);

  const startHolding = () => {
    if (intervalRef.current) return; // schon aktiv

    intervalRef.current = setInterval(() => {
      onHold();
    }, interval);
  };

  const stopHolding = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <button
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      onTouchCancel={stopHolding}
      className={buttonClass}
    >
      {children || 'Holdbutton'}
    </button>
  );
};

export default HoldButton;