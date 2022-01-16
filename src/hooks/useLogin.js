import {useEffect,useContext} from "react";
import axios from "axios";
import AuthContext from "../contexts/auth";
require("dotenv").config();


const SERVER_URL = process.env.REACT_APP_SERVER_URL||process.env.REACT_APP_SERVER_URL+"";

const useLogin = (walletAddress,prevToken)=>{
    const [_,setAuthToken] = useContext(AuthContext);

    useEffect(()=>{
        if(prevToken!==null) {
            setAuthToken(prevToken);
            localStorage.setItem("authToken",prevToken);
            // setError(null);
        }{
        const run = async ()=>{
            try{
                const response = await axios.post(`${SERVER_URL}/auth/login`,{walletAddress});
                if(response.data.error){
                    setAuthToken(null);
                    localStorage.setItem("authToken",null);
                    // setError(response.error);
                }
                if(!response.data.success){
                    setAuthToken(null);
                    localStorage.setItem("authToken",null);
                    // setError(response.message);
                }
                setAuthToken(response.data.token);
                localStorage.setItem("authToken",response.data.token);
              
                //setError(null)
                
            }catch(error){
                setAuthToken(null);
                // setError(error.message);
            }
        }
        run();
      }
    },[walletAddress,prevToken]);
}

export default useLogin;