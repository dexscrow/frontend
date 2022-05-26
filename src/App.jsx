import { useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import {BrowserRouter as Router,Routes,Route,HashRouter} from "react-router-dom";
import AccountContext from "./contexts/account";
import ErrorContext from "./contexts/error";
import AuthContext from "./contexts/auth";
import Landing from "./pages/Landing/landing";
import Matches from "./pages/Matches/matches";
import BetDetails from "./pages/BetDetails/betdetail";
import Bet from "./pages/Bet/bet";
import History from "./pages/History/history";
import Home from "./pages/Home/home";
import Profile from "./pages/profile/profile";
import Staking from "./pages/Staking/staking";
import "./styles.css";
import "./responsive.css";
import "./default.css";
import "./ui-icons.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,faFile, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
const address = localStorage.getItem("account");
const jwtToken = localStorage.getItem("authToken");
const SERVER_URL = process.env.REACT_APP_SERVER_URL||process.env.REACT_APP_SERVER_URL+"";

library.add(fab,faUser,faEnvelope, faFile);

 function App() {
   const [account,setAccount] = useState(null);
   const [token,setAuthToken] = useState("");
   const [error,setError] = useState("");   

   const login = async ()=>{
    const run = async ()=>{
        try{
            const response = await axios.post(`${SERVER_URL}/auth/login`,{address});
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
            if(response.data.success){
                setAuthToken(response.data.data);
                localStorage.setItem("authToken",response.data.data);
                window.location.reload();
            }
            //setError(null)
        }catch(error){
            setAuthToken(null);
            // setError(error.message);
        }
       }
      run();
    }


   if((jwtToken==='null' || jwtToken===null || jwtToken==='undefined') && address!=null) {
     login();
   }

   useEffect(() => {
    address && setAccount(address);
    jwtToken && setAuthToken(jwtToken);

    window.ethereum && window.ethereum.on("accountsChanged",()=>{
        setAccount(window.ethereum.selectedAddress);
        localStorage.setItem("account",window.ethereum.selectedAddress);
        login();
    });

   }, []);
   
  return (
     <AuthContext.Provider value={[token,setAuthToken]}>
      <AccountContext.Provider value={[account,setAccount]}>
	  <ErrorContext.Provider value={[error,setError]}>
        <HashRouter>
          <Routes>
          <Route path="/" element={<Landing/>} />
		  <Route path="/matches" element={<Matches/>} />
		  <Route path="/details" element={<BetDetails/>} />
          <Route path="/profile" element={<Profile/>} />
		  <Route path="/history" element={<History/>} />
          <Route path="/bet/:matchId/:teamId" element={<Bet/>} />
          <Route path="/staking" element={<Staking/>} />
          </Routes>
      </HashRouter>
	  </ErrorContext.Provider >
      </AccountContext.Provider>
     </AuthContext.Provider>
  )
}

export default App;
