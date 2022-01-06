import { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AccountContext from "./contexts/account";
import AuthContext from "./contexts/auth";
import Landing from "./pages/Landing/landing";
import CreateAd from "./pages/Advert/createAd";
import Wallet from "./pages/wallets/wallet";
import Adlist from "./pages/AdvertList/adlist";
import Trades from "./pages/Trades/trades";
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
          <Route path="/wallet" element={<Wallet/>}/>
          <Route path="/ad/list" element={<Adlist/>}/>
          <Route path="/trades" element={<Trades/>}/>
          </Routes>
      </Router>
      </AccountContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
