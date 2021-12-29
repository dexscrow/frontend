import {useState,useEffect} from "react";
import axios from "axios";


const useMutation = (url,body,auth,handler)=>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        const run = async()=>{
            try{
                const {data:res} = await axios.post(url,{...body},{
                    headers:{
                        "authorization":`Bearer ${auth}`
                    }
                });
                if(res.error){
                    setIsLoading(false);
                    setError(res.error)
                }
                if(!res.status){
                    setIsLoading(false);
                    setError(res.message)
                }
                setIsLoading(false);
                handler(res.status)
            }catch(error){
                setIsLoading(false);
                setError(error.message)
            }
            
        }
    })
}