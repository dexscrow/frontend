import React,{useEffect,useContext,useState} from 'react'
import {Link} from "react-router-dom";
import Sidebar from './components/sidebar'
import Header from './components/header';
import AccountContext from '../../contexts/account';

export default function Landing() {
    const [account,setAccount] = useContext(AccountContext);
    // const [errors,setErrors] = useState("");

    // setErrors(error);
    useEffect(()=>{
        if(!window.ethereum) alert("install metamask");

        window.ethereum.on("accountsChanged",()=>{
            setAccount(window.ethereum.selectedAddress);
            localStorage.setItem("account",window.ethereum.selectedAddress);
        });

    },[account]);


    return (
        <>
        <div className="container-fluid body">
        <div className="row flex-nowrap">
            {account && <Sidebar/>}
            <div className="col py-3">
                 <div className="row p-20"> 
                   <Header account={account}/>

                   <div className="col col-12 header-banner">
                     <h3>Buy & Sell Crypto in minutes with Cash but without Control</h3>
                     <h2>Join the world's hottest P2P DEX Exchange</h2>
                   </div>

                 </div>

                 <div className="row">
                    <div className="col col-12 d-flex">
                        <a href="" className="btn-dex btn-dex-default">BUY & SELL</a>  &nbsp; &nbsp; 
                        <Link to="/ad/create" className="btn-dex btn-dex-bordered">CREATE ADVERT</Link>
                    </div>
                 </div>

               
                 <div className="row home-content-b p-20">
                    <div className="col col-sm-12 col-md-4 col-xs-12 about-left mb-20">
                      <div className="row"> 
                        <div className="col col-12"> 
                            <h3>Decentralized, But With Low Fees</h3> <br/>
                            <span>This information is stored in the blockchain in encrypted form and is available only to the participant himself.</span>
                        </div>

                        <div className="col col-12 mt-30 d-flex"> 
                            <img src="/images/graph1.png" /> &nbsp;
                            <img src="/images/graph2.png" />
                        </div>
                      </div>
                    </div>

                    <div className="col col-sm-12 col-md-7 col-xs-12 about-right mb-20">
                      <div className="row">
                        <div className="col col-sm-8"> 
                            <h3>Power of P2P Without the Big Brother's Eye</h3> <br/>
                            <span>This information is stored in the blockchain in encrypted form and is available only to the participant himself.</span>
                        </div>
                        <div className="col col-sm-4 pt-30"> 
                            <img src="/images/block.png" /> 
                        </div>
                       </div>
                    </div>
                </div>



            </div>
        </div>

      </div>

      <nav className="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0" style={{background:'#ccc'}}>
        <div className="row p-0">
            <div className="col-5 col-xs-5 d-flex align-items-center align-middle p-0">

                <ul className="nav nav-pills">
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link align-middle px-0">
                            <img src="/images/buy_sell.svg"/><br/>
                             <span className="ms-1 d-none d-sm-inline">Buy/Sell</span>
                        </a>
                    </li>

                    <li className="nav-item text-center">
                        <a href="#" className="nav-link align-middle px-0">
                            <img src="/images/create.svg"/><br/>
                            <span className="ms-1 d-none d-sm-inline">Ad Management</span>
                        </a>
                    </li>

                </ul>

            </div>
            
            <div className="col-7 col-xs-7 account float-end pt-10">
                <img src="/images/avatar.png" alt="hugenerd" width="60" height="60" className="rounded-circle"/>
            </div>
        </div>
     </nav>
     </>
    )
}
