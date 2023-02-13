import React, { useState, useEffect, useRef } from "react";
import field_image from "../img/field_image.png";

const CanvasChooser = ({setMouseCoord, getMouseCoord}) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const field_background = new Image();
        
        field_background.src = field_image;

        const draw = (event = null) => {
            if (event != null) {
                let rect = canvas.getBoundingClientRect();
                let xCoord = event.clientX - rect.left;
                let yCoord = event.clientY - rect.top;
        
                ctx.clearRect(0, 0, 360, 180);
                ctx.drawImage(field_background, 0, 0, 360, 180);
                
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.strokeStyle = 'lime';
                ctx.arc(xCoord, yCoord, 8, 0, Math.PI*2);
                ctx.stroke();
                setMouseCoord({x: xCoord, y: yCoord});
                // console.log("Coordinate x: " + Math.round(xCoord), "Coordinate y: " + Math.round(yCoord); // For debugging
            } else {
                ctx.drawImage(field_background, 0, 0, 360, 180);  
            }  
        };

        field_background.addEventListener('load', () => draw());
        canvas.addEventListener('mousedown', (e) => draw(e));
    }, []);

    return(
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};

export default CanvasChooser;