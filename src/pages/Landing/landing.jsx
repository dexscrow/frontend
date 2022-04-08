import React,{useEffect,useContext,useState} from 'react'
import {Link} from "react-router-dom";
import Sidebar from './components/sidebar'
import Header from './components/header';
import Nav from "./components/nav";
import NavSocial from "./components/navsocial";
import AccountContext from '../../contexts/account';

export default function Landing() {
    const [account,setAccount] = useContext(AccountContext);
    // const [errors,setErrors] = useState("");

    // setErrors(error);
    useEffect(()=>{
      window.ethereum && window.ethereum.on("accountsChanged",()=>{
            setAccount(window.ethereum.selectedAddress);
            localStorage.setItem("account",window.ethereum.selectedAddress);
            window.location.reload();
        });
        window.BinanceChain && window.BinanceChain.on('accountsChanged',async()=>{
          const account = await window.BinanceChain.request({method:"eth_accounts"});
          setAccount(account);
          localStorage.setItem("account",account);
          window.location.reload();
        });
        
    },[account]);


    return (
        <>
		<Sidebar account={account}/>
		 <div className="offcanvas-overly"></div>
		 
		  <div className="main-content">
		  
			<Header account={account}/>
			 <main>
			
                <div className="banner-bg">
                    <div className="banner-area">
                        <div className="container" style={{paddingLeft:'0px'}}>
                            <div className="row">
                                <div className="col-lg-7 col-md-9" style={{paddingLeft:'0px'}}>
                                    <div className="banner-content">
                                        <h2 className="title">Buy & Sell <br /> <span>Crypto</span> in minutes with Cash but without Control</h2>
                                        <p>Join the world’s hottest P2P DEX Exchange</p>
                                        <Link to="/ad/sell" className="banner-btn">P2P<i className="fi-sr-arrow-right"></i></Link> &nbsp;&nbsp; 
										<Link to="/staking" className="banner-btn">Staking<i className="fi-sr-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
				 
		
                <section className="sell-nfts-area mb-50">
                    <div className="container">
					
					 <div className="row justify-content-center">
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
							 <h3>BTCB</h3> 
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
							  <h3>BNB</h3> 
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
							 <h3> BUSD</h3> 
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
							 <h3>USDT</h3> 
							</div>
						</div>
					</div>
								
								
                        <div className="row mt-40">
                            <div className="col-lg-12">
                                <div className="section-title mb-20">
                                    <h2 className="title"> How Dexscrow Works<img src="" alt="" /></h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="sell-nfts-item">
                                    <img src="" alt="" className="icon" />
                                    <span className="step-count">Step 1</span>
                                    <h5 className="title">Connect Wallet</h5>
                                    <p>Connect your wallet using Metamask or Binance Smart Chain wallet</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="sell-nfts-item">
                                    <img src="" alt="" className="icon" />
                                    <span className="step-count">Step 2</span>
                                    <h5 className="title">Search or Create Ad</h5>
                                    <p>Go to P2P section to find an Ad, specify amount you want to trade.</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="sell-nfts-item">
                                    <img src="" alt="" className="icon" />
                                    <span className="step-count">Step 3</span>
                                    <h5 className="title">Open a Trade</h5>
                                    <p>Click Buy/Sell button to see more information about the offer and trade partner</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <div className="sell-nfts-item">
                                    <img src="" alt="" className="icon" />
                                    <span className="step-count">Step 4</span>
                                    <h5 className="title">Complete Trade</h5>
                                    <p>After opening a trade, follow onscreen instructions to complete it</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               
			   
			   {/*<section className="explore-products-area pt-0 mt-0">
                <div className="container">
				<div className="row home-content-b p-20 pt-0 mt-0">
			  	  <div className="col-sm-12 col-md-4 col-xs-12 about-left mb-20 ml-20 mr-10">
                      <div className="row"> 
                        <div className="col col-12"> 
                            <h3>Decentralized, But With Low Fees</h3><br/>
                            <p>Trading on Dexscrow will function through the use of a trusted escrow smart contract, reducing control and enhancing decentralization, security and privacy. </p>
                            <p>Trading comes with risks, but traders should not face any other risks than those they are willing to take. This innovative idea will come to traders at a very low fees as Dexscrow aims for global crypto inclusion.</p>
                        </div>

                        <div className="col col-12 mt-30 d-flex"> 
                            <img src="/images/graph1.png" /> &nbsp;
                            <img src="/images/graph2.png" />
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-7 col-xs-12 about-right mb-20">
                      <div className="row">
                        <div className="col col-12 col-sm-8 col-xs-12"> 
                            <h3>The Power of Dexscrow P2P Exchange</h3> <br/>
                            <p>
                            <b>Fiat Option:</b> Most decentralized platforms do not provide fiat payments. Dexscrow's primary responsibility it to make sure users/traders can seamlessly convert their assets to fiat and vice-versa with little or no interference or control 
                            </p>
                            <p>
                            <b>Trustless:</b> Dexscrow will allow traders to remain custodian of their assets. Users assets and data are safe 
                            </p>
                            <p>
                            <b>Security:</b> Privacy and security are well preserved
                            </p>
                        </div>
                        <div className="col col-12 col-sm-4 col-xs-12 pt-30"> 
                            <img src="/images/block.png" /> 
                        </div>
                       </div>
                    </div>
                </div>
			   </div>
			   </section>	*/}
				
			 </main>
		   <Nav/>
         </div>
     </>
    )
}
