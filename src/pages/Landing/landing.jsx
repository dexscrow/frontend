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
        <div className="container-fluid body">
        <div className="row flex-nowrap">
            <Sidebar account={account}/>
            <div className="col py-3 main">
                 <div className="row p-20"> 
                   <Header account={account}/>

                   <div className="col col-12 header-banner mt-20 mb-20">
                     <h3>Buy & Sell Crypto in minutes with Cash but without Control</h3>
                     <h2>Join the world’s hottest P2P DEX Exchange</h2>
                   </div>

                 </div>

                 <div className="row">
                    <div className="col col-12 d-flex header-button">
                        <Link to="/ad/sell" className="btn-dex btn-dex-default">P2P Trade</Link>  &nbsp; &nbsp; 
                        <Link to="/staking" className="btn-dex btn-dex-bordered" style={{color:'#FFF', border:'1px solid #FFF', background:'#2094E5'}} >Staking</Link>
                    </div>
                 </div>

               
                 <div className="row home-content-b p-20">
                    <div className="col col-12 col-sm-12 col-md-4 col-xs-12 about-left mb-20">
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

                    <div className="col col-12 col-sm-12 col-md-7 col-xs-12 about-right mb-20">
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
                <NavSocial/>
            </div>
           
        </div>

      </div>

      <Nav/>
     </>
    )
}
