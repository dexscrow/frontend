import {useState,useEffect} from "react";

const calcTimeLeft = (time)=>{
    if(!time) return 0;

    const remainingTime = time - new Date().getTime();
    if(remainingTime <0) return 0;
    return remainingTime;
}

export default function useCountDown(endTime){
    const [end,setEndTime ]= useState(endTime);
    const [timeLeft,setTimeLeft] = useState(()=>calcTimeLeft(end));

    useEffect(()=>{
        setTimeLeft(calcTimeLeft(end));

        const timer = setInterval(()=>{
            const targetLeft = calcTimeLeft(end);
            setTimeLeft(targetLeft);

            if(targetLeft === 0){
                clearInterval(timer)
            }
        },1000);

        return ()=> clearInterval(timer);
    },[end])

    return [timeLeft,setEndTime];
}