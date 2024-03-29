import React, { useEffect, useState } from 'react';
import "../styles/timer.scss"

const Timer = () => {
    const [number, setNumber] = useState(0);
    const [start, setStart] = useState(false);
    const clock = (number) => {
        let s = number%60;
        let m = Math.floor((number/60)%60);
        let h = Math.floor(number/(60*60));
        return `${h ? (h < 10 ? `${"0" + h}` : h) : "00"}.${(m ? (m < 10 ? `${"0" + m}` : m) : "00")}.${s ? (s < 10 ? `${"0" + s}` : s) : "00"}`
    }
    const next = (e) => {
        if(e.which === 13){
            if(number <= 0){
                setStart(false)
            }else{
                setStart(true)
            }
        }
    }
    useEffect(() => {
        if(!start){
            clearInterval()
        }else{
            if (number === 0){
                window.alert("Time Up!");
                setStart(false)
                return;
            }
            var timer = setInterval(() => {
                setNumber(number-1)
            },1000)
            return() => {
                clearInterval(timer)
            }
        }
    })
    return (
        <div className='Timer'>
            <h3 style={{fontSize: "4em", color: 'white', userSelect: "none", margin: "0px"}}>{clock(number)}</h3>
            <input type="number" min="0" max="9" value={number === "" ? 0 : number} 
                onChange={(e) => setNumber(e.target.value)}
                onKeyDown={(e) => next(e)}
                style={{display: start ? "none" : "inline-block"}}
            />
            <span>1d = 24h = 1.440m = 86.400s </span>
            <span>1h = 60m = 3.600s</span>
        </div>
    );
};

export default Timer;