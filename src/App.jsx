import { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {useWalletProvider} from "use-wallet";
import bsc from "@binance-chain/bsc-use-wallet";
import AccountContext from "./contexts/account";
import AuthContext from "./contexts/auth";
import Landing from "./pages/Landing/landing";
import CreateAd from "./pages/Advert/createAd";
import Wallet from "./pages/wallets/wallet";
import Adlist from "./pages/AdvertList/adlist";
import Trades from "./pages/Trades/trades";
import Profile from "./pages/profile/profile";
import SellAd from "./pages/Advert/sellAd";
import BuyAd from "./pages/Advert/buyAd";
import Trade from "./pages/Trade/trade";
import AddPaymentMethod from "./pages/paymentMethod/addPaymentMethod";
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
    <useWalletProvider connectors={{bsc}}>
    <AuthContext.Provider value={[token,setAuthToken]}>
      <AccountContext.Provider value={[account,setAccount]}>
        <Router>
          <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/ad/create" element={<CreateAd/>}/>
          <Route path="/method/payment" element={<Wallet/>}/>
          <Route path="/ad/list" element={<Adlist/>}/>
          <Route path="/trades" element={<Trades/>}/>
          <Route path="/ad/sell" element={<SellAd/>}/>
          <Route path="/ad/buy" element={<BuyAd/>}/>
          <Route path="/trade" element={<Trade/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path = "/methods/payment/new" element={<AddPaymentMethod />}/>
          </Routes>
      </Router>
      </AccountContext.Provider>
    </AuthContext.Provider>
    </useWalletProvider>
  )
}

export default App;
