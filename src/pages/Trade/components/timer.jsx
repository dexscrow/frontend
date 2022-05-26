import {useEffect}  from "react";
import useCountDown from "./useCountDown";

const A_MINUTE = 1000 * 60;
const A_SECOND = 1000;
const AN_HOUR = 1000 * 60 * 60;

export default function Timer({time,handler}){
    const endTime = (new Date().getTime() + (A_MINUTE * Number(time)));
    const [timeLeft,setEndTime] = useCountDown(endTime);
    useEffect(()=>{
        if(timeLeft === 0){
            handler();
        }
    })

    

    const minutes = Math.floor(timeLeft / A_MINUTE) % 60;
    const seconds = Math.floor(timeLeft / A_SECOND) % 60;
    const hour = Math.floor(timeLeft /AN_HOUR) % 60;
    return (
        <>
        <h5 className="value text-success">PAYMENT TO BE MADE {hour}:{minutes}:{seconds} </h5>
        </>
    )
}