import {useState,useEffect} from "react";
import axios from "axios";

 const useFetch = (url,auth,handler)=>{
    const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const run = async ()=>{
            try{
            const {data} = await axios.get(url,{
                    headers:{
                        "authorization":`Bearer ${auth}`
                    }
                });
                setIsLoading(false);
                handler(data.data);
            }catch(error){
                setError(error.message)
            }
        }
        run();
    },[url,auth]);
    return {isLoading,error}
}

export default useFetch;