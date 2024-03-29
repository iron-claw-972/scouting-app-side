import React, { useEffect, useRef } from "react";
import field_image from "./field_image.png";


const CanvasDisplay = ({ data }) => {
  // Setup ref for canvas
  const canvasRef = useRef(null);


  useEffect(() => {
    console.log("load again?");
    // Setup canvas element and get context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load field image
    const field_background = new Image();
    field_background.src = field_image;

    /**
     * Draws points on field on canvas
     * @param {Array} points
     * Takes in an array of objects. Example:
     * ```javascript
     * [{x: 3, y: 100}, {x: 50, y: 40}];
     * ```
     */

    const draw = (points) => {
      ctx.drawImage(field_background, 0, 0, 360, 180);
      points.forEach((point) => drawPoint(point));
    };

    /**
     * Draws a point on field from coordinates
     * @param {object} coordinates
     * Example:
     * ```javascript
     * drawPoint({x: 3, y: 100});
     * ```
     */

    const drawPoint = (coordinates) => {
      let xCoord = coordinates.x;
      let yCoord = coordinates.y;

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(xCoord, yCoord, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    /**
     * Calls draw on image load
     * @see{@link draw}
     */
    field_background.addEventListener("load", () => {
      // console.log(data);
      draw(data);
    });
  });

  return (
    <div>
      <canvas height="180" width="360" ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasDisplay;
