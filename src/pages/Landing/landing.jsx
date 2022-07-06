import React,{useEffect,useContext,useState,useCallback} from 'react';
import Particles from "react-tsparticles";
import { engine as Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Bridge from "../../assets/bridge.png";
import Timeline from  "../../assets/timelinered.png";
import Illustration from  "../../assets/illustration.png";
import { PieChart } from 'react-minimal-pie-chart';
import {Link} from "react-router-dom";
import axios from "axios";
//import Sidebar from './components/sidebar'
import HomeHeader from './components/homeheader';
import Nav from "./components/nav";
//import NavSocial from "./components/navsocial";
import AccountContext from '../../contexts/account';
const token = localStorage.getItem("authToken");

const ASSETS_URL= process.env.REACT_APP_SERVER_URL+"/assets";

const defaultLabelStyle = {
    fontSize: '3px',
    fontFamily: 'sans-serif',
    fill:'#FFF'
  };

const options = {
    "fullScreen": {
        "enable": true,
    },
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 600
            }
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": false,
                "mode": "bubble"
            },
            "onclick": {
                "enable": false,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 250,
                "size": 0,
                "duration": 2,
                "opacity": 0,
                "speed": 3
            },
            "repulse": {
                "distance": 400,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true,
    "background": {
        "position": "50% 50%",
        "repeat": "no-repeat",
        "size": "20%"
    }
 };

export default function Landing() {
    const [account,setAccount] = useContext(AccountContext);
    const [assets,setAssets] = useState([]);

    const customInit = useCallback(async (engine) => {
        // this adds the bundle to tsParticles
        await loadFull(engine);
    });
  
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
		{/*<Sidebar account={account}/>*/ }
		 <div className="offcanvas-overly"></div>

         <Particles options={options} init={customInit} />   

		   <div style={{margin:"0px", padding:"0px;"}}>
            
			 <main style={{margin:"0px", paddingLeft:"0px;", position:"relative"}}>
              
               <HomeHeader account={account}/>
			
                 <section className="sell-nfts-area" style={{marginTop:"-180px", minHeight:"600px", backgroundImage: "url('images/space10.jpg')", backgroundSize:"cover", backgroundPosition:"top center", backgroundRepeat:"no-repeat"}}>
                        <div className="container" style={{paddingTop:"200px"}}>
                            <div className="row section-padding">
                                <div className="col-lg-7 col-md-7 col-xs-12">
                                    <div className="banner-content">
                                        <h2 className="title">Buy & Sell <br /> <span>Crypto</span> in minutes with Cash but without Control</h2>
                                        <p>Join the world’s hottest P2P DEX Exchange</p>
                                        <Link to="/ad/sell" className="banner-btn">P2P<i className="fi-sr-arrow-right"></i></Link> &nbsp;&nbsp; 
										<Link to="/staking" className="banner-btn">Staking<i className="fi-sr-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-xs-12 d-none d-sm-block" style={{paddingLeft:'0px'}}>
                                   <img src={Illustration} alt="blockchain" style={{width:"65%", height:"auto"}}/> 
                                </div>
                            </div>
                        </div>
                 </section>
				 
        
         <section className="sell-nfts-area">
            <div className="container">
            <div className="row section-padding">
                <div className="col-md-6 wow fadeInUp d-flex justify-content-center" data-wow-duration="1.5s">
                   <div className="blockcain-top-content mt-40">
                        {/* <h2 className="column-title">For Everyone,<br />Everywhere </h2> */ }
                        <small className="xs-section-title text-white">About Scrowed</small>
                        <h3>Decentralized Trading For Everyone</h3>
                        <p className="text-justify">
                        Scrowed is a secured, fast and easy to use decentralized cryptocurrency trading platform. Anyone can trade BEP-20 tokens directly from their web3 wallet to fiat currencies and vice versa. Scrowed doesn't require all the complex registration process like other exchanges out there. 
                                             
                        </p>
                        <p>
                         <Link to="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true" className="btn btn-primary">Whitepaper</Link>
                        </p>

                      </div>
                </div>
                <div className="col-md-6 wow fadeInUp" data-wow-duration="2s">
                    <div className="row mt-40">
                    <div className="col-6 col-sm-6">
                        <div className="features text-center">
                        <img src="images/blockchain.png" alt="blockchain"/> 
                        <h3>Decentralized</h3>
                        </div>						   
                    </div>
                    <div className="col-6 col-sm-6">	
                        <div className="features text-center">
                        <img src="images/peer.png" alt="peer"/> 
                        <h3>Peer-2-Peer</h3>
                        </div>	
                    </div>
                    <div className="col-6 col-sm-6">	
                        <div className="features text-center">
                        <img src="images/custodial.png" alt="limitless" /> 
                        <h3>Non Custodial</h3>
                        </div>	
                    </div>
                    <div className="col-6 col-sm-6">	
                      <div className="features text-center">
                        <img src="images/protection.png" alt="protection"/> 
                        <h3>Secured</h3>
                       </div>	
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <section className="sell-nfts-area mb-50 mt-20 bg-secondary" style={{minHeight:"700px", background:"url('images/space4.jpg?v=3')", backgroundPosition:"cover", backgroundRepeat:"no-repeat"}}>
                <div className="container" style={{background:"transparent"}}>
                  <div className="row section-padding" style={{background:"transparent"}}>
                    <div className="col-12 col-xs-8 col-sm-6 offset-sm-3 offset-xs-2 p-0 text-center" style={{marginTop:"50px"}}>
                            <small className="xs-section-title text-white">Features</small>
                            <h3>Amazing Scrowed Features</h3>
                            <Link to="features"></Link>
                            <p className="text-white"> Gain full access without ever giving your private key. We will never ask you for the seed phrase. </p>
                    </div>
                    
                    <div className="col-12 col-xs-12 col-sm-8 offset-sm-2 p-20 text-center features-section"> 
                            <div className="row">
                            <div className="col-6 col-sm-3 col-xs-6">
                                <div className="features text-center">
                                <img src="images/easy.png" alt="blockchain"/> 
                                <h3>Easy</h3>
                                </div>						   
                            </div>
                            <div className="col-6 col-sm-3 col-xs-6">	
                                <div className="features text-center">
                                <img src="images/fast.png" alt="fast"/> 
                                <h3>Fast</h3>
                                </div>	
                            </div>
                            <div className="col-6 col-sm-3 col-xs-6">	
                                <div className="features text-center">
                                <img src="images/protection.png" alt="protection" /> 
                                <h3>Secured</h3>
                                </div>	
                            </div>
                            <div className="col-6 col-sm-3 col-xs-6">	
                                <div className="features text-center">
                                <img src="images/transparent.png" alt="transparent"/> 
                                <h3>Transparent</h3>
                                </div>	
                            </div>
                            </div>
                            </div>          
                        </div>
                </div>
            </section>
					

            <section className="sell-nfts-area" style={{minHeight:"500px",padding:"0px",margin:"0px;"}}>
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-12 col-xs-12 col-sm-12 p-0 mt-50 text-center">
                        <small className="xs-section-title text-white">How it works</small>
                        <h3>How Scrowed Works in Few Easy Steps</h3>
                        <Link to="features"></Link>
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


           <section className="sell-nfts-area mb-50 mt-20" style={{zIndex:"-1000",minHeight:"500px", background:"url('images/space4.jpg?v=3')", backgroundPosition:"cover", backgroundRepeat:"no-repeat"}}>
             <div className="container">
                <div className="row section-padding">
                <div className="col-md-6 col-lg-6 wow fadeInUp text-center" data-wow-duration="1.5s">
                        <div className="blockcain-img mt-50">
                            <img src={Bridge} style={{width:"70%",height:"auto"}} alt="Bridge" />
                        </div>
                    </div>
                  <div className="col-md-6 col-lg-5 offset-lg-1 wow fadeInUp" data-wow-duration="2s">
                        <div className="blockcain-content mt-50">
                            <small className="xs-section-title text-white">Multiple Chain</small>
                            <h3 className="column-title"><b>Bridge to the entire market</b></h3>
                            <p>
                                Users will also be able to transform other tokens not on the BSC network using Scrowed Space Portal - this will allow more users access to Scrowed trading platform since they can easily bridge their tokens to BSC network through the Space Portal.
                            </p>
                            <p>
                             Scrowed supports trading of popular BEP-20 tokens against the USD, EUR, GBP and other Fiat currencies. More trading peers will also be added as we gain more traction.
                            </p>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>



        <section className="sell-nfts-area" style={{minHeight:"500px",padding:"0px",margin:"0px;"}}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-xs-12 col-sm-12 p-0 text-center" style={{marginTop:"50px"}}>
                     <small className="xs-section-title text-white">Tokenomics</small>
                     <h3>Token Distribution</h3>
                     <Link to="tokenomics"></Link>
                </div>
                
                <div className="col-12 col-xs-12 col-sm-12 p-0 text-center mb-30"> 
                 <div className="row">
                  <div className="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3 col-xs-8 offset-xs-2 col-xs-12 p-30">
                    <PieChart style={{width:"100%"}}
                        data={[
                            { title: 'Liquidity', value: 30, color: '#90235B' },
                            { title: 'Marketing', value: 30, color: '#651953' },
                            { title: 'Presale', value: 15, color: '#902326' },
                            { title: 'Staking', value: 15, color: '#6a2390' },
                            { title: 'Reserve', value: 10, color: '#4a1965' }
                        ]} lineWidth="30" label={({ dataEntry }) => dataEntry.title+" ("+dataEntry.value+"%)"}
                        labelStyle={{
                            ...defaultLabelStyle
                        }}

                        labelPosition={80}
                        />
                      </div>
                   </div> 
                 </div>


                <div className="col-12 col-xs-12 col-sm-12 p-0 text-center" style={{marginTop:"50px"}}>
                    <small className="xs-section-title text-white">Roadmap</small>
                    <h3>What is in the Pipeline</h3>
				    <Link to="roadmap"></Link>
                    <img src={Timeline} alt="" />
			   </div>


               <div className="col-12 col-xs-12 col-sm-8 offset-sm-2  p-0 text-center features-section">
                 <section id="cd-timeline" className="cd-container">
                <div className="cd-timeline-block">
                  <div className="cd-timeline-img cd-picture"></div>

                  <div className="cd-timeline-content">
                    <h2>Q2</h2>

                    <p>
                     
                      - Project Concept Creation
                      <br />
                      - Initial Team Formation
                      <br />
                      - Seed Round
                      <br />- Token Smart Contract Development and Audit
                    </p>
                    <span className="cd-date">Q2 2022</span>
                  </div>
                </div>

                <div className="cd-timeline-block">
                  <div className="cd-timeline-img cd-movie"></div>

                  <div className="cd-timeline-content">
                    <h2>Q3</h2>
                    <p>
                      - Website Update <br />
                      -Launching of Scrowed platform on test-net
                      <br />- Token Listing
                    </p>
                    <span className="cd-date">Q3 2022</span>
                  </div>
                </div>

                <div className="cd-timeline-block">
                  <div className="cd-timeline-img cd-picture"></div>

                  <div className="cd-timeline-content">
                    <h2>Q4</h2>
                    <p>
                      - Feedback Based Improvement Implemented
                      <br />- Launching of Scrowed platform on main-net
                    </p>
                    <span className="cd-date">Q4 2022</span>
                  </div>
                </div>

                <div className="cd-timeline-block">
                  <div className="cd-timeline-img cd-location"></div>

                  <div className="cd-timeline-content">
                    <h2>Q1</h2>
                    <p>
                      - Process Refinements <br />
                      - Partnerships <br />- Governance
                    </p>
                    <span className="cd-date">Q1 2023</span>
                  </div>
                </div>

                <div className="cd-timeline-block">
                  <div className="cd-timeline-img cd-location"></div>

                  <div className="cd-timeline-content">
                    <h2>Q2</h2>
                    <p>- Launching of V2 on main-net</p>
                    <span className="cd-date">Q2 2023</span>
                  </div>
                </div>
              </section>
            </div>
                </div> 
              </div>
           </section>
        

             <section className="sell-nfts-area mt-20" style={{minHeight:"700px",background:"url('images/space3.jpg?v=3')",backgroundPosition:"cover", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
                 <div className="container">
                  <div className="row">
                    { /*
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
					  </div>:"" */

                      }


            <div className="col-12 col-xs-12 col-sm-12 p-0 text-center mt-40">
                <small className="xs-section-title text-white">Frequently Asked Questions</small>
                <h3>If you have a questions we have an answer</h3>
            </div>

            {/* Scrowed ensures a smooth trade of cryptocurrency against fiat for both newbies and expert traders. You can start trading your asset on the go by just connecting your wallet. */}
			   
			 <div className="col-12 col-sm-12 col-xs-12 text-center mt-40">
             <div className="row">
              <div className="col-md-6">
                <div className="general-btn-wrap mb-10">
                  <span className="general" style={{color:'#FFF',  border:'1px solid #651953', borderRadius:"5px", padding:"9px", background:'#90235B'}}>EXCHANGE</span>
                </div>

                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button accord-btn active" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       What is Scrowed?
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Scrowed is a dex-fiat peer to peer trading platform. This platform will ensure that dex traders can seamlessly trade their Bep-20 tokens for fiat of their choice. Traders will be able to create adverts with their price and preferred payment option.
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                       Are Scrowed smart contract audited ?
                    </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                       We take Security very seriously, we carry out smart contract audit, site security test and other wide variety of test regularly to ensure that investors funds are fully safe and secured. More so all our audit will be opened to the general public and can be verifiable by anyone.
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                       What's Scrowed business model ? 
                    </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    We intend to run a profitable platform. Our goal is to generate consistent revenue as a company and to incentivise our investors
                    </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    What's next for the Scrowed?
                    </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    After we launch our trading platform, we will focus on decentralization and governance. We will be giving more of the decision making and governance to our community. We will carefully work out a plan to rollout DAO and give a large part of decision making and the project back to our community that believed in us
                    </div>
                    </div>
                </div>
                </div>

                </div>



                <div className="col-md-6">

                <div className="general-btn-wrap mb-10">
                <span className="general" style={{color:'#FFF',  border:'1px solid #651953', borderRadius:"5px", padding:"9px", background:'#90235B'}}>TOKEN</span>
                </div>

                  
                <div class="accordion" id="accordionExampleA">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingAOne">
                    <button class="accordion-button accord-btn active" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAOne" aria-expanded="true" aria-controls="collapseAOne">
                       How can I store DXW Token?
                    </button>
                    </h2>
                    <div id="collapseAOne" class="accordion-collapse collapse show" aria-labelledby="headingAOne" data-bs-parent="#accordionExampleA">
                    <div class="accordion-body">
                    You will be able to store DXW token in a Binance chain supported wallet that you fully control
                    </div>
                    </div>
                </div>


                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingATwo">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseATwo" aria-expanded="false" aria-controls="collapseATwo">
                      How do I buy DXW Bep-20 tokens ?
                    </button>
                    </h2>
                    <div id="collapseATwo" class="accordion-collapse collapse" aria-labelledby="headingATwo" data-bs-parent="#accordionExampleA">
                    <div class="accordion-body">
                    You can buy DXW token by participating in Public Sale or Airdrop. DXW token will also be listed on exchanges 
                    </div>
                    </div>
                </div>



                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingAThree">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAThree" aria-expanded="false" aria-controls="collapseAThree">
                    When will DXW Token be listed on exchanges?
                    </button>
                    </h2>
                    <div id="collapseAThree" class="accordion-collapse collapse" aria-labelledby="headingAThree" data-bs-parent="#accordionExampleA">
                    <div class="accordion-body">
                    DXW tokens will be listed in the first quater and second quater of 2022
                    </div>
                    </div>
                </div>




                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingAFour">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAFour" aria-expanded="false" aria-controls="collapseAFour">
                    What is the total supply of DXW token?
                    </button>
                    </h2>
                    <div id="collapseAFour" class="accordion-collapse collapse" aria-labelledby="headingAFour" data-bs-parent="#accordionExampleA">
                    <div class="accordion-body">
                      The total supply of DXW token is 100 million (include the Currency)
                    </div>
                    </div>
                  </div>
                </div>
                 </div>
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
                            <p>Trading on Scrowed will function through the use of a trusted escrow smart contract, reducing control and enhancing decentralization, security and privacy. </p>
                            <p>Trading comes with risks, but traders should not face any other risks than those they are willing to take. This innovative idea will come to traders at a very low fees as Scrowed aims for global crypto inclusion.</p>
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
                            <h3>The Power of Scrowed P2P Exchange</h3> <br/>
                            <p>
                            <b>Fiat Option:</b> Most decentralized platforms do not provide fiat payments. Scrowed's primary responsibility it to make sure users/traders can seamlessly convert their assets to fiat and vice-versa with little or no interference or control 
                            </p>
                            <p>
                            <b>Trustless:</b> Scrowed will allow traders to remain custodian of their assets. Users assets and data are safe 
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
