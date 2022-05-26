import React,{useContext,useState,useEffect,useCallback} from 'react'
import socketClient from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../Landing/components/header'
import Delete from "../../assets/delete.svg"
import Edit from "../../assets/edit.svg"
import {Link} from "react-router-dom";
import Nav from "../Landing/components/nav"
import AccountContext from '../../contexts/account';
import Sidebar from '../Landing/components/sidebar';
import {close} from '../../helpers/sellad';
import axios from "axios";
const token = localStorage.getItem("authToken");


const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;
const BUY_AD_URL = process.env.REACT_APP_SERVER_URL+'/buy/adverts/me';
const SELL_AD_URL = process.env.REACT_APP_SERVER_URL+'/sell/adverts/me';
const ASSETS_URL= process.env.REACT_APP_SERVER_URL+"/assets";
const BASE_URL= process.env.REACT_APP_SERVER_URL;


export default function Adlist() {
    const [account,_] = useContext(AccountContext);
    const [buyAds,setBuyAds] = useState([]);
    const [sellAds,setSellAds] = useState([]);
    const [error,setError] = useState("");
    const [date,setDate]= useState("");
    const [status,setStatus] = useState("");
    const [priceType,setPriceType] = useState("");
    const [asset,setAsset] = useState("");
    const [assets,setAssets] = useState([]);
    const [advertStatusHeading,setAdvertStatusHeading] = useState("");
    const [advertStatusBody,setAdvertStatusBody] = useState("");
    const [adID,setAdID] = useState("");
    const [adURL,setAdURL] = useState("");
    const [loading,setLoading] = useState(false);
   
   
    const runQuery = ()=>{
        const run = async ()=>{
          try{
          if(token==='null' || token===null || token==='undefined'){
            toast.error('Please connect your wallet', {
              position: 'middle-center',
             });
             return;
          }
          const filters = {
            createdAt:date,status,asset
          }
          Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
          const q = new URLSearchParams(filters).toString();
          console.log(q)
          const {data:response} = await axios.get(`${priceType === "buy"?BUY_AD_URL:SELL_AD_URL}/?${q}`,{
            headers:{
              "Authorization":`Bearer ${token}`
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
          }
            if(priceType === "buy"){
              setBuyAds(response.data);
            }else if(priceType === "sell"){
              setSellAds(response.data);
            }
          }catch(error){
            toast.error(error.message, {
              position: 'middle-center',
            });
          }
        };
        run();
      }

   const fetchBuyAds = useCallback(async() => {
      try{
        if(token==='null' || token===null || token==='undefined'){
          return
       }
        const {data:response} = await axios.get(BUY_AD_URL,{
            headers:{
                "Authorization":`Bearer ${token}`
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
          setBuyAds(response.data);
        }
        
    }catch(err){
       toast.error(err.message, {
         position: 'middle-center',
       });
    }
   })

   const fetchSellAds = useCallback(async() => {
      try{
       if(token==='null' || token===null || token==='undefined'){
          return
       }
        const {data:response} = await axios.get(SELL_AD_URL,{
            headers:{
                "Authorization":`Bearer ${token}`
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
          setSellAds(response.data);
        }
       
    }catch(err){
       toast.error(err.message, {
         position: 'middle-center',
       }); 
     }
   })

   const fetchAssets  = useCallback(async() => {
      try{
        const {data:response} = await axios.get(ASSETS_URL,{
            headers:{
                "Authorization":`Bearer ${token}`
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
        
    }catch(err){
       toast.error(err.message, {
          position: 'middle-center',
        }); 
     }
   });

   
  const changeStatus = useCallback(async() => {
    try{
      setLoading(true);
      const {data:response} = await axios.patch(BASE_URL+"/"+adURL+"/advert/"+adID,{},{
        headers:{
          "Authorization":`Bearer ${token}`
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
        toast.success("Ad Status Changed", {
          position: 'middle-center',
        }); 
      }
      setLoading(false);
      window.location.reload();
    }catch(error){
      toast.error(error.message, {
        position: 'middle-center',
      }); 
    }
  })


  const closeAd = useCallback(async() => {
    try{
      if(adURL==="sell"){
        setLoading(true);
        const initAd = socketClient(SOCKET_ENDPOINT+"/initAd");
        initAd.on("connect", function(){
          initAd.emit('initadroom',adID);
        });

        initAd.on('adclosed', (data) => {
          toast.success("Ad closed successfully", {
            position: 'middle-center'
          });
          setLoading(false);
          window.location.reload();
        });

        toast.success("Waiting for confirmation", {
          position: 'middle-center',
        });
        await close(adID);
        //window.location.reload();
      }
      else if(adURL==="buy"){
      setLoading(true);
      const {data:response} = await axios.patch(BASE_URL+"/"+adURL+"/advert/"+adID,{status:'closed'},{
        headers:{
          "Authorization":`Bearer ${token}`
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
        toast.success("Ad closed successfully", {
          position: 'middle-center',
        });   
      }
      setLoading(false);
      window.location.reload();
     }
    }catch(error){
      toast.error(error.message, {
        position: 'middle-center',
      });
    }
   })

    useEffect(()=>{
       fetchBuyAds();
       fetchSellAds();
       fetchAssets();
    },[URL]);

    return (
        <>
		<Toaster containerStyle={{ position: 'absolute' }} />
      
         <div class="overlay" style={{display:loading?'block':'none'}}>
				<div class="spinner"></div>
				<br/>
				Loading...
		 </div>

       <div className="modal fade" id="confirmPublishModal" tabIndex="-1" aria-labelledby="confirmPublishModalLabel" aria-hidden="true">
			  <div className="modal-dialog modal-sm">
			  <div className="modal-content">
				<div className="modal-header">
				  <h5 className="modal-title" id="exampleModalLabel">{advertStatusHeading}</h5>
				  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div className="modal-body">
				  <div className="row mb-20">
					<div className="col col-12 col-xs-12">
					  {advertStatusBody}.
					</div>
				  </div>

				  <div className="row form-row mb-20">     
					<div className="col col-xs-12 text-end">
					<button className="btn-dex-small btn-dex-danger text-white" data-bs-dismiss="modal" aria-label="Close">Cancel</button> &nbsp;
					<button className="btn-dex-small btn-dex-default" onClick={(e)=>{
                e.preventDefault();
                changeStatus(adID);
              }}>Confirm</button>
					</div>
				</div> 

				</div>
			  </div>
			</div>
		</div>


    <div className="modal fade" id="closeAdModal" tabIndex="-1" aria-labelledby="closeAdModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Confirm Ad Closing</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-xs-12 col-sm-12">
                  Are you sure you want to close this ad? Click on the Proceed Button below 
              </div>

              <div className="col-xs-12 col-sm-12 text-center mt-20">
                  <button className="btn-dex btn-success btn-dex-primary"
                  onClick={(e)=>{
                  e.preventDefault();
                  closeAd();
                }}
                >Proceed</button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

 
 
    <Sidebar account={account}/>
			 <div className="offcanvas-overly"></div>
			 
			  <div className="main-content">
			  
				<Header account={account}/>
				 <main style={{width:'100%'}}>
			

        	<section className="sell-nfts-area mb-50 mt-120">
					  <div className="container">
					   <div className="row">
             <div className="col col-6 col-xs-6 col-sm-6">
								<h3 className="page-title">Advert List</h3>
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
					  
					 <div className="row mt-20 mb-20">
						<div className="col col-12 col-xs-12">
						 <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
							 <li >
								 <Link to="/profile" style={{textDecoration:"none"}}>
								 Profile
								 </Link>
								 </li>
							 <li>
								 <Link to="/trades" style={{textDecoration:"none"}}>
								   Trade History 
								  </Link>
							 </li>
							 
							 <li>
								 <Link to="/method/payment" style={{textDecoration:"none"}}>Payment Methods</Link>
							 </li>
						 </ul>
						 </div>
					   </div>
					   
					   
					<form>
                   <div className="row mb-20 mt-20">
                    <div className="col col-6 col-xs-6 col-sm-2">
                        <label>Asset</label>
                        <select className="form-control no-radius"  value={asset} onChange={(e)=>setAsset(e.target.value)}>
                             <option value="">All Asset</option>
                            {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={asset.symbol} key={asset._id}>{asset.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2">
                        <label>Order Type</label>
                        <select className="form-control no-radius"  value={priceType} onChange={(e)=>setPriceType(e.target.value)}>
                            <option value="">All</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2">
                        <label>Status</label>
                        <select className="form-control no-radius"  value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-3">
                        <div className="col col-12"><label>Date</label> </div>
                        <div className="col col-12 d-flex"><input type="date" value={date} onChange={e=>{
                          console.log(new Date(e.target.value))
                          setDate(new Date(e.target.value).toUTCString())}}/></div>  
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-start">
                      <br/>
                      <span onClick={(e)=>{
                        e.preventDefault();
                        runQuery();
                        }}> Filter </span> &nbsp; &nbsp;
                     <span onClick={(e)=>{
                        setDate("");
                        setStatus("");
                        setPriceType("");
                        setAsset("");
                      }}> Reset </span>
                    </div>
                  </div>
                </form>
					
					
					<div className="row p-10">
					
					   {
                     (sellAds && sellAds !==[]) ? sellAds.map((advert)=>(
                      <>
                     <div className="trade-record-card pt-10 pb-20 mb-10">
                     <div className="row" key={advert._id}>
                        <div className="col col-6 col-xs-6 col-sm-2">
                           <b>Sell</b><br/>
                           <b><u>{advert.uid}</u></b><br/>
                           <span className="label">Asset</span><br/>
                           <span className="value"> {advert.asset?.symbol}/{advert.currency.symbol}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3">
                              <span className="label p-0">Amount</span><br/>
                              <span className="value p-0">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((advert.unit["$numberDecimal"]))} {advert.asset?.symbol}</span><br/>
                              <span className="label p-0">Limit</span><br/>
                              <span className="value p-0">{advert.lowerLimit} - {advert.upperLimit} {advert.currency.symbol}</span>
                          </div>

                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label p-0">Price</span><br/>
                            <span className="value p-0">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(advert.asset.rateToDollar["$numberDecimal"] * advert.currency.rateToDollar["$numberDecimal"] *  (advert.factor["$numberDecimal"]/100)) } {advert.currency.symbol}</span>
                        </div>

                        <div className="col col-6 col-xs-6  col-sm-2">
                          <span className="label p-0">Payment Method</span><br/>
                            <br/><span className="value p-0">{advert.paymentMethod.paymentMethod.name}</span>
                        </div>

                        <div className="col  col-6 col-xs-6 col-sm-2">
                            <span className="label p-0">Status</span><br/>
                            <span className="value p-0" data-bs-toggle="modal" data-bs-target="#confirmPublishModal"
                            onClick={(e)=>{
                              e.preventDefault();
                              setAdID(advert._id);
                              setAdURL("sell");
                              if(advert.status=='active'){
                                setAdvertStatusHeading("Confirm to take Ad offline")
                                setAdvertStatusBody("Once taken offline, the Ad will not be able to take in orders from users.")
                              }
                              else{
                                setAdvertStatusHeading("Confirm to take Ad online")
                                setAdvertStatusBody("Once taken online, the Ad will be able to take in orders from users.")
                              }
                            }}
                            ><u>{advert.status}</u></span><br/><br/>

                            <span className="label p-0">Escrow</span><br/>
                            <Link to={{pathname:'/ad/fundad/'+advert._id, state:{id:advert._id}}}> <span className="value p-0" style={{textDecoration:'underline'}}>{advert.balance} {advert.asset?.symbol}</span></Link><br/><br/>
                        </div>

                        <div className="col  col-6 col-xs-6 col-sm-1"><br/><br/>
                            <img src={Delete} style={{width:"20px", height:"20px"}} data-bs-toggle="modal" data-bs-target="#closeAdModal"
                             onClick={(e)=>{
                              e.preventDefault();
                              setAdID(advert._id);
                              setAdURL("sell");
                            }}
                            />
                           &nbsp; &nbsp;
						              <Link to={{pathname:'/ad/editsellad/'+advert._id, state:{id:advert._id}}}><img src={Edit} style={{width:"20px", height:"20px"}} /> </Link>
                        </div>
 
                    </div>
                    </div>
                    </>
                        ))
                      :
                       ""

                     }

                     {
                        
                       (buyAds && buyAds !==[]) ? buyAds.map((advert)=>(
                        <>
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                       <div className="row" key={advert._id}>
                          <div className="col col-6 col-xs-6 col-sm-2">
                             <b>Buy</b><br/>
                             <b><u>{advert.uid}</u></b><br/>
                             <span className="label">Asset</span><br/>
                             <span className="value"> {advert.asset?.symbol}/{advert.currency.symbol}</span>
                          </div>
                          <div className="col col-6 col-xs-6 col-sm-3">
                              <span className="label p-0">Amount</span><br/>
                              <span className="value p-0">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((advert.unit["$numberDecimal"]))} {advert.asset?.symbol}</span><br/>
                              <span className="label p-0">Limit</span><br/>
                              <span className="value p-0">{advert.lowerLimit} - {advert.upperLimit} {advert.currency.symbol}</span>
                          </div>
  
                          <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                              <span className="label p-0">Price</span><br/>
                              <span className="value p-0">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(advert.asset.rateToDollar["$numberDecimal"] * advert.currency.rateToDollar["$numberDecimal"] *  (advert.factor["$numberDecimal"]/100)) } {advert.currency.symbol}</span>
                          </div>
  
                          <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label p-0">Payment Method</span><br/>
                              <span className="value p-0">{advert.paymentMethod.name}</span>
                          </div>
  
                          <div className="col  col-6 col-xs-6 col-sm-2"><br/><br/>
                              <span className="label p-0">Status</span><br/>
                              <span className="value p-0" data-bs-toggle="modal" data-bs-target="#confirmPublishModal" onClick={(e)=>{
                                e.preventDefault();
                                setAdID(advert._id);
                                setAdURL("buy");
                                if(advert.status=='active'){
                                  setAdvertStatusHeading("Confirm to take Ad offline")
                                  setAdvertStatusBody("Once taken offline, the Ad will not be able to take in orders from users.")
                                }
                                else{
                                  setAdvertStatusHeading("Confirm to take Ad online")
                                  setAdvertStatusBody("Once taken online, the Ad will be able to take in orders from users.")
                                }
                              }}><u>{advert.status}</u></span><br/><br/>
                          </div>
  
                          <div className="col  col-6 col-xs-6 col-sm-1"><br/><br/>
                              <img src={Delete} style={{width:"20px", height:"20px"}}  data-bs-toggle="modal" data-bs-target="#closeAdModal" 
                              onClick={(e)=>{
                                e.preventDefault();
                                setAdID(advert._id);
                                setAdURL("buy");
                              }}/>
                               &nbsp;&nbsp;
                              <Link to={{pathname:'/ad/editbuyad/'+advert._id, state:{id:advert._id}}}><img src={Edit} style={{width:"20px", height:"20px"}} /> </Link>
                          </div>
   
                      </div>
                      </div>
                      </>
                        ))
                        :
                        ""
                       }

                       {
                       (buyAds.length==0 && sellAds.length==0) ?
                       <div className="trade-record-card pt-10 pb-20">
                        <div className='row d-flex justify-content-center align-items-center'>
                          <span className="text-center">No Advert Found</span>
                        </div>
                       </div>
                       :
                       ""
                      }

                    </div>


                  </div>

			 </section>
		   	
		   </main>
	     <Nav/>
	    </div>
        </>
    )
}
