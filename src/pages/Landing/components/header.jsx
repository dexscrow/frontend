import React from 'react';
import { trimText } from '../../../helpers/utils';
import useLogin from '../../../hooks/useLogin';
import {Link,Navigate,useNavigate} from "react-router-dom";
import Logo from "../../../assets/logo-long.png";
import { setMetamaskConnection,setBinanceWalletConnection,disconnectWallet} from '../../../helpers/scrow';
const authToken = localStorage.getItem("authToken")

export default function Header({account}) {
    //  useEffect(()=>{
    //  },[account])
   
    return (
        <>
		
		  <div className="modal fade" id="walletConnectModal" tabIndex="-1" aria-labelledby="walletConnectModal" aria-hidden="true">
			<div className="modal-dialog modal-sm">
			  <div className="modal-content">
				<div className="modal-header">
				  <h5 className="modal-title" id="exampleModalLabel">Select Wallet Provider</h5>
				  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
				  
					<div className="row form-row p-20">
					<div className="col-xs-12 col-sm-12 text-center mt-20 btn" onClick={e=>setMetamaskConnection()}>
					 <img src="/images/metamask.svg" style={{width:"100px", height:"auto" }}/> <br/> 
					 <h5> MetaMask</h5>
					 <span className="label">Connect your metamask wallet <br/> on Binance Chain Network</span>
					</div>

				   </div>

				 </div>
				</div>
			  </div>
			</div>
			
	
	    <header>
		  <div className="menu-area">
			<div className="container">
				<div className="row">
					<div className="col-12 p-10">
						<div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
						<div className="menu-wrap">
							<nav className="menu-nav pt-10 pb-10">
								<div className="logo float-start"> 
								 <Link to="/">
								  <img src={Logo} alt="" />
								 </Link>
								</div>
								
								
								<div className="header-action float-end">
									<ul className="">
									 {!account?
                                      <>
										<li className="header-btn"><a href="#" className="btn" data-bs-toggle="modal" data-bs-target="#walletConnectModal">Wallet Connect</a></li>
									   </>
                                      :
									  <li className="header-btn"><a href="#" className="btn" onClick={e => disconnectWallet()} style={{fontSize:'10px'}}>Disconnect Wallet <br/><small>{trimText(account)}</small></a></li>
									  }
									  
									</ul>
								</div>
							</nav>
						</div>

					</div>
				</div>
			   </div>
		    </div>
          </header>
        </>
    )
}
