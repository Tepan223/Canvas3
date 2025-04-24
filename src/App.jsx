import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [triangle, setTriangle] = useState({
    x: 200,
    y: 200,
    baseLength: 50,
    height: 100,
  });
  const [showTriangle, setShowTriangle] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;
    canvas.style.backgroundColor = '#F5EEDD';

    const drawTriangleShape = () => {
      ctx.fillStyle = '#36454F';
      ctx.beginPath();
      ctx.moveTo(triangle.x, triangle.y);
      ctx.lineTo(
        triangle.x + triangle.baseLength / 2,
        triangle.y + triangle.height
      );
      ctx.lineTo(
        triangle.x - triangle.baseLength / 2,
        triangle.y + triangle.height
      );
      ctx.closePath();
      ctx.fill();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (showTriangle) {
      drawTriangleShape();
    }

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (
        mouseX > triangle.x - triangle.baseLength / 2 &&
        mouseX < triangle.x + triangle.baseLength / 2 &&
        mouseY > triangle.y &&
        mouseY < triangle.y + triangle.height
      ) {
        setIsMouseDown(true);
        setOffset({
          x: mouseX - triangle.x,
          y: mouseY - triangle.y,
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTriangle({
        ...triangle,
        x: mouseX - offset.x,
        y: mouseY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, triangle, offset, showTriangle]);

  const handleShowTriangle = () => {
    setShowTriangle(true);
  };

  const handleResetPosition = () => {
    setTriangle({ ...triangle, x: 200, y: 200 });
  };

  const handleRemoveTriangle = () => {
    setShowTriangle(false);
  };

  return (
    <div className="App">
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="canvas-buttons">
        <button onClick={handleShowTriangle} className='green'>Show Triangle</button>
        <button onClick={handleResetPosition} className='blue'>Reset Triangle</button>
        <button onClick={handleRemoveTriangle} className='rm'>Remove Triangle</button>
      </div>
    </div>
  </div>
  );
}

export default App;
