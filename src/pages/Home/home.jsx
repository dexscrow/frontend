import{useState,useEffect,useContext} from "react";
import AccountContext from "../../contexts/account";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Logo from "../../assets/logo-long.png";
import Background from "../../assets/hero-bg.png";
import LeftBackground from "../../assets/left-shape.png";
import RightBackground from "../../assets/right-shape.png";
import Mobile from "../../assets/mobile1.png";
import Mobile2 from "../../assets/mobile2.png";
import Partner1 from "../../assets/fungie.jpg";
import Yahoo from "../../assets/yahoo.png";
import Partner2 from "../../assets/cryptogem.jpg";
import About from "../../assets/about2.png";
import Footer from "../../assets/footer-bg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";
import '../../landing.css';
import '../../globe.css';
import '../../mainmenu.css';
import '../../responsive.css';
am4core.useTheme(am4themes_animated);

export default function Home(){
    const [account,_] = useContext(AccountContext);
    

    useEffect(()=>{
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.data = [{
            "Tokenomics": "Seed",
            "Percentage": 10
        }, {
            "Tokenomics": "Presale",
            "Percentage": 32.5
        }, {
            "Tokenomics": "Liquidity",
            "Percentage": 20
        }, {
            "Tokenomics": "Team",
            "Percentage": 10
        }, {
            "Tokenomics": "Advisors",
            "Percentage": 5
        }, {
            "Tokenomics": "Marketing",
            "Percentage": 5
        }, {
            "Tokenomics": "Reserve",
            "Percentage": 5
        }, {
            "Tokenomics": "Airdrop",
            "Percentage": 2
        }, {
            "Tokenomics": "Staking",
            "Percentage": 10
        },
        {
            "Tokenomics": "Fungie Team",
            "Percentage": 0.5
        }];
    
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.ticks.template.disabled = false;
        pieSeries.dataFields.value = "Percentage";
        pieSeries.dataFields.category = "Tokenomics";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 1;
        pieSeries.slices.template.strokeOpacity = 0.2;
        //pieSeries.slices.template.propertyFields.fill = am4core.color("#fff");
        pieSeries.slices.template.showOnInit = true;
        pieSeries.slices.template.hiddenState.properties.shiftRadius = 1;
        pieSeries.alignLabels = false;
        pieSeries.labels.template.radius = am4core.percent(-10);
        pieSeries.labels.template.fill = am4core.color("white");
        //pieSeries.labels.template.alignLabels = true;
        pieSeries.labels.template.adapter.add("radius", function(radius, target) {
        if (target.dataItem && (target.dataItem.values.value.percent < 3)) {
          return 0;
        }
          return radius;
        });
        pieSeries.labels.template.adapter.add("fill", function(color, target) {
        if (target.dataItem && (target.dataItem.values.value.percent < 3)) {
            return am4core.color("#fff");
        }
        return color;
        });
    },[])

    return(
    <>
     <body data-new-gr-c-s-check-loaded="14.1028.0" data-gr-ext-installed="">

       <div className="page-wrapper">

            <header className="main-header">
            <div className="container-fluid clearfix">
            <div className="row">
               <div className="col col-4">
                  <div className="logo">
                    <a href="#"> <img src={Logo} alt="" title="" style={{width:'170px',height:'auto'}} /></a>
                 </div>
               </div>
                <div className="col col-8 text-end">
                  <Link className="btn-dex btn-dex-primary" style={{color:'#FFF', padding:'10px', border:'1px solid #FFF', background:'#2094E5'}} to="/app">Launch App</Link>
               </div>
            </div>
         

            </div>

            </header>

            <section className="hero-section bg-img" style={{backgroundImage:`url("${Background}")`}}>
                <div className="container">
                <div className="row">
                <div className="col-lg-6">
                <div className="hero-text">
                <h3>First Decentralized Peer to Peer Crypto-Fiat Trading Platform</h3>
                <p>&nbsp;</p>

                <div className="d-flex">
                  <a href="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true" className="btn-dex btn-dex-primary" style={{color:'#FFF', border:'1px solid #FFF', background:'#2094E5'}}>White Paper</a> &nbsp;
                </div>

                </div>
                </div>
                </div>
                <div className="hero-image-wrap d-none d-lg-block">
                <div className="hero-mobile1 wow customFadeInRight animated animated" style={{visibility:'visible', animationName:'customFadeInRight'}}>
                <img src={Mobile} alt="hero" />
                </div>
                <div className="hero-mobile2 wow customFadeInLeft animated animated" style={{visibility:'visible', animationName:'customFadeInLeft'}}>
                <img src={Mobile2} alt="hero" />
                </div>
                </div>
                <div className="col col-12 text-end blink_me" style={{color:'#fff'}}>
                  <blink> <a href="https://pancakeswap.finance/swap?outputCurrency=0x3BE068Bcc82460d866EE6816aC986630964371B7" style={{color:"#fff"}}>Buy DXW on Pancake Swap</a> </blink> 
                </div>

                </div>
            </section>


        

            <div className="left-background-shape" style={{backgroundImage:`url("${LeftBackground}")`}}>

                <section className="about-us-area">
                <div className="container">
                <div className="row">
                <div className="col-md-6 d-md-flex align-items-center order-2 order-md-1">
                <div className="about-image text-center">
                <img alt="" src={About} style={{width:'50%',height:'auto'}} />
                </div>
                </div>
                <div className="col-md-6 d-md-flex align-items-center order-1 order-md-2">
                <div className="about-content">
                <div className="section-title">
                {/*<h4 className="left-bar">About</h4> */}
                <h3 style={{textAlign:'left'}}>About Dexscrow</h3>
                <p style={{textAlign:"justify"}}>
                <a name="about"> </a>
                Dexscrow is the first P2P decentralized crypto-fiat trading platform and with a very low transaction fee. Dexscrow makes it fast, secured and easy to trade your BEP-20 tokens to Fiat or Vice Versa.
                </p>
                <p style={{textAlign:"justify"}}>
                Dexscrow does not require an elaborate registration process as with other exchanges out there. You can start trading your asset on the go by just connecting your Web3 wallet such as metamask.
                </p>
                <p style={{textAlign:"justify"}}>
                 Dexscrow supports the trading of popular BEP-20 tokens against the USD, EUR, GBP and other Fiat currencies. More trading peers will also be added as we gain more traction.
                </p>
                </div>
                </div>
                </div>
                </div>
                </div>
               </section>
             </div>


             
                
             <section className="about-us-area pt-100 pb-90 mt-40 rpt-60 rpb-50" style={{background:'#223A9E'}}>
                <div className="container">
                <div className="row justify-content-center">
                 <div class="col col-12 col-xs-12"> 
                    <div className="section-title">
                      <h3 style={{textAlign:'center', color:'#fff'}}>Tokenomics</h3>
                    </div>
                </div>

                <div class="col col-12 col-xs-12"> 
                  <div class="token-info">
                    <div class="row">
                        <div class="col">
                            <div class="inner-content">
                                <span>Token Name:</span> Dexscrow
                            </div>
                          
                        </div>
                        <div class="col">
                            <div class="inner-content">
                                <span>Token Ticker:</span> DXW
                            </div>
                           
                        </div>

                        <div class="col">
                            <div class="inner-content">
                                <span>Token Type :</span> BEP-20
                            </div>
                            
                        </div>
                       

                        <div class="col">
                            <div class="inner-content">
                                <span>Total Supply :</span>100,000,000 DXW
                            </div>
                           
                        </div>
                    </div>
                  </div>  
                  </div>
                </div>
                <div className="row" style={{padding:"0px"}}>
                  <div className="col col-12 col-md-12 text-center" style={{padding:"0px"}}>
                   <div id="chartdiv" style={{ width: "100%", height: "500px", color:"#fff", padding:"0px"}}></div>
                 </div>
                </div>
                </div>
             </section>
                




             <div className="right-background-shape" style={{backgroundImage:`url("${RightBackground}")`}}>
                <section className="road-map-section">
                <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                <div className="section-title text-center">
                <h4>Roadmap</h4>
                <h3 style={{textAlign:'center'}}>Our Roadmap</h3>
                <p><a name="roadmap"> </a></p>
                </div>
                </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-timeframe">
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>
                                        <div className="timeframe-year">2021</div>
                                        <h3 className="title">Q3 2021</h3>
                                        <p className="description">
                                          Project Concept creation <br/> White Paper <br/>Initial Team Formation<br/>Financial Assessment<br/>Project Proposal Interfaces
                                        </p>
                                    </a>
                                </div>
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>    
                                        <div className="timeframe-year">2021</div>
                                        <h3 className="title">Q4 2021</h3>
                                        <p className="description">
                                        Website Development <br/>Seed Round <br/>Token Smart Contract Development and Audit
                                        </p>
                                    </a>
                                </div>
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>
                                        <div className="timeframe-year">2022</div>
                                        <h3 className="title">Q1 2022</h3>
                                        <p className="description">
                                        Dexscrow Presale <br/>Listing of Token on Pancakeswap
                                        </p>
                                    </a>
                                </div>
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>    
                                        <div className="timeframe-year">2022</div>
                                        <h3 className="title">Q2 2022</h3>
                                        <p className="description">
                                        CEX Listing<br/>Feedback Based Improvement Implemented
                                        </p>
                                    </a>
                                </div>
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>
                                        <div className="timeframe-year">2022</div>
                                        <h3 className="title">Q3 2022</h3>
                                        <p className="description">
                                        Launching of Dexscrow platform on test-net <br/> <br/> Launching of Dexscrow platform on main-net
                                        </p>
                                    </a>
                                </div>
                                <div className="timeframe">
                                    <a href="#" className="timeframe-content">
                                        <div className="timeframe-icon"><i className="fa fa-rocket"></i></div>    
                                        <div className="timeframe-year">2022</div>
                                        <h3 className="title">Q4 2022</h3>
                                        <p className="description">
                                        Listing of new tokens on platform<br/>Process Refinements<br/>Governance
                                        </p>
                                    </a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </div>
                </section>
                </div>




                <section className="accordion-section pt-100 pb-90 rpt-60 rpb-50">
                <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                <div className="section-title">
                <h4>Faq</h4>
                <h3 style={{textAlign:'center'}}>Frequently Asked Question</h3>
                <p>Here we have provided some relevant information regarding our token and its functionalities. If you have any other questions, please get in touch using our contact details.</p>
                </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">

                <div className="general-btn-wrap">
                <span className="general" style={{color:'#FFF',  border:'1px solid #FFF', background:'#2094E5'}}>UTILITY</span>
                </div>

                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button accord-btn active" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       What is Dexscrow?
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      Dexscrow is a dex-fiat peer to peer trading platform. This platform will ensure that dex traders can seamlessly trade their Bep-20 tokens for fiat of their choice. Traders will be able to create adverts with their price and preferred payment option.
                    </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                       Are Dexscrow smart contract audited ?
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
                       What's Dexscrow business model ? 
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
                    What's next for the Dexscrow?
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

                <div className="general-btn-wrap">
                <span className="general" style={{color:'#FFF',  border:'1px solid #FFF', background:'#2094E5'}}>TOKEN</span>
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
                </section>

                <section className="get-in-touch-section pt-100 rpt-60">
                    <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                    <div className="contact-title">
                    <h3 style={{textAlign:'center'}}>Media & Partners</h3>
                    </div>
                    </div>
                    </div>
                    <div className="row justify-content-center">
                    <div className="col-lg-7">
                    <div className="get-in-touch-service-wrap">
                    <div className="row">
                    <div className="col-lg-4 col-md-4 col-xs-4 text-right">
                    <div className="contact-item text-center wow animated customFadeInUp delay-0-1s" style={{animationName:'none'}}>
                    <div className="service-icon">
                     <img alt="" src={Partner1} style={{width:'100px',height:'auto'}} className="img rounded-circle" />
                    </div>
                    <div className="service-content">
                    <span>FUNGIE DAO</span>
                    </div>
                    </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-xs-4 text-right">
                    <div className="contact-item text-center wow animated customFadeInUp delay-0-1s" style={{animationName:'none'}}>
                    <div className="service-icon">
                     <img alt="" src={Yahoo} style={{maxWidth:'100%', height:'auto', minHeight:'100px'}} />
                    </div>
                    <div className="service-content">
                    <span></span>
                    </div>
                    </div>
                    </div>


                    <div className="col-lg-4 col-md-4  col-xs-4 text-left">
                    <div className="contact-item text-center wow animated customFadeInUp delay-0-1s" style={{animationName:'none'}}>
                    <div className="service-icon">
                     <img alt="" src={Partner2} style={{width:'100px',height:'auto'}} className="img rounded-circle"/>
                    </div>
                    <div className="service-content">
                    <span>Crypto Gem</span>
                    </div>
                    </div>
                    </div>
             
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </section>

                                        
                    <footer className="footer" style={{backgroundImage:`url("${Footer}")`}}>
                    <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                    <div className="footer-menu text-center">

                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-12">
                    <div className="contact-title">
                    <h3 style={{textAlign:'center', color:'#fff'}}>Contact Our Team</h3>
                    <p style={{textAlign:'center', color:'#fff'}}>Have any question? Please don't hesitate to reach out to us. We’ll get back to you shortly.</p>
                    </div>
                    <div className="footer-share-icon text-center">
                    <ul>
                    <li><a href="http://twitter.com/@dexscrow1"><FontAwesomeIcon icon={['fab', 'twitter']}  /> </a></li>
                    <li><a href="mailto:support@dexscrow.com"> <FontAwesomeIcon icon="envelope" /> </a></li>
                    { /*<li><a href="#"><i className="flaticon-facebook"></i></a></li> */}
                    <li><a href="http://t.me/dexscrow"><FontAwesomeIcon icon={['fab', 'telegram']}  /> </a></li>
                    </ul>
                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="footer-bottom pt-30 pb-130 rpb-60">
                    <div className="copyright">Copyright © 2022. All rights reserved by <a href="" style={{color:'#fff'}}>DEXSCROW</a></div>
                    </div>
                    </footer>



                  
                    <button className="scroll-top scroll-to-target" data-target="html">
                    <span className="fa fa-angle-up"></span>
                    </button>
          


        </div>
        
     </body>
    
    </>
    )
}