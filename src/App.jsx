import { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AccountContext from "./contexts/account";
import AuthContext from "./contexts/auth";
import Landing from "./pages/Landing/landing";
import CreateAd from "./pages/Advert/createAd";
import "./styles.css";

 function App() {
   const [account,setAccount] = useState(null);
   const [token,setAuthToken] = useState("");
   
   useEffect(() => {
    const data = localStorage.getItem("account");
    const jwtToken = localStorage.getItem("authToken");
     data && setAccount(data);
     jwtToken && setAuthToken(jwtToken);
   }, []);
  return (
    <AuthContext.Provider value={[token,setAuthToken]}>
      <AccountContext.Provider value={[account,setAccount]}>
        <Router>
          <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/ad/create" element={<CreateAd/>}/>
          </Routes>
      </Router>
      </AccountContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
