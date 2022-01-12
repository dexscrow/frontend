import React ,{useContext,useState,memo,useEffect} from 'react'
import Sidebar from '../Landing/components/sidebar'
import Header from '../Landing/components/header'
import AccountContext from '../../contexts/account'
import PaymentModal from './components/paymentModal'
import Progressbar from './components/progressbar'
import BuyTab from './components/buyTab'
import SellTab from './components/sellTab'
import ConfirmAd from './components/confirmAd'
import useFetch from "../../hooks/useFetch";
import axios from 'axios'

const COUNTRIES_URL='http://localhost:8000/countries';
const ASSETS_URL = 'http://localhost:8000/assets';
const PAYMENT_METHOD_URL = 'http://localhost:8000/methods/payment';

const CreateAd = memo(() => {
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
    console.log("auth",authToken)

    const advertDetails = {
        step,setStep,priceType,setPriceType,factor,setFactor,assets,setAssets,asset,setAsset,currency,setCurrency,currencyRate,setCurrencyRate,assetPrice,setAssetPrice,price,setPrice,currencies,setCurrencies,upperLimit,setUpperLimit,lowerLimit,setLowerLimit,authToken,totalAsset,setTotalAsset
    }

    const confirmDetails = {type,asset,currency,priceType,currencyRate,lowerLimit,upperLimit,totalAsset}
    console.log("createAd");
    
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

        fetchAssets();
        fetchCountries();
        fetchPaymentMethods();
    },[]);
    
    return (
        <>
        {error && console.log(error)}
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
                                <a href="" className="btn-dex btn-dex-default p-10">+ Add New</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card payment-method-card">
                                {
                                    paymentMethods && paymentMethods.map((method)=>{
                                        let det = JSON.parse(method.details);
                                        <>
                                        <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <span className="btn-dex-small btn-dex-primary"> {method.paymentMethod.name}</span>
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
                                        {name}
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        {det[name]}
                                    </div>
                                </div>
                                        </>
                                    ))
                                }
                                        </>
                                    })
                                }
                                {/* <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <span className="btn-dex-small btn-dex-primary"> Bank Transfer</span>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end">
                                        X
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 label dim text-end">
                                        NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Ola  Fashade
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK ACCOUNT NUMBER
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        0043320734
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Access Bank
                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <ConfirmAd {...confirmDetails}/>
        <div className="container-fluid body">
                <div className="row flex-nowrap">
                    {account && <Sidebar />}
                    <div className="col py-3 main">
                        <div className="row p-20">
                            <Header account={account} />
                            <div className="col col-12">
                                <h3 className="page-title">Create Ad</h3>
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
            </div></>
    )
})

export default CreateAd;
