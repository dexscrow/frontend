import React,{useContext,useEffect,useState,useCallback} from 'react';
import socketClient from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';
import {Link,Navigate,useNavigate,useParams} from "react-router-dom";
import Timer from "./components/timer"
import Sidebar from "../Landing/components/sidebar";
import AccountContext from '../../contexts/account';
import Header from "../Landing/components/header";
import Nav from "../Landing/components/nav";
import axios from "axios";
import {transferAsset,cancel} from '../../helpers/selltrade';
import {transferBuyAsset,cancelBuy} from '../../helpers/buytrade';
const token = localStorage.getItem("authToken");

const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;
const TRADE_URL = process.env.REACT_APP_SERVER_URL+"/trade"
const TRANSFER_FIAT_URL = process.env.REACT_APP_SERVER_URL+"/sell/trade";
const TRANSFER_FIAT_BUY_URL = process.env.REACT_APP_SERVER_URL+"/buy/trade";
const MESSAGE_URL = process.env.REACT_APP_SERVER_URL+"/message";
const DISPUTE_URL = process.env.REACT_APP_SERVER_URL+"/trade/dispute";
const RATING_URL = process.env.REACT_APP_SERVER_URL+"/rating";
const GET_RATING_URL =  process.env.REACT_APP_SERVER_URL+"/rating";

const initTrade = socketClient(SOCKET_ENDPOINT+"/initTrade");

export default function Trade() {
  const [account,_] = useContext(AccountContext);
  const [error,setError] = useState("");
  const [trade,setTrade] = useState(null);
  const [messages,setMessages] = useState([]);
  const [message,setMessage] = useState("");
  const [score,setScore] = useState(0);
  const [comment,setComment] = useState("");
  const [rating,setRating] = useState({});
  const [disputed,setDisputed] = useState(false);
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const handleTime = useCallback(async() => {
    if(trade.disputed===true || disputed===true){
      setDisputed(true)
    }
    else{
      try{
        const {data:response} = await axios.patch(DISPUTE_URL+"/"+id,{
          disputed:true,
          timeoutDispute:true
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
          toast.error(response.error, {
            position: 'middle-center'
          });
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center'
          });
        }
        if(response.success){
          setDisputed(true);
          await fetchTrade();
        }
    }catch(err){
        toast.error(err.message, {
          position: 'middle-center'
        });
     }
    }
  });


  const rateTrade = useCallback(async() => {
    if(trade.settled===false){
      toast.error("You can't rate trade yet", {
        position: 'middle-center'
      });
      return;
    }
    else{
      try{
        setLoading(true);
        var {data:response} = await axios.post(RATING_URL+"/"+id,{
           rating:score,
           comment:comment
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
          toast.error(response.error, {
            position: 'middle-center'
          });
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center'
          });
        }
        if(response.success){
          toast.success(response.message, {
            position: 'middle-center'
          });
          fetchRating();
        }
       setLoading(false);
    }catch(err){
        toast.error(err.message, {
          position: 'middle-center'
        });
        setLoading(false);
     }
    }
  });


  const fetchTrade = useCallback(async() => {
    try{
      setLoading(true);
      const {data:response} = await axios.get(TRADE_URL+'/'+id,{
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
      }
      if(response.success){
        setLoading(false);
        setTrade(response.data);
        setDisputed(response.data.disputed);
        if(response.data.type==="sell" && response.data.funded===false){
          toast.error("Trade not accessible", {
            position: 'middle-center',
          });
          navigate("/ad/buy");
          return
        }
        fetchMessages();
        fetchRating();
      }
    }catch(error){
      setLoading(false);
      toast.error(error.message, {
        position: 'middle-center',
      });
    }
  },[trade]);

  const fetchMessages = useCallback(async() => {
    try{
      const {data:response} = await axios.get(MESSAGE_URL+'/'+id,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.error){
        toast.error(response.error, {
          position: 'middle-center'
        });
      }
      if(!response.success){
        toast.error(response.message, {
          position: 'middle-center'
        });
      }
      if(response.success){
        setMessages(response.data);
      }
    }catch(error){
      toast.error(error.message, {
        position: 'middle-center'
      });
    }
  });

  const fetchRating = useCallback(async() => {
    try{
      const {data:response} = await axios.get(GET_RATING_URL+"/"+id,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.success){
        setRating(response.data);
        setScore(response.data.rating);
        setComment(response.data.comment);
      }
    }catch(error){

    }
  });

  const initTransferAsset = useCallback(async() => {
    try{
            setLoading(true);
            toast.success("Wait, blockchain is processing transaction", {
              position: 'middle-center'
            });
            if(trade.type=="sell"){
              await transferAsset(id);
            }else{
              await transferBuyAsset(id);
            }      
     }catch(error){
           toast.error(error.message, {
             position: 'middle-center'
           });
           setLoading(false);
       }
   });
  const initTransferFiat = useCallback(async() => {
    try{
      setLoading(true);
      if(trade.type=="sell"){
        const {data:response} = await axios.patch(TRANSFER_FIAT_URL+"/"+id,{
          paid:true
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
          toast.error(response.error, {
            position: 'middle-center'
          });
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center'
          });
        }
        if(response.success){
          initTrade.emit('tradepaid', {'tradeID':id});
        }
      }else{
        const {data:response} = await axios.patch(TRANSFER_FIAT_BUY_URL+"/"+id,{
          paid:true
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
          toast.error(response.error, {
            position: 'middle-center'
          });
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center'
          });
        }
        if(response.success){
           initTrade.emit('tradepaid', {'tradeID':id});
        }
      } 
    }catch(err){
        setLoading(false);
        toast.error(err.message, {
          position: 'middle-center'
        });
    }
  });
  const initTradeCancel = useCallback(async() => {
    try{
      setLoading(true);
      toast.success("Wait, blockchain is processing transaction", {
        position: 'middle-center'
      });
      if(trade.type=="sell"){
        await cancel(id);
      }else{
        await cancelBuy(id);
      } 
    }catch(err){
        setLoading(false);
        toast.error(err.message, {
          position: 'middle-center'
        });
    }
  });
  const initSendMessage = useCallback(async() => {
    try{
        const {data:response} = await axios.post(MESSAGE_URL,{
          tradeId:id,
          message:message
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        if(response.error){
          toast.error(response.error, {
            position: 'middle-center'
          });
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center'
          });
        }
        if(response.success){
          initTrade.emit('trademessage', {'tradeID':id});
        }
    }catch(err){
        toast.error(err.message, {
          position: 'middle-center'
        });
     }
  });
  const tradeDetails = {
    trade
  }
  useEffect(()=>{  
    initTrade.emit('inittraderoom',id);
    initTrade.on('tradesettled', (data) => {
      window.location.reload();
      setLoading(false);
    });

    initTrade.on('tradepaidconfirmed', (data) => {
      window.location.reload();
      setLoading(false);
    });

    initTrade.on('newmessage', (data) => {
      fetchMessages();
    });
    fetchTrade();
  },[token])

    return (
        <>
         <Toaster containerStyle={{ position: 'absolute' }} />
         <div class="overlay" style={{display:loading?'block':'none'}}>
            <div class="spinner"></div>
            <br/>
            Please Wait...
         </div>

          <Sidebar account={account}/>
           <div className="offcanvas-overly"></div>

           <div className="modal fade" id="transferAssetModal" tabIndex="-1" aria-labelledby="transferAssetModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Asset Release</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                     Are you sure you want to release asset to buy? Click on the Proceed Button below 
                  </div>

                  <div className="col-xs-12 col-sm-12 text-center mt-20">
                     <button className="btn-dex btn-success btn-dex-primary"
                     onClick={(e)=>{
                      e.preventDefault();
                      initTransferAsset();
                    }}
                    >Proceed</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>


          <div className="modal fade" id="transferFiatModal" tabIndex="-1" aria-labelledby="transferFiatModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Fiat Transfer</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                     Are you sure you want to mark trade as paid? Click on the Proceed Button below 
                  </div>
                  <div className="col-xs-12 col-sm-12 text-center mt-20">
                     <button className="btn-dex btn-success btn-dex-primary" onClick={(e)=>{
                      e.preventDefault();
                      initTransferFiat();
                    }}
                    >Proceed</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="tradeCancelModal" tabIndex="-1" aria-labelledby="tradeCancelModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Trade Cancel</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                     Are you sure you want to cancel the trade? Click on the Proceed Button below 
                  </div>

                  <div className="col-xs-12 col-sm-12 text-center mt-20">
                     <button className="btn-dex btn-success btn-dex-primary"
                     onClick={(e)=>{
                      e.preventDefault();
                      initTradeCancel();
                    }}
                    >Proceed</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

            <div className="main-content">
             <Header account={account}/>
              <main style={{width:'100%'}}>     
               <section className="sell-nfts-area mb-50 mt-120">
                <div className="container">
                <div className="row">
                {
                 trade!=null ?
                 <div className="col col-12 col-xs-12 col-sm-8 p-30">
                 <div className="row mb-30 mt-20">
                    <div className="col col-6 col-xs-12 col-sm-6">
                          <h3 className="page-title">Trade</h3>
                      </div>
                      <div className="col col-6 col-xs-12 col-sm-6" style={{fontSize:"11px"}}>
                        <span className="label p-0" style={{fontSize:"11px"}}> ID </span>
                        <span className="value p-0"> #{trade._id} </span>
                     </div>
                 </div>

                 <div className="row mb-20">
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Rate </span></div>
                      <div className="d-flex"> <h5 className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.rate["$numberDecimal"])}</h5>&nbsp;<h5 className="value dim">{trade.advert.currency.symbol}</h5></div>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Quantity </span></div>
                      <div className="d-flex"> <h5 className="value">{  new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.unit["$numberDecimal"])}</h5>&nbsp;<h5 className="value dim">{trade.advert.asset.symbol}</h5></div>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Amount </span></div>
                      <div className="d-flex"> <h5 className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.price["$numberDecimal"]) }</h5>&nbsp;<h5 className="value dim"> {trade.advert.currency.symbol} </h5></div>
                    </div>
                </div>
                
                <div className="row mb-20">
                    <div className="trade-record-card p-20 pt-10 pb-20 mb-10">
                        <div className="row mb-20">
                            <div className="col col-12 col-xs-12 col-sm-12 value mb-10">
                             {(()=>{ 
                                if(trade.type==="sell" && trade.seller.address===account){
                                 return ("Please confirm that you have successfully received transfer of the amount from the buyer through the following payment method")
                                }
                                else if(trade.type==="sell" && trade.advert.owner.address===account){ 
                                  return ( "Please confirm that you have successfully transferred the money to the seller through the following payment method")
                                }
                                if(trade.type==="buy" && trade.buyer.address===account){
                                  return ( "Please confirm that you have successfully transferred the money to the seller through the following payment method")
                                }
                                else if(trade.type==="buy" && trade.advert.owner.address===account){ 
                                  return ("Please confirm that you have successfully received transfer of the amount from the buyer through the following payment method")
                                } 
                              })()}
                            </div>

                            <div className="card col col-12 col-xs-12 col-sm-12 p-20 text-dark">
                             <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12 p-10">
                              {(()=>{ 
                              if(trade.type==="sell" && trade.seller.address===account){
                                return ("The following is your payment info. Please make sure the money is transferred and confirm the origin for your safety. Money will not be transferred automatically by the platform")
                              }
                              else if(trade.type==="sell" && trade.advert.owner.address===account){ 
                                return ("The following is the seller's payment info. Please make sure the money is transferred from an amount you own. Money will not be transferred automatically by the platform")
                              }
                              if(trade.type==="buy" && trade.buyer.address===account){
                                return ("The following is the seller's payment info. Please make sure the money is transferred from an amount you own. Money will not be transferred automatically by the platform")
                              }
                              else if(trade.type==="buy" && trade.advert.owner.address===account){ 
                                return ("The following is your payment info. Please make sure the money is transferred and confirm the origin for your safety. Money will not be transferred automatically by the platform")
                              }
                              })()}
                              <br/><br/>
                              <b>
                              
                              {(() => { 
                                if(trade.type==="sell" && trade.seller.address===account){
                                return ("Payment should be made from account name "+trade.advert.owner.username)
                                }
                                else if(trade.type==="sell" && trade.advert.owner.address===account){ 
                                  return ("")
                                }
                                if(trade.type==="buy" && trade.buyer.address===account){
                                return ("")
                                }
                                else if(trade.type==="buy" && trade.advert.owner.address===account){ 
                                  return ("Payment should be made from account name "+trade.buyer.username)
                                }
                               })()}
                               </b>

                               <p>{trade.advert.notes}</p>
                               <span className="btn-dex-small btn-dex-danger">{trade.type==='sell'? trade.advert.paymentMethod.name: trade.advert.paymentMethod.paymentMethod.name}</span> 
                               </div>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 p-10">
                                    {
                                       trade.type==='buy' && trade.advert.paymentMethod.details && 
                                        (()=>{
                                        let det = JSON.parse(trade.advert.paymentMethod.details);
                                        return (
                                        <>
                                        <div className="col col-xs-12 col-sm-12">
                                            {
                                                Object.entries(det).map(([key,index])=>(
                                                  <div className="row" key={index}>
                                                      <div className="col col-6 col-xs-6 label text-end">
                                                        <h6 className="text-dark"> {key} : </h6>
                                                      </div>
                                                      <div className="col col-6 col-xs-6 value text-dark">
                                                      <h6 className="text-dark"> {det[key]}  </h6>
                                                      </div>
                                                  </div>
                                                ))
                                            }
                                        </div>
                                      </>
                                    )
                                   })()
                                  }
                                   
                                  {
                                   trade.type==='sell' && trade.paymentMethod.details && 
                                        (()=>{
                                        let det = JSON.parse(trade.paymentMethod.details);
                                        return (
                                        <>
                                        <div className="col col-xs-12 col-sm-12">
                                            {
                                                Object.entries(det).map(([key,index])=>(
                                                  <div className="row" key={index}>
                                                      <div className="col col-6 col-xs-6 label text-end">
                                                        <h6 className="text-dark"> {key} : </h6>
                                                      </div>
                                                      <div className="col col-6 col-xs-6 value text-dark">
                                                      <h6 className="text-dark"> {det[key]}  </h6>
                                                      </div>
                                                  </div>
                                                ))
                                            }
                                        </div>
                                      </>
                                    )
                                   })()
                                }
                              </div>  
                            </div>
                        </div>
                    </div>
                </div>


                  <div className="row mb-10">
                      <div className="col col-12 col-xs-12 col-sm-12 text-white">
                        {trade.advert?.deadline && trade.disputed===false?<Timer time={trade.minutesLeft} handler={handleTime}/> : "Trade Disputed"}
                        
                      </div>
                  </div>

                  <div className="row mb-20">
                      <div className="col col-12 col-xs-12 col-sm-12 text-white">
                      {(() => { 
                      if(trade.type==="sell" && trade.settled===false && trade.seller.address===account){
                         return("Buyer is expected to make payment before expiration of time, otherwise, trade will automatically cancel")
                       }
                     if(trade.type==="sell" && trade.settled===false && trade.advert.owner.address===account){ 
                        return("Please make a payment before timer counts down, otherwise, the order will be cancelled")
                       }

                     if(trade.type==="buy" && trade.settled===false && trade.buyer.address===account){
                        return("Please make a payment before timer counts down, otherwise, the order will be cancelled")
                      }
                     if(trade.type==="buy" && trade.settled===false && trade.advert.owner.address===account){ 
                       return("Buyer is expected to make payment before expiration of time, otherwise, trade will automatically cancel")
                      }
                    
                      })()}
                      </div>
                  </div>
              
                  { trade.status=="active" ?
                    <div className="row">
                       {(() => { 
                        
                         if(trade.type==="sell" && trade.settled===false && (trade.paid===false || trade.paid===true) && trade.seller.address===account){ 
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12">
                               <button className="btn-dex btn-success btn-dex-primary" data-bs-toggle="modal"data-bs-target="#transferAssetModal">Release Asset</button>
                              </div>
                              )
                           }
                         if(trade.type==="sell" && trade.settled===false && trade.paid===true && trade.seller.address===account){ 
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12">
                              <span class="text-white mt-10"> <h6> Mark as Paid </h6></span>
                             </div>
                              )
                           }
                         if (trade.type==="sell" && trade.settled===false && trade.paid===false && trade.advert.owner.address===account){
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12">     
                              { trade.disputed===false? <button className="btn-dex btn-success btn-dex-primary" data-bs-toggle="modal"data-bs-target="#transferFiatModal">Transferred, Next</button>:"" } &nbsp;
                              <button className="btn-dex btn-dex-danger" data-bs-toggle="modal"data-bs-target="#tradeCancelModal">Cancel</button>
                            </div>
                             )
                          }
                         if (trade.type==="sell" && trade.settled===false && trade.paid===true && trade.advert.owner.address===account){
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12 d-flex">
                              <button className="btn-dex btn-dex-danger" data-bs-toggle="modal"data-bs-target="#tradeCancelModal">Cancel</button> &nbsp;&nbsp;&nbsp;&nbsp;
                              <span class="text-white mt-10"> <h6> Mark as Paid </h6></span>
                            </div>
                             )
                          }

                      
                          if(trade.type==="buy" && trade.settled===false && (trade.paid===false || trade.paid===true) && trade.advert.owner.address===account){ 
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12">
                               <button className="btn-dex btn-success btn-dex-primary" data-bs-toggle="modal"data-bs-target="#transferAssetModal">Release Asset</button>
                              </div>
                              )
                           }
                        
                         if (trade.type==="buy" && trade.settled===false && trade.paid===false && trade.buyer.address===account){
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12">
                              { trade.disputed===false? <button className="btn-dex btn-success btn-dex-primary" data-bs-toggle="modal"data-bs-target="#transferFiatModal">Transferred, Next</button>: "" }&nbsp;
                              <button className="btn-dex btn-dex-danger" data-bs-toggle="modal"data-bs-target="#tradeCancelModal">Cancel</button>
                            </div>
                             )
                          }
                          if (trade.type==="buy" && trade.settled===false && trade.paid===true && trade.buyer.address===account){
                            return(
                             <div className="col col-12 col-xs-12 col-sm-12 d-flex">
                              <button className="btn-dex btn-dex-danger" data-bs-toggle="modal"data-bs-target="#tradeCancelModal">Cancel</button> &nbsp;&nbsp;
                              <span class="text-white mt-10"> <h6> Mark as Paid </h6></span>
                            </div>
                             )
                          }

                        })()}
                    </div>
                    :
                    <div className="row">
                      <div className="col col-12 col-xs-12 col-sm-12">
                      <span class="text-white mt-10"> <h6>Trade {trade.status} </h6></span>
                      </div>
                    </div>
                 }
  
                    { trade.settled===true?
                     <div className="row mt-30">
                      <div className="col col-12 col-xs-12 col-sm-12">
                          
                      <div className="ratingcard" id="intro">
                
                          <h3>How did the trade go?</h3>
                          <p>
                              Please let others know how trader did. All feedback is appreciated
                              to help us improve our offering!
                          </p>
                          <ul id="options">
                              <li><span className={`option ${score===1? "active" : ""}`} onClick={(e)=>{
                                  setScore(1);
                                }}>1</span></li>
                              <li onClick={(e)=>{
                                  setScore(2);
                                }}><span className={`option ${score===2? "active" : ""}`}>2</span></li>
                              <li onClick={(e)=>{
                                  setScore(3);
                                }}><span className={`option ${score===3? "active" : ""}`}>3</span></li>
                              <li onClick={(e)=>{
                                  setScore(4);
                                }}><span className={`option ${score===4? "active" : ""}`}>4</span></li>
                              <li onClick={(e)=>{
                                  setScore(5);
                                }}><span className={`option ${score===5? "active" : ""}`}>5</span></li>
                          </ul>
                          <form action="#" method="post">
                           <div className="input-group">
                            <input type="text" name="message" placeholder="Type Comment ..." className="form-control" style={{color:"#fff"}} value={comment} onChange={(e)=>{
                               setComment(e.target.value);
                              }}  />
                             <button  onClick={(e)=>{
                                  e.preventDefault();
                                  rateTrade();
                                }}
                                className="btn btn-success btn-flat">Submit</button>
                            </div>
                          </form>
                       </div>
                     
                      </div>
                    </div>:""
                    }
                   
                </div>
                :
                "No Trade found"
                }
                

                {
                 trade!=null ?
                  <div className="col col-12 col-xs-12 col-sm-4 p-10 trade-record-card" style={{minHeight:"100%"}}>      
                   <div className="box direct-chat direct-chat-success" style={{background: "transparent", minHeight:"100%",overflowY:"scroll"}}>
                    <div className="box-body"  style={{height:"500px"}}>
                      <div className="direct-chat-messages" style={{minHeight:"100%"}}>
                        <div className="direct-chat-msg">
                          <div className="direct-chat-info clearfix">
                          </div>
                          { trade.advert.autoreply!=null?
                            <div className="direct-chat-text">
                              {trade.advert.autoreply}
                            </div>:""
                          }
                        </div>
                         {
                            (messages && messages !==[]) ? messages.map((message)=>(
                            <>
                            
                             {(() => { 
                              if(message.sender===account){
                                return(
                              <div className="direct-chat-msg left">
                                <div className="direct-chat-info clearfix">
                                </div>
                                <div className="direct-chat-text">
                                  {message.message}
                                </div>
                              </div>)
                             }
                            else{
                              return(
                               <div className="direct-chat-msg right">
                                <div className="direct-chat-info clearfix">
                                </div>
                                <div className="direct-chat-text">
                                  {message.message}
                                </div>
                              </div>)
                            }
                           })()}
                          
                          </>
                          )):""
                        }
                     </div>
                    </div>
                    <div className="box-footer" style={{position: "absolute",bottom: "0", width:"100%"}}>
                      <form action="#" method="post">
                        <div className="input-group">
                          <input type="text" name="message" placeholder="Type Message ..." className="form-control" style={{color:"#fff"}}
                             onChange={(e)=>{
                               setMessage(e.target.value);
                              }} />
                              <span className="input-group-btn">
                                <button type="submit" className="btn btn-success btn-flat" onClick={(e)=>{
                                  e.preventDefault();
                                  if(message===""){

                                   }
                                  else{
                                  initSendMessage();
                                  }
                                }}>Send</button>
                              </span>
                        </div>
                      </form>
                    </div>
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
