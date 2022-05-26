import {useState} from "react";
import Steps from "./steps";
import Process from "./process";


export default function HowTo(){
    const [step,setStep] = useState(1);
    return (
        <> 
        <div className="row mt-30 howto">
            <Steps setStep={setStep}/>
            <Process step={step}/>
        </div>
        </>
    )
}