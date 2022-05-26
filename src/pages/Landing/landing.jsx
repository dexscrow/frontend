import React,{useEffect,useContext,useState,useCallback} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Sidebar from '../components/sidebar'
import Header from '../components/header';
import Nav from "../components/nav";
import NavSocial from "../components/navsocial";
import Hero from "./components/hero";
import HowTo from "./components/howto";
import Features from "./components/features";
import Know from "./components/know";
import RoadMap from "./components/roadmap";
import Tokenomics from "./components/tokenomics";
import Faq from "./components/faq";

import AccountContext from '../../contexts/account';
const token = localStorage.getItem("authToken");

const ASSETS_URL= process.env.REACT_APP_SERVER_URL+"/assets";

export default function Landing() {
    const [account,setAccount] = useContext(AccountContext);
    const [assets,setAssets] = useState([]);

    const fetchAssets = useCallback(async() => {
        try{
          const {data:response} = await axios.get(ASSETS_URL,{
              headers:{
                  "Authorization":`Bearer ${token}`
              }
          });
          if(response.error){
          }
         
          if(!response.success){
          }else{
           setAssets(response.data);
          }
      }catch(err){
      }
    });
  

    // setErrors(error);
    useEffect(async()=>{
        await fetchAssets();
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
                                        <h2 className="title">Decentralized Sport <br /> <span>Betting </span>With Proof of Stake</h2>
                                        <p className="text-white">Fastest way to place bet on biggest matches in NBA, Soccer, UFC. Stake on your favorite team to win some beans</p>
                                        <Link to="/matches" className="banner-btn">Place Bet<i className="fi-sr-arrow-right"></i></Link> &nbsp;&nbsp; 
										<Link to="/staking" className="banner-btn">Earn Crypto<i className="fi-sr-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
				 
				<Hero/>
				<Know/>
				<HowTo/>
				<Features/>
				<RoadMap/>
				<Tokenomics/>
				<Faq/>
					
				 
		
                <section className="sell-nfts-area mb-50">
                    <div className="container">
                    { 
                       (assets.length>0)?
					  <div className="row justify-content-center">
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
							<h3>{assets[0].symbol}</h3>
                              <span>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(assets[0].rateToDollar["$numberDecimal"])}</span>
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
                              <h3>{assets[1].symbol}</h3>
                              <span>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(assets[1].rateToDollar["$numberDecimal"])}</span>
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
                            <h3>{assets[2].symbol}</h3>
                              <span>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(assets[2].rateToDollar["$numberDecimal"])}</span>
							</div>
						</div>
						<div className="col-xl-3 col-lg-4 col-sm-6">
							<div className="top-seller-item text-center">
                            <h3>{assets[3].symbol}</h3>
                              <span>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(assets[3].rateToDollar["$numberDecimal"])}</span>
							</div>
						</div>
					  </div>:""

                      }
								
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
