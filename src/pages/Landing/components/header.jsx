import React from 'react';
import { trimText } from '../../../helpers/utils';
import useLogin from '../../../hooks/useLogin';
import {Link,} from "react-router-dom";
import Logo from "../../../assets/logo-long.png";
import {useWallet} from "use-wallet";
const authToken = localStorage.getItem("authToken")

export default function Header({account}) {
<<<<<<< HEAD
  const {connect,reset,account} = useWallet();
      useLogin(account,authToken)

      const setMetmaskConnection = (e)=>{
        e.preventDefault();
        connect();
        localStorage.setItem("account",account);
        localStorage.setItem("wallet","metamask");

      }

      const setBinanceWalletConnection = (e)=>{
        e.preventDefault();
        connect("bsc");
        localStorage.setItem("account",account);
        localStorage.setItem("wallet","binance");
      }
=======
    //  useEffect(()=>{
    //  },[account])
>>>>>>> 3f611177b6fe0201e52cbdf6709e3586e864c3a4
   
    return (
        <>
          <div className="modal fade" id="walletConnectModal" tabIndex="-1" aria-labelledby="walletConnectModal" aria-hidden="true">
    <div className="modal-dialog modal-sm">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Select Wallet</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          
            <div className="row form-row">
<<<<<<< HEAD
             <div className="col-xs-12 col-sm-12 text-center pb-10 btn" style={{borderBottom: "1px solid #f4f4f4"}} onClick={setBinanceWalletConnection}>
             <img src="/images/binancechain.png" style={{width:"100px", height:"auto" }}/> <br/> 
             <h5> Binance Chain</h5>
             <span className="label">Connect your binance chain wallet</span>
            </div>
            <div className="col-xs-12 col-sm-12 text-center mt-20 btn" onClick={e=>setMetmaskConnection}>
=======
            <div className="col-xs-12 col-sm-12 text-center mt-20 btn" onClick={e=>setMetamaskConnection()}>
>>>>>>> 3f611177b6fe0201e52cbdf6709e3586e864c3a4
             <img src="/images/metamask.svg" style={{width:"100px", height:"auto" }}/> <br/> 
             <h5> MetaMask</h5>
             <span className="label">Connect your metamask wallet</span>
            </div>
           </div>

         </div>
        </div>
      </div>
    </div>
        <div className="col col-12 header">
                     <div className="row">
                      <div className="col-5 col-xs-5">
                       <div className="logo">  <Link to="/"> <img src={Logo} /> </Link> </div>
                      </div>
                      <div className="col-7 col-xs-7 text-end">
                          {!account?
                          <>
                          <div className="col col-12">
                          <button className="btn-connect" data-bs-toggle="modal" data-bs-target="#walletConnectModal"><img src="/images/wallet.png"/> &nbsp; Connect Wallet</button> 
                       </div>
                       
                       <div className="col col-12 mt-10">
                       <span className="text-dark">Make sure that <br/>Binance Smart Chain is selected</span>
                      </div>
                      </>
                       :
                       <div className="col col-12">
                         <button className="btn-connect" onClick={e=>reset()}><img src="/images/wallet.png"/> 
                          &nbsp; Disconnect Wallet <br/><small>{trimText(account)}</small>
                         </button> 
                        </div>
                        }
                      </div>
                     </div>
                   </div>

        </>
    )
}
