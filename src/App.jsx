import { useState,useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import {BrowserRouter as Router,Routes,Route,HashRouter,} from "react-router-dom";
import AccountContext from "./contexts/account";
import AuthContext from "./contexts/auth";
import Landing from "./pages/Landing/landing";
import Home from "./pages/Home/home";
import CreateAd from "./pages/Advert/createAd";
import Wallet from "./pages/wallets/wallet";
import Adlist from "./pages/AdvertList/adlist";
import Trades from "./pages/Trades/trades";
import Profile from "./pages/profile/profile";
import SellAd from "./pages/Advert/sellAd";
import BuyAd from "./pages/Advert/buyAd";
import SingleBuyAd from "./pages/Advert/singleBuyAd";
import SingleSellAd from "./pages/Advert/singleSellAd";
import Trade from "./pages/Trade/trade";
import Staking from "./pages/Staking/staking";
import AddPaymentMethod from "./pages/paymentMethod/addPaymentMethod";
import "./styles.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser,faFile, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
const walletAddress = localStorage.getItem("account");
const jwtToken = localStorage.getItem("authToken");
const SERVER_URL = process.env.REACT_APP_SERVER_URL||process.env.REACT_APP_SERVER_URL+"";

library.add(fab,faUser,faEnvelope, faFile);

 function App() {
   const [account,setAccount] = useState(null);
   const [token,setAuthToken] = useState("");
   
   if((jwtToken==='null' || jwtToken===null || jwtToken==='undefined') && walletAddress!=null) {
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
        if(response.data.success){
            setAuthToken(response.data.token);
            localStorage.setItem("authToken",response.data.token);
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

   useEffect(() => {
    walletAddress && setAccount(walletAddress);
    jwtToken && setAuthToken(jwtToken);
   }, []);
  return (
    <AuthContext.Provider value={[token,setAuthToken]}>
      <AccountContext.Provider value={[account,setAccount]}>
        <HashRouter>
          <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/ad/create" element={<CreateAd/>}/>
          <Route path="/method/payment" element={<Wallet/>}/>
          <Route path="/ad/list" element={<Adlist/>}/>
          <Route path="/trades" element={<Trades/>}/>
          <Route path="/ad/sell" element={<SellAd/>}/>
          <Route path="/ad/buy" element={<BuyAd/>}/>
          <Route path="/ad/buyad/:id" element={<SingleBuyAd/>}/>
          <Route path="/ad/sellad/:id" element={<SingleSellAd/>}/>
          <Route path="/trade" element={<Trade/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/staking" element={<Staking/>}/>
          <Route path = "/methods/payment/new" element={<AddPaymentMethod />}/>
          </Routes>
      </HashRouter>
      </AccountContext.Provider>
    </AuthContext.Provider>
  )
}

export default App;
