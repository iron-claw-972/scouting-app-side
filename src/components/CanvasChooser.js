import { get } from "lodash";
import React, { useEffect, useRef } from "react";
import field_image from "../img/field_image.png";

const CanvasChooser = ({setMouseCoord, getMouseCoord}) => {

    // Setup canvas element ref
    const canvasRef = useRef(null);


    useEffect(() => {
        // Setup canvas element and get context
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load field image
        const field_background = new Image();
        field_background.src = field_image;



        const draw = (event = null || getMouseCoord != null) => {
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
            } else if (getMouseCoord() != null) {
                ctx.clearRect(0, 0, 360, 180);
                ctx.drawImage(field_background, 0, 0, 360, 180);
                
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.strokeStyle = 'lime';
                ctx.arc(getMouseCoord().x, getMouseCoord().y, 8, 0, Math.PI*2);
                ctx.stroke();
            } else {
                ctx.drawImage(field_background, 0, 0, 360, 180);
            }  
        };



        /**
         * Calls draw on load without an event
         * @see{@link draw}
         */
        field_background.addEventListener('load', () => draw());

        /**
         * Calls draw when mouse is clicked and passes the event in
         * @see{@link draw}
         */
        canvas.addEventListener('mousedown', (e) => draw(e));

    }, []);

    return(
        <div>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
};

export default CanvasChooser;