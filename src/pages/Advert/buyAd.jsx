import React,{useContext,useState,useEffect,useCallback} from "react";
import {Link,useNavigate} from "react-router-dom";
import Header from "../Landing/components/header";
import BuyAdComp from "./components/buyadComp";
import Nav from "../Landing/components/nav";
import NavSocial from "../Landing/components/navsocial";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const BUY_ADS_URL= process.env.REACT_APP_SERVER_URL+"/buy/adverts/";
const FILTERED_AD_URL= process.env.REACT_APP_SERVER_URL+"/buy/adverts"
const ASSETS_URL= process.env.REACT_APP_SERVER_URL+"/assets";
const CURRENCIES_URL = process.env.REACT_APP_SERVER_URL+"/countries";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";
// const SELL_TRADE_URL = process.env.REACT_APP_SERVER_URL+"sell/trade";
const MY_PAYMENT_METHODS_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment";

export default function BuyAd(){
    const [account,_]= useContext(AccountContext);
    const [ads,setAds] = useState([]);
    const [error,setError] = useState("");
    const [currency,setCurrency] = useState("");
    const [asset,setAsset] = useState("");
    const [currencies,setCurrencies] = useState([]);
    const [assets,setAssets] = useState([]);
    const [methods,setMethods] = useState([]);
    const [method,setMethod] = useState("");
    const [paymentMethods,setPaymentMethods]= useState([]);
    const navigate = useNavigate();
    

<<<<<<< HEAD

    const runQuery = ()=>{
      const run = async ()=>{
        try{
          
=======
    const runQuery = useCallback(async() => {
        try{
>>>>>>> 3f611177b6fe0201e52cbdf6709e3586e864c3a4
        const filters = {
          currency,paymentMethod:method,asset
        }
  
        Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
        const q = new URLSearchParams(filters).toString();
        const {data:response} = await axios.get(`${FILTERED_AD_URL}/?${q}`,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        
        if(response.error){
          setError(response.error);
        }

        if(!response.success){
          setError(response.message);
        }
        setAds(response.data);
        }catch(error){
          setError(error.message)
        }
      
    });

    const fetchAds = useCallback(async() => {
      try{
        const {data:response} = await axios.get(BUY_ADS_URL,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })

        if(response.error){
          setError(response.error);
        }

        if(!response.success){
          setError(response.message);
        }
        setAds(response.data);
      }catch(error){
        setError(error.message)
      }
    });

   const  fetchAssets = useCallback(async() => {
      try{
        const {data:response} = await axios.get(ASSETS_URL,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
            setError(response.error)
        }
        if(!response.success){
            setError(response.message)
        }
        setAssets(response.data);
        setAsset(response.data[0]._id);
    }catch(err){
        setError(err.message)
    }
  })

  const fetchCurrencies = useCallback(async() => {
    try{
      const {data:response} = await axios.get(CURRENCIES_URL,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    });
    if(response.error){
        setError(response.error)
    }
    if(!response.success){
        setError(response.message)
    }
    setCurrencies(response.data);
    setCurrency(response.data[0].symbol);
    }catch(error){
      setError(error.message)
    }
  });

  
  const fetchMethods = useCallback(async() => {
    try{
      const {data:response} = await axios.get(PAYMENT_METHOD_URL,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

      if(response.error){
        setError(response.error);
      }

      if(!response.success){
        setError(response.message);
      }
      setMethods(response.data);
      setMethod(response.data[0]._id);
      await runQuery();
    }catch(error){
      setError(error.message)
    }
  });

  const fetchMyPaymentMethods = useCallback(async() => {
    try{
      const {data:response} = await axios.get(MY_PAYMENT_METHODS_URL,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

      if(response.error){
        setError(response.error);
      }

      if(!response.success){
        setError(response.message);
      }
      setPaymentMethods(response.data);
    }catch(error){
      setError(error.message)
    }
  })

  useEffect(async()=>{
      await fetchAssets();
      await fetchCurrencies();
      await fetchMethods();
      await fetchMyPaymentMethods();
    },[token])

    return (
        <>
        <div className="modal fade" id="confirmPublishModal" tabIndex="-1" aria-labelledby="confirmPublishModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-sm">
            <div className="modal-content" style={{background:"#ccc"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm to take Ad offline</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row mb-20">
                  <div className="col col-12 col-xs-12">
                    Once taken offline, the Ad will not be able to take in orders from users.
                  </div>
                </div>

                <div className="row form-row mb-20">     
                  <div className="col col-xs-12 text-end">
                  <button className="btn-dex-small btn-dex-danger" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                  <button className="btn-dex-small btn-dex-default">Confirm</button>
                  </div>
              </div> 

              </div>
            </div>
          </div>
        </div>

       <div className="container-fluid body">
        <div className="row flex-nowrap">
          <Sidebar account={account}/>
           <div className="col py-3 main">
                  <div className="row p-0">
                    <Header account={account}/>
                   </div>
                   <div className="row mb-30 mt-20">
                    <div className="col col-6 col-xs-6 col-sm-6">
                       <h3 className="page-title">Sell Ads</h3>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-6 text-end">
                    <button className="btn-dex btn-dex-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                              Ad Management
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <li><Link className="dropdown-item" to="/ad/create">Create Ad</Link></li>
                              <li><Link className="dropdown-item" to="/ad/list">Ad list</Link></li>
                            </ul>
                    </div>
                   </div>


                   <form>
                   <div className="row">
                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                       <Link to="/ad/sell" className="btn-dex btn-dex-primary p-10 pl-30">Buy</Link>
                       &nbsp;&nbsp;
                       <Link to="/ad/buy" className="btn-dex btn-dex-default p-10 pr-30">Sell</Link> 
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                           
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius" value={asset} onChange={(e)=>setAsset(e.target.value)}>
                        <option value="">All Assets</option>
                           {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={asset._id}>{asset.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2">
                        <select className="form-control no-radius" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                          <option value="">All Currencies</option>
                           {
                              currencies && currencies.map((currency)=>(
                                <>
                                  <option value={currency.symbol}>{currency.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius" value={method} onChange={(e)=>setMethod(e.target.value)}>
                            <option value="">All Payment Methods</option>
                            {
                              methods && methods.map((method)=>(
                                <>
                                <option value={method._id}>{(method.name).toString()}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                      <span  onClick={(e)=>{
                        e.preventDefault();
                        runQuery();
                      }} >Filter</span>
                       &nbsp;&nbsp;
                      <span onClick={(e)=>{
                        setAsset("");
                        setCurrency("");
                        setMethod("");
                      }} >Reset</span>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                      
                    </div>
                  </div>
                </form>

                  <div className="row">
                       {
                         ads.length>0 ? ads.map((ad)=>{
                          return (
<<<<<<< HEAD
                          <BuyAdComp ad={ad} paymentMethods={paymentMethods} token={token}/>
=======
                           <>
                            <div className="trade-record-card pt-10 pb-10 mb-10" key="{ad._id}">
                             <div className={`row`}>
                              <div className={`col col-12 col-xs-12 col-sm-3 mb-20 pt-10`}>
                                <div className="row">
                                  <div className="col col-2 col-xs-2">
                                    <img src={Avatar} style={{width:"30px", height:"30px"}} />
                                  </div>
                                  <div className="col col-10 col-xs-10 text-start"> 
                                    <div className="row">
                                        <div className="col col-12 col-xs-12">
                                            <h4 className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</h4>
                                        </div>
                                        <div className="col col-6 col-xs-6 text-end d-flex p-0">
                                            <span className="value">{ad.unit["$numberDecimal"]}</span>
                                            <span className="label">Orders</span>
                                            &nbsp; &nbsp; 
                                            <span className="value">Completion</span>
                                            <span className="label">92%</span>
                                        </div>
                                    </div>
                                 </div>
                               </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                              <div className="row">
                                <div className="col col-6 col-xs-6">
                                    <span className="value number p-0">{ad.amount["$numberDecimal"]} {ad.currency}</span><br/>
                                    <span className="label p-0">Price</span>
                                </div>

                                <div className="col col-6 col-xs-6">
                                    <span className="value number p-0">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                    <span className="label p-0">Amount</span>
                                </div>
                             </div> 
                            </div>

                            <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                              <span className="value number p-0">{ad.lowerLimit} - {ad.upperLimit} {ad.currency}</span><br/>
                              <span className="label p-0">Limit</span>
                            </div>

                           <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                               <span className="value p-0">{ad.paymentMethod?.name}</span><br/>
                              <span className="label p-0">Payment Method</span>
                          </div>
                          
                          <div className="col col-12 col-xs-12 col-sm-2 text-end p-20">
                          <Link className="btn-dex-small btn-dex-primary" type="button"
                            to={{ pathname:'/ad/buyad/'+ad._id, state:{adId:ad._id}}}> 
                                {ad.priceType === "sell"?"Buy":"Sell"}
                          </Link>
                          </div> 
                          </div>
                        </div>
                        </>
>>>>>>> 3f611177b6fe0201e52cbdf6709e3586e864c3a4
                       )})
                       :
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                        <div className="row d-flex justify-content-center align-items-center">
                         <span className="text-center">
                          No Advert Available
                        </span>
                        </div>
                       </div>
                     }
              </div>
             <NavSocial/>
            </div>
          </div>
         </div>
         <Nav/>
        </>
    )
}