import React, { useState, useEffect, useRef } from "react";
import field_image from "./img/field_image.png";

const CanvasChooser = () => {

    const canvasRef = useRef(null);
    // const field_image = useRef(null);
    const [mousePos, setMousePos] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const field_background = new Image();
        field_background.src = field_image;

        const draw = (event=null) => {
            if (event != null) {
                let rect = canvas.getBoundingClientRect();
                let x = event.clientX - rect.left;
                let y = event.clientY - rect.top;
        
                ctx.clearRect(0, 0, 360, 180);
                ctx.drawImage(field_background, 0, 0, 360, 180);
        
                ctx.beginPath();
                ctx.strokeStyle = 'orange';
                ctx.arc(x, y, 8, 0, Math.PI*2);
                ctx.stroke();
                console.log("Coordinate x: " + Math.round(x), "Coordinate y: " + Math.round(y));

                setMousePos([x,y]);
        
            } else {
                ctx.drawImage(field_background, 0, 0, 360, 180);
            }
            
        };
        

        window.addEventListener('mousedown', (e) => draw(e));

        // ctx.beginPath();
        // ctx.strokeStyle = 'orange';
        // ctx.arc(20, 30, 8, 0, Math.PI*2);
        // ctx.stroke();

    });

    return(
        <div>
            <canvas ref={canvasRef} width="360" height="180"></canvas>
        </div>
    )
}

export default CanvasChooser;

// <img ref={field_image} src={field_image_path} alt="img not loaded" style={{display: "none"}}></img>
