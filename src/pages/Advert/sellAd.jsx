import React,{useContext,useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png";
import Nav from "../Landing/components/nav";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const SELL_ADS_URL= process.env.REACT_APP_SERVER_URL+"/adverts?priceType=buy";
const FILTERED_AD_URL = process.env.REACT_APP_SERVER_URL+"/adverts";
const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const CURRENCIES_URL = process.env.REACT_APP_SERVER_URL+"/countries";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";

export default function SellAd(){
  const [account,_]= useContext(AccountContext);
  const [ads,setAds] = useState([]);
  const [error,setError] = useState("");
  const [currency,setCurrency] = useState("");
  const [amount,setAmount]= useState(0);
  const [asset,setAsset] = useState("");
  const [currencies,setCurrencies] = useState([]);
  const [assets,setAssets] = useState([]);
  const [methods,setMethods] = useState([]);
  const [method,setMethod] = useState("");
  const [unit,setUnit] = useState(0);



  const runQuery = ()=>{
    const run = async ()=>{
      try{
        
      const filters = {
        currency,paymentMethod:method,asset
      }
      Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
      const q = new URLSearchParams(filters).toString();
      console.log(q)
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
      console.log(response.data);
      setAds(response.data);
      }catch(error){
        setError(error.message)
      }
    }
    run();
  }

  useEffect(()=>{
    const fetchAds = async ()=>{
      try{
        const {data:response} = await axios.get(SELL_ADS_URL,{
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
    }

    const fetchAssets = async ()=>{
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
        console.log("assets",response.data)
        setAssets(response.data);
    }catch(err){
        setError(err.message)
    }
  }

  const fetchCurrencies = async ()=>{
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
    }catch(error){
      setError(error.message)
    }
  }

  const fetchMethods = async ()=>{
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
    }catch(error){
      setError(error.message)
    }
  }

    fetchAds();
    fetchAssets();
    fetchCurrencies();
    fetchMethods();
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
                  <div className="row p-20">
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
                       <Link to="/ad/buy" className="btn-dex btn-dex-primary p-10 pr-30">Buy</Link> 
                       &nbsp;&nbsp;
                       <Link to="/ad/sell" className="btn-dex btn-dex-default p-10 pl-30">Sell</Link>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius" value={asset} onChange={(e)=>setAsset(e.target.value)}>
                        <option value="">All Assets</option>
                            {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={asset.symbol}>{asset.symbol}</option>
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
                                <option value={(method.name).toString()}>{(method.name).toString()}</option>
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
                         
                         ads ? ads.map((ad)=>{
                           let clicked = false;
                           return (
                          <>
                          
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                         <div className="row">
                          <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                            <div className="row">
                              <div className="col col-2 col-xs-2">
                                <img src={Avatar} style={{width:"30px", height:"30px"}} />
                              </div>
                              <div className="col col-10 col-xs-10 text-start"> 
                                <div className="row">
                                    <div className="col col-12 col-xs-12">
                                        <h4 className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</h4>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end d-flex">
                                        <span className="value">{ad.unit}</span>
                                        <span className="label">Orders</span>
                                         &nbsp; &nbsp; 
                                        <span className="value">Completion</span>
                                        <span className="label">92%</span>
                                    </div>
                                </div>
                           </div>
                           {
                             clicked && (
                               <>
                                            <div class="col col-12 col-xs-12 text-start"> 
                            <span class="label"> Payment Method</span> <br/><br/>
                            <span class="btn-dex-small btn-dex-danger">{ad.paymentMethod.paymentMethod.name}</span>
                        </div>
                               </>
                             )
                           }
                          </div>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                          <div className="row">
                          <div className={`col ${!clicked ? " col-6 col-xs-6":"col col-12 col-xs-12 mb-10"}`}>
                                <span className="value number">{ad.amount} {ad.currency}</span><br/>
                                <span className="label">Price</span>
                            </div>
                            <div className={`col ${!clicked ? " col-6 col-xs-6":"col col-12 col-xs-12 mb-10"}`}>
                                <span className="value number">{ad.unit} {ad.asset.symbol}</span><br/>
                                <span className="label">Amount</span>
                            </div>
                            {
                                  clicked && (
                                    <>
                                    <div class="col col-12 col-xs-12 mb-10">
                            <span class="value number">{ad.lowerLimit}{ad.currency} - {ad.upperLimit} {ad.currency}</span><br/>
                            <span class="label">Limit</span>
                         </div>
                         <div class="col col-12 col-xs-12 mb-10">
                            <span class="label">Payment Time</span> <span class="value number">{ad.deadline} Minutes</span>
                         </div>
                                    </>
                                  )
                                }
                          </div>
                        </div>
                        {
                          !clicked ? (
                            <>
                                                   <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                            <span className="value number">{ad.lowerLimit} - {ad.upperLimit} {ad.currency}</span><br/>
                            <span className="label">Limit</span>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                            <span className="label">Payment Method</span>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-1 text-end p-20">
                            <a href="" className="btn-dex-small btn-dex-primary p-10">{ad.priceType === "sell"?"buy":"sell"}</a>
                        </div> 
                            </>
                          ):(
                            <>
                            <div class="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                         <span class="label"> 
                            <b>Please Read Terms Carefully</b> <br/><br/>
                            ✔ {ad.notes}
                         </span>
                     </div>
                     <div class="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                        <form >
                         <div class="row"> 
                            <div class="col col-12 col-xs-12 col-sm-12">
                                <label>I want to pay</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" value={amount} aria-label="" onChange={(e)=>setAmount(e.target.value)}/>
                                    <span class="input-group-text"><span class="text-primary" onClick={(e)=>setAmount(ad.balance)}>All</span> {ad.currency}</span>
                                </div>
                                <span class="rate-info float-end">&nbsp; </span>
                            </div>
                         </div>

                         <div class="row"> 
                            <div class="col col-12 col-xs-12 col-sm-12">
                                <label>I will receive</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" aria-label="" value={unit} onChange={(e)=>setUnit(e.target.value)}/>
                                    <span class="input-group-text">{ad.asset.symbol}</span>
                                </div>
                                <span class="rate-info float-end"> &nbsp; </span>
                            </div>
                         </div>

                         <div class="row form-row"> 
                            <div class="col col-12 col-xs-12 col-sm-12 d-flex">
                              <button class="btn-dex-small btn-dex-default" type="button" onClick={(e)=>clicked = false}>Cancel</button>&nbsp;
                              <button class="btn-dex-small btn-dex-primary" type="button">Sell {ad.asset.symbol}</button>
                            </div>
                         </div>
                        </form>
                     </div>
                            </>
                          )
                        }
                      </div>
                    </div>
                    </>
                           )
})
                    :
                    <div className="row d-flex justify-content-center align-items-center">
                      <span className="text-center">
                        No Adverts Available
                      </span>
                    </div>
                    }
                
              </div>
              </div>
        </div>
        </div>
        <Nav/>
        </>
    )
}