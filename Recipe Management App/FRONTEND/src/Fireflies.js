import React, { useEffect, useState } from "react";
import "./Fireflies.css";

const Fireflies = ({ count = 15 }) => {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: count }, (_, index) => ({
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
    setFireflies(newFireflies);
  }, [count]);

  return (
    <div className="fireflies-container">
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="firefly"
          style={{
            top: `${fly.y}vh`,
            left: `${fly.x}vw`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Fireflies;
