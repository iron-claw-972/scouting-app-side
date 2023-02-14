import React, { useState, useEffect, useRef } from "react";
import field_image from "../img/field_image.png";

const CanvasDisplay = ({data}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const field_background = new Image();
        
        field_background.src = field_image;

        const sample_data = [{x:3, y:100}, {x:20, y:40}];

        const draw = () => {

            for (let coords of data) {

            }
            let rect = canvas.getBoundingClientRect();
            // let xCoord = data.mousePos.clientX - rect.left;
            // let yCoord = data.mousePos.clientY - rect.top;
    
            // ctx.clearRect(0, 0, 360, 180);
            ctx.drawImage(field_background, 0, 0, 360, 180);
            
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.arc(10, 30, 5, 0, Math.PI*2);
            ctx.fill();
            
            // console.log("Coordinate x: " + Math.round(xCoord), "Coordinate y: " + Math.round(yCoord); // For debugging  
        };

        field_background.addEventListener('load', () => draw());
        // canvas.addEventListener('mousedown', (e) => draw(e));

    }, []);

    return(
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default CanvasDisplay;