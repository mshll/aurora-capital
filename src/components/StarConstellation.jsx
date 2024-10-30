"use client";
import React, { useEffect, useState } from 'react';

const StarConstellation = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions and add the resize event listener
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;

  const circlePositions = [
    { x: 0.3, y: 0.4, radius: 150, imgSrc: 'meshal.svg' },
    { x: 0.7, y: 0.3, radius: 150, imgSrc: 'wahab.svg' },
    { x: 0.5, y: 0.6, radius: 150, imgSrc: 'janna.svg' },
  ];

  const lines = [];
  for (let i = 0; i < circlePositions.length; i++) {
    for (let j = i + 1; j < circlePositions.length; j++) {
      lines.push({
        x1: circlePositions[i].x * width,
        y1: circlePositions[i].y * height,
        x2: circlePositions[j].x * width,
        y2: circlePositions[j].y * height,
      });
    }
  }

  return (
    width && height ? (
      <svg width={width} height={height} style={{ position: 'relative', top: 0, left: 0 }}>
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
        ))}

        {circlePositions.map((pos, index) => (
          <g
            key={index}
            transform={`translate(${pos.x * width - pos.radius / 2}, ${pos.y * height - pos.radius / 2})`}
          >
            <clipPath id={`clip-${index}`}>
              <circle cx={pos.radius / 2} cy={pos.radius / 2} r={pos.radius / 2} />
            </clipPath>
            <foreignObject
              width={pos.radius}
              height={pos.radius}
              clipPath={`url(#clip-${index})`}
              className="card"
            >
              <div className="card__content">
                <div className="card__front">
                  <img src={pos.imgSrc} alt={`Image ${index}`} width="100%" height="100%" />
                </div>
                <div className="card__back flex flex-col justify-center items-center">
                  <p>{pos.imgSrc.replace('.svg', '')}</p>
                  <p>CEO</p>
                </div>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>
    ) : null
  );
};

export default StarConstellation;
