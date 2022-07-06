import React ,{useContext,useState,memo,useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../Landing/components/sidebar'
import {Link,Navigate,useNavigate,useParams} from "react-router-dom";
import { calculateFactor, calculatePrice } from '../../helpers/utils';
import Header from '../Landing/components/header'
import Nav from "../Landing/components/nav"
import AccountContext from '../../contexts/account'
import PaymentModal from './components/paymentModal'
import Progressbar from './components/progressbar'
import Misc from './components/misc'
import ConfirmAd from './components/confirmAd'
import axios from 'axios'

const COUNTRIES_URL=process.env.REACT_APP_SERVER_URL+"/countries";
const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment";
const PAYMENT_ALL_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";
const CREATE_BUY_AD_URL = process.env.REACT_APP_SERVER_URL+"/buy/advert";

const BUY_AD_URL= process.env.REACT_APP_SERVER_URL+"/buy/singleadvert";

const EditBuyAd = () => {
    const [account,_] = useContext(AccountContext);
    const [type,setType] = useState("buy");
    const [step,setStep] = useState(1);
    const [ad,setAd] = useState({currency:'',asset:{symbol:''}});
    const [registerChecked,setRegisterChecked] = useState(true);
    const [priceType,setPriceType] = useState("floating");
    const [factor,setFactor] = useState(100);
    const [assets,setAssets] = useState([]);
    const [asset,setAsset] = useState("usdt");
    const [currency,setCurrency] = useState({name:"nigeria",currency:"naira",symbol:"NGN",rateToDollar:{$numberDecimal:412.2765},shortCode:"ngn"});
    const [currencyRate,setCurrencyRate] = useState(1);
    const [assetPrice,setAssetPrice] = useState(1);
    const [price,setPrice] = useState(0);
    const [currencies,setCurrencies] = useState([]);
    const [upperLimit, setUpperLimit] = useState(0);
    const [lowerLimit,setLowerLimit] = useState(0);
    const [totalAsset,setTotalAsset] = useState(0);
    const [online,setOnline] = useState('now');
    const [autoreply,setAutoReply] = useState('');
    const [error,setError] = useState("");
    const authToken = localStorage.getItem("authToken");
    const [methods,setMethods] = useState([]);
    const [prefferedMethod,setPrefferedMethod] = useState("");
    const [deadline,setDeadline] = useState(0);
    const [notes,setNotes] = useState("");
    const [registered,setRegistered] = useState("");
    const {id} = useParams();

    const navigate = useNavigate();

     const createBuyAd = ()=>{
        const run = async ()=>{
            try{
                if(authToken==='null' || authToken===null || authToken==='undefined'){
                    toast.error("Please connect wallet first", {
                        position: 'middle-center',
                    });
                    return
                }
                const {data:response} = await axios.post(CREATE_BUY_AD_URL+"/"+id,{
                    asset:(assets.find((a)=>a.symbol == asset))._id,
                    paymentMethod:(methods.find((m)=>m.name == prefferedMethod))._id,
                    currency:(currencies.find((c)=>c.symbol == currency.symbol))._id,
                    currencyRate,
                    factor,
                    priceType,
                    lowerLimit,
                    upperLimit,
                    deadline,
                    balance:price,
                    unit:totalAsset,
                    status: "active",
                    notes,
                    autoreply,
                    conditions:{
                        registerChecked,
                        registered,
                        baseOwnershipAmount:0,
                        status:online
                    }
                },{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    toast.error(response.error, {
                        position: 'middle-center',
                    });
                }
                if(!response.success){
                    toast.error(response.message, {
                        position: 'middle-center',
                    });
                }
                else{
                    toast.success("Ad has been edited successfullly", {
                        position: 'middle-center',
                    });
                }
              navigate("/ad/list");
              window.location.reload(); 
            }catch(error){
                toast.error(error.message, {
                    position: 'middle-center',
                });
            }
        };
        run();
    }

    const confirmDetails = {type,asset,prefferedMethod,currency,price,factor,priceType,assetPrice,currencyRate,lowerLimit,upperLimit,deadline,totalAsset,createBuyAd}
    
    useEffect(()=>{
        const fetchAd =  async() => {
            try{
              const {data:response} = await axios.get(BUY_AD_URL+"/"+id,{
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
              })
        
              if(response.error){
                toast.error(response.error, {
                    position: 'middle-center',
                });
              }
          
              if(!response.success){
                toast.error(response.message, {
                    position: 'middle-center',
                });
              }else{
              setAd(response.data);
              setPrice(Number(response.data.currency.rateToDollar["$numberDecimal"] * response.data.asset.rateToDollar["$numberDecimal"] * (response.data.factor["$numberDecimal"]/100)).toFixed(2));
              setAsset(response.data.asset.symbol);
              setAssetPrice(response.data.asset.rateToDollar["$numberDecimal"]);
              setCurrencyRate(response.data.currency.rateToDollar["$numberDecimal"]);
              setTotalAsset(response.data.unit["$numberDecimal"]);
              setLowerLimit(response.data.lowerLimit);
              setUpperLimit(response.data.upperLimit);
              setDeadline(response.data.deadline);
              setPrefferedMethod(response.data.paymentMethod.name);
              setCurrency(response.data.currency);
              //setSelectedMethod(response.data.paymentMethod);
              setNotes(response.data.notes);
              setFactor(Number(response.data.factor["$numberDecimal"]).toFixed(2));
              setAutoReply(response.data.autoreply);
              setRegistered(response.data.conditions.registered);
              setOnline(response.data.conditions.status);
             }
            }catch(error){
                toast.error(error.message,{
                  position: 'middle-center',
               });
            }
          }

        const fetchCountries = async ()=>{
            try{
                const {data:response} = await axios.get(COUNTRIES_URL,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    toast.error(response.error, {
                        position: 'middle-center',
                    });
                }
                if(!response.success){
                    toast.error(response.message, {
                        position: 'middle-center',
                    });
                } else{
                 setCurrencies(response.data);
               }
            }catch(error){
                toast.error(error.message, {
                    position: 'middle-center',
                });
            }
        }
        const fetchAssets = async ()=>{
            try{
              
                const {data:response} = await axios.get(ASSETS_URL,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    toast.error(response.error, {
                        position: 'middle-center',
                    });
                }
                if(!response.success){
                    toast.error(response.message, {
                        position: 'middle-center',
                    });
                }else{
                setAssets(response.data);
              }
            }catch(error){
                toast.error(error.message, {
                    position: 'middle-center',
                });
            }
        }

        const fetchMethods= async ()=>{
            try{
                const {data:response} = await axios.get(PAYMENT_ALL_METHOD_URL,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    toast.error(response.error, {
                        position: 'middle-center',
                    });
                  
                }
                if(!response.success){
                    toast.error(response.message, {
                        position: 'middle-center',
                    });
                }else{
                setMethods(response.data);
              }
            }catch(error){
                toast.error(error.message, {
                    position: 'middle-center',
                });
            }
        }
        fetchAd();
        fetchAssets();
        fetchCountries();
        fetchMethods();
    },[authToken]);
    
    return (
        <>
        <PaymentModal />
        <Toaster containerStyle={{ position: 'absolute' }} />
       
		<div className="modal fade" id="epaymentMethodModal" tabIndex="-1" aria-labelledby="epaymentMethodModalLabel" aria-hidden="true">
		<div className="modal-dialog">
		  <div className="modal-content">
			<div className="modal-header">
			  <h5 className="modal-title" id="exampleModalLabel">Select Payment Method</h5>
			  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div className="modal-body">
			  <div className="row">
				<div className="col-xs-12 col-sm-12">
				  <div className="col-xs-12 payment-method">
					  <select className="form-control" value={prefferedMethod} onChange={(e)=>{
						  setPrefferedMethod(e.target.value)}}>
						<option value="">--Select an Option--</option>
						{
							methods && methods.map((m)=>(
								<option value={m.name} key={m._id}>{m.name}</option>
							))
						}
					  </select>
				  </div>
				</div>
			   </div>
			 </div>
			</div>
		  </div>
		</div>
        <ConfirmAd {...confirmDetails}/>
		<Sidebar account={account}/>
		 <div className="offcanvas-overly"></div>
		 
		  <div className="main-content">
		  
			<Header account={account}/>
			 <main style={{width:'100%'}}>
			 
			   <section className="sell-nfts-area mb-50 mt-120">
				<div className="container">
				
				    <div className="row mb-30 mt-20">	
		
	                     	<div className="col col-6 col-xs-6 col-sm-6">
                                <h3 className="page-title">Edit Ad</h3>
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-6 text-end">
                                <span className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ad Management
                                        </span>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li><Link className="dropdown-item" to="/ad/create">Create Ad</Link></li>
                                        <li><Link className="dropdown-item" to="/ad/list">Ad list</Link></li>
                                        </ul>
                            </div>
                     </div>

		              <Progressbar step={step} />
                            <div className="col col-12">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation" style={{ width: "100%" }}>
                                        <button className="nav-link active" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="true" onClick={()=>setType("buy")}>I WANT TO BUY</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                              <form>
                               <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>Assets</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                   {
                                     ad && assets && assets.map((a)=>(
                                           <>
                                           <input type="radio" name="asset" value={a.symbol} 
                                           key={a._id} 
                                           
                                           checked={a.symbol === asset} 
                                           defaultValue={a.symbol===ad.asset.symbol}
                                           onChange={(e)=>{
                                               setAsset(e.target.value);
                                               setAssetPrice(a.rateToDollar["$numberDecimal"]);
                                               setPrice(Number(a.rateToDollar["$numberDecimal"] * currencyRate  * Number(factor / 100)).toFixed(2));
                                            }}
                                            />
                                           {a.symbol.toUpperCase()} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  

                            <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>With Cash</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                {
                                    ad && currencies &&  currencies.map((c)=>(
                                           <>
                                           <input type="radio"  name="currency" value={c}  key={c._id} 
                                           checked={c.symbol===currency.symbol}
                                           defaultValue={c.symbol===ad.currency.symbol}
                                           onChange={(e)=>{ 
                                                setCurrency(c);
                                                setPrice((c.rateToDollar["$numberDecimal"] * assetPrice  * Number(factor / 100)).toFixed(2));
                                                setCurrencyRate(c.rateToDollar["$numberDecimal"]);
                                            }}
                                            />
                                           {c.symbol} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  


                            <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                  <div className="label"><b>Your Price</b></div>
                                  <div className="d-flex"><h5 className="currency">{currency.symbol}</h5>&nbsp;<h5>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(assetPrice) * Number(currencyRate) * Number(factor / 100))}</h5></div>
                                </div>
                                
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster d-none mb-20">
                                    <div className="label"><b>Highest Order Price</b></div>
                                    <div className="d-flex"><h4 className="currency">{currency.symbol}</h4>&nbsp;<h4>411.34</h4></div>
                                </div>
                                
                                {
                                /*
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                    <div className="label"><b>Price Type</b></div>
                                    <div>
                                    
                                        <input type="radio" name="priceType" onChange={()=>{
                                            setFactor(100);
                                            setPriceType("fixed");
                                        }
                                        } checked={priceType === "fixed"}/> 
                                         
                                         Factor &nbsp;
                                         <input type="radio" name="priceType" onChange={()=>{
                                             setFactor(0);
                                             setPriceType("floating")
                                         }}  checked={priceType === "floating"}/>Floating &nbsp;
                                    </div>
                                </div>
                                 */
                                }

                                <div className={`col col-xs-12 col-sm-12 col-md-6 form-cluster mb-20`}>
                                  
                                  <div className={`${priceType === "fixed" ? "d-none":""}`}>
                                      <div className="label"><b>Set Price Factor</b></div>
                                      <div className="value-button" id="decrease" value="Decrease Value"
                                     onClick={(e)=>{
                                        let newfactor = Number(factor) - 0.01; 
                                        setFactor(Number(newfactor).toFixed(2));
                                        //let factorPrice = calculatePrice(currencyRate,newfactor);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(newfactor / 100));
                                      }}
                                    >-</div>
                                    <input type="number" id="number" className="text-dark"  placeholder="100" value={factor} onChange={(e)=>{
                                        setFactor(Number(e.target.value));
                                        //let factorPrice = calculatePrice(currencyRate,e.target.value);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(e.target.value / 100));
                                    }} />
                                    <div className="value-button" id="increase" value="Increase Value"
                                    onClick={(e)=>{
                                        let newfactor = Number(factor) + 0.01; 
                                        setFactor(Number(newfactor).toFixed(2));
                                        ///let factorPrice = calculatePrice(currencyRate,newfactor);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(newfactor / 100));
                                      }}
                                      >+</div>

                                    <div className="pricing-formula"> <span>Pricing Formula</span> &nbsp;  {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((price))} * {factor}% = <b> {currency.symbol} {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((price))} </b> </div>
                                  </div>

                                  <div className={`${priceType === "floating" ? "d-none":""}`}>
                                     <div className="label"><b>Set Fixed Price</b></div>
                                    <div className={`value-button`} id="decrease"value="Decrease Value"
                                       onClick={(e)=>{
                                        price = Number(price) - 1;
                                        setCurrencyRate(price);
                                        setFactor(calculateFactor(price,currency.rateToDollar["$numberDecimal"]));
                                        setPrice(price.toFixed(2));
                                      }}
                                    >-</div>
                                    <input type="number" id="number" placeholder={price} className="text-dark" onChange={(e)=>{
                                        setCurrencyRate(e.target.value);
                                        setFactor(calculateFactor(e.target.value,currency.rateToDollar["$numberDecimal"]));
                                        setPrice(Number(e.target.value).toFixed(2));
                                        
                                    }} />
                                    <div className="value-button" id="increase" value="Increase Value" onClick={(e)=>{
                                        price = Number(price) + 1;
                                        setCurrencyRate(price);
                                        setFactor(calculateFactor(price,currency.rateToDollar["$numberDecimal"]));
                                        setPrice(price.toFixed(2));
                                    }} >+</div>
                                  </div>
                                </div>
                              </div>  


                              <div className={`row buy-step-2 ${step !== 2 ? "d-none":""} `}>     
                                <div className="col col-12 col-xs-12 col-sm-6">
                                    <div className="row form-row"> 
                                        <div className="col col-12 col-xs-12 col-sm-8">
                                            <label>Total Amount</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" aria-label="" name="totalAsset" value={totalAsset} required onChange={(e)=>{
                                                    setTotalAsset(e.target.value);
                                                }}/>
                                                <span className="input-group-text"> <b>{(asset).toUpperCase()}</b></span>
                                            </div>
                                            <span className="rate-info float-end"> = {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(price) * Number(totalAsset)) } {currency.symbol}</span>
                                        </div>

                                     </div>

                                     <div className="row form-row"> 

                                        <div className="col col-xs-5 col-sm-5 mt-10">
                                            <label>Order Limit</label>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" aria-label="" value={lowerLimit} onChange={(e)=>setLowerLimit(e.target.value)}/>
                                                <span className="input-group-text">{currency.symbol}</span>
                                            </div>
                                            <span className="rate-info p-0">Min limit must not be 0 {currency.symbol}</span>
                                        </div>

                                        <div className="col col-xs-2 col-sm-2 mt-10 text-center">
                                            <br/><br/>
                                            ~
                                        </div>

                                        <div className="col col-xs-5 col-sm-5 mt-10">
                                            <label>&nbsp;</label>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={upperLimit} onChange={(e)=>setUpperLimit(e.target.value)}/>
                                                <span className="input-group-text">{currency.symbol}</span>
                                            </div>
                                            <span className="rate-info p-0">Max limit must be greater than {lowerLimit} {currency.symbol}</span>
                                        </div>
                                     </div>
           
                                     <div className="row form-row">                          
                                        <div className="col col-12 col-xs-12 col-sm-8 mt-20">
                                            <label>Payment Time Limit</label>
                                            <select className="form-control" value={deadline} onChange={(e)=>{
                                                setDeadline(Number(e.target.value));
                                            }} selectedValue={deadline}>
                                                <option value="15">15 Min</option>
                                                <option value="30">30 Min</option>
                                                <option value="45">45 Min</option>
                                                <option value="60">60 Min</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row form-row"> 
                                        <div className="col col-xs-12 col-sm-8">
                                            {/* <span className="dim">Estimated Fee:</span> {Number(totalAsset) * 0.001} {asset} */}
                                        </div>
                                    </div>
                                </div>

                                <div className="col col-12 col-xs-12 col-sm-6">
                                        <div className="col col-12 col-xs-12 col-sm-12">
                                            <div className="label"><b>Payment Method</b></div>
                                        </div>
                                        <div className="col col-6 col-xs-6 col-sm-6">
                                           <small> Select a payment method </small> 
                                        </div>
                                        <div className="col col-6 col-xs-6 col-sm-6">
                                        {prefferedMethod && <span className="btn-dex-small btn-dex-default">{prefferedMethod}</span>}
                                            <button className="btn-dex-small btn-dex-primary" data-bs-toggle="modal" data-bs-target="#epaymentMethodModal" type="button">+ ADD</button>
                                        </div>
                                    </div>
                            </div>  

                                    <Misc step={step} notes={notes} setNotes={setNotes} registered={registered} setRegistered={setRegistered} registerChecked={registerChecked} setRegisterChecked={setRegisterChecked} asset={asset}  online={online} setOnline={setOnline} autoreply={autoreply} setAutoReply={setAutoReply}/>
                                        <div className="row form-row">     
                                            <div className="col col-xs-12 text-end">
                                                <button className="btn-dex btn-dex-primary buy-step1-next" onClick={(e)=>{
                                                    e.preventDefault();
                                                    step === 1 ? setStep(1) : setStep(step-1)
                                                    }}>Prev</button>
                                                <button className={`btn-dex ${step === 3 ? "d-none" : ""} btn-dex-default buy-step1-next`} onClick={(e)=>{
                                                    e.preventDefault();
                                                step ===3 ? setStep(3) : setStep(step+1)}
                                                }>Next</button>
                                                <button className={`btn-dex ${step === 3 ? "" :"d-none"} btn-dex-default`} data-bs-toggle="modal"data-bs-target="#confirmPostModal" disabled={step === 3 ? false:true} onClick={(e)=>{e.preventDefault();
                                                }}>Submit</button>
                                            </div>
                                        </div> 
                                    </form>
                                    </div>
		
		
		                           </div>
                                </div>
                            </div>
                        
		
		           </section>

		   </main>
	      <Nav/>
	     </div>
	   </>		

    )
}

export default EditBuyAd;
