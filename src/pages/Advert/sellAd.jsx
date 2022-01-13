import React,{useContext,useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Header from "../Landing/components/header";
import Nav from "../Landing/components/nav";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const SELL_ADS_URL= process.env.REACT_APP_SERVER_URL+"/adverts?priceType=sell";
const FILTERED_AD_URL=`${process.env.REACT_APP_SEREVER_URL}/adverts`
const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const CURRENCIES_URL = process.env.REACT_APP_SERVER_URL+"/countries";

export default function SellAd(){
  const [account,_]= useContext(AccountContext);
  const [ads,setAds] = useState([]);
  const [error,setError] = useState("");
  const [currency,setCurrency] = useState("");
  const [priceType,setPriceType] = useState("");
  const [asset,setAsset] = useState("");
  const [currencies,setCurrencies] = useState([]);
  const [assets,setAssets] = useState([]);


  const runQuery = ()=>{
    const run = async ()=>{
      try{
        
      const filters = {
        currency,priceType,asset
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
        console.log(response.data);
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
        setAssets(response.data);
    }catch(err){
        setError(err.message)
    }
  }

  const fetchCurrencies = async ()=>{
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
    setCurrencies(response.data);
    }catch(error){
      setError(error.message)
    }
  }
    fetchAds();
    fetchAssets();
    fetchCurrencies();
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
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                              <li><Link class="dropdown-item" to="/ad/create">Create Ad</Link></li>
                              <li><Link class="dropdown-item" to="/ad/list">Ad list</Link></li>
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
                        <option value="">All Asset</option>
                            {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={asset.symbol}>{assets.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2">
                        <select className="form-control no-radius" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                        <option value="">All Currencies</option>
                            {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={currencies.symbol}>{currencies.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius" value={priceType} onChange={(e)=>setPriceType(e.target.value)}>
                            <option value="">Payment Methods</option>
                            <option value="buy">Paypal</option>
                            <option value="sell">Bank Transfer</option>
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
                        setPriceType("");
                      }} >Reset</span>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                     
                    </div>
                  </div>
                </form>

                  <div className="row">
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                    {
                         
                         ads !== [] ? ads.map((ad)=>(
                          <>
                         <div className="row">
                          <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                            <div className="row">
                              <div className="col col-2 col-xs-2">
                                <img src="images/avatar.png" style={{width:"30px", height:"30px"}} />
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
                          </div>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                          <div className="row">
                            <div className="col col-6 col-xs-6">
                                <span className="value number">{ad.amount} {ad.currency}</span><br/>
                                <span className="label">Price</span>
                            </div>
                            <div className="col col-6 col-xs-6">
                                <span className="value number">{ad.unit} {ad.asset.symbol}</span><br/>
                                <span className="label">Amount</span>
                            </div>
                          </div>
                        </div>

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
                    </div>
                    </>
                    ))
                    :
                    <div className="row d-flex justify-content-center align-items-center">
                      <span>
                        No Adverts Available
                      </span>
                    </div>
                    }
                </div>
              </div>
              </div>
        </div>
        </div>
        <Nav/>
        </>
    )
}