import React ,{useContext,useState,memo,useEffect} from 'react'
import Sidebar from '../Landing/components/sidebar'
import {Link,Navigate,useNavigate} from "react-router-dom";
import Header from '../Landing/components/header'
import Nav from "../Landing/components/nav"
import AccountContext from '../../contexts/account'
import PaymentModal from './components/paymentModal'
import Progressbar from './components/progressbar'
import BuyTab from './components/buyTab'
import SellTab from './components/sellTab'
import ConfirmAd from './components/confirmAd'
import axios from 'axios'

const COUNTRIES_URL=process.env.REACT_APP_SERVER_URL+"/countries";
const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment";
const PAYMENT_ALL_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";
const CREATE_BUY_AD_URL = process.env.REACT_APP_SERVER_URL+"/buy/advert";
const CREATE_SELL_AD_URL = process.env.REACT_APP_SERVER_URL+"/sell/advert";

const CreateAd = () => {
    const [account,_] = useContext(AccountContext);
    const [type,setType] = useState("buy");
    const [step,setStep] = useState(1);
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
    const [error,setError] = useState("");
    const authToken = localStorage.getItem("authToken");
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [methods,setMethods] = useState([]);
    const [prefferedMethod,setPrefferedMethod] = useState("");
    const [selectedMethod,setSelectedMethod] = useState("");
    const [deadline,setDeadline] = useState(0);
    const [notes,setNotes] = useState("");
    const [registered,setRegistered] = useState("");

    const navigate = useNavigate();
    
    const confirmDetails = {type,asset,currency,priceType,currencyRate,lowerLimit,upperLimit,totalAsset}
  

    const createSellAd = ()=>{
        console.log("here")
        const run = async ()=>{
            try{
                const {data:response} = await axios.post(CREATE_SELL_AD_URL,{
                    asset:(assets.find((a)=>a.symbol == asset)._id),
                    paymentMethod:selectedMethod._id,
                    currency:currency.symbol,
                    currencyRate,
                    factor,
                    priceType,
                    lowerLimit,
                    upperLimit,
                    deadline,
                    balance:price,
                    unit:totalAsset,
                    amount:price,
                    status: "active",
                    notes,
                    conditions:{
                        registered,
                        baseOwnershipAmount:0,
                        status:"now"
                    }
                },{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }

              navigate("/ad/list");
            }catch(error){
                setError(error.message)
            }
           
        };
        run();
    }

    
    const createBuyAd = ()=>{
        console.log("here")
        const run = async ()=>{
            try{
                const {data:response} = await axios.post(CREATE_BUY_AD_URL,{
                    asset:(assets.find((a)=>a.symbol == asset)._id),
                    paymentMethod:(methods.find((m)=>m.name == prefferedMethod))._id,
                    currency:currency.symbol,
                    currencyRate,
                    factor,
                    priceType,
                    lowerLimit,
                    upperLimit,
                    deadline,
                    balance:price,
                    unit:totalAsset,
                    amount:price,
                    status: "active",
                    notes,
                    conditions:{
                        registered:(new Date()).toISOString(),
                        baseOwnershipAmount:0,
                        status:"now"
                    }
                },{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }

              navigate("/ad/list");
            }catch(error){
                setError(error.message)
            }
           
        };
        run();
    }

    const advertDetails = {
        step,setStep,priceType,setPriceType,factor,setFactor,assets,setAssets,asset,setAsset,currency,setCurrency,currencyRate,setCurrencyRate,assetPrice,setAssetPrice,price,setPrice,currencies,setCurrencies,upperLimit,setUpperLimit,lowerLimit,setLowerLimit,authToken,totalAsset,setTotalAsset,deadline,setDeadline,createBuyAd,createSellAd,selectedMethod,setSelectedMethod,notes,setNotes,registered,setRegistered,prefferedMethod
    }

    
    useEffect(()=>{
        const fetchCountries = async ()=>{
            try{
                const {data:response} = await axios.get(COUNTRIES_URL,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }
                setCurrencies(response.data);
            }catch(error){
                setError(error.message)
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
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }
                // console.log(response)
                setAssets(response.data);
                
            }catch(error){
                setError(error.message)
            }
        }
        const fetchPaymentMethods= async ()=>{
            try{
                const {data:response} = await axios.get(PAYMENT_METHOD_URL,{
                    headers:{
                        "Authorization":`Bearer ${authToken}`
                    }
                });
                if(response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }
                console.log(response.data);
                setPaymentMethods(response.data);
            }catch(error){
                setError(error.message)
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
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message);
                }
                setMethods(response.data);
            }catch(error){
                setError(error.message)
            }
        }

        fetchAssets();
        fetchCountries();
        fetchPaymentMethods();
        fetchMethods();
    },[authToken]);
    
    return (
        <>
        {error && alert(error)}
        <PaymentModal />
        <div className="modal fade" id="addedPaymentMethodModal" aria-labelledby="addedPaymentMethodModalLabel" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Select Payment Method</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col col-12 col-xs-12 text-end">
                                <Link to="/methods/payment/new" className="btn-dex btn-dex-default p-10">+ Add New</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card payment-method-card">
                                {
                                    paymentMethods && paymentMethods.map((method)=>{

                                        let det = JSON.parse(method.details);
                                       return (<>
                                        <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <button className="btn-dex-small btn-dex-primary" onClick={(e)=>{setSelectedMethod(method)
                                        }} type="button"> {method.paymentMethod?.name}</button>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end">
                                        X
                                    </div>
                                </div>
                                {
                                    
                                    Object.entries(det).map(([name,index])=>(
                                        <>
                                             <div className="row" key={index}>
                                    <div className="col col-6 col-xs-6 label dim text-end">
                                        <b>{name} </b> :
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                       <b> {det[name]}</b>
                                    </div>
                                </div>
                                        </>
                                    ))
                                }
                                        </>)
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
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
                  <select value={prefferedMethod} onChange={(e)=>{
                      console.log(e.target.value)
                      setPrefferedMethod(e.target.value)}}>
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
        <div className="container-fluid body">
                <div className="row flex-nowrap">
                <Sidebar account={account}/>
                    <div className="col py-3 main">
                        <div className="row p-20">
                            <Header account={account} />

                            <div className="row mb-30 mt-20">
                            <div className="col col-6 col-xs-6 col-sm-6">
                                <h3 className="page-title">Create Ad</h3>
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
                                    <li className="nav-item" role="presentation" style={{ width: "50%" }}>
                                        <button className="nav-link active" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="true" onClick={()=>setType("buy")}>I WANT TO BUY</button>
                                    </li>
                                    <li className="nav-item" role="presentation" style={{ width: "50%" }}>
                                        <button className="nav-link" id="sell-tab" data-bs-toggle="tab" data-bs-target="#sell" type="button" role="tab" aria-controls="sell" aria-selected="false" onClick={()=>setType("sell")}>I WANT TO SELL</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <BuyTab {...advertDetails}/>
                                    <SellTab {...advertDetails}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Nav/>
            </>
    )
}

export default CreateAd;
