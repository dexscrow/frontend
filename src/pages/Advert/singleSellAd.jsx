import React,{useContext,useState,useEffect,useCallback} from "react";
import socketClient from "socket.io-client";
import {Link,useNavigate,useParams} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png";
import Nav from "../Landing/components/nav";
import NavSocial from "../Landing/components/navsocial";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
import {createBuyTrade} from '../../helpers/buytrade';
const token = localStorage.getItem("authToken");
const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;
const SELL_AD_URL= process.env.REACT_APP_SERVER_URL+"/sell/singleadvert";
const BUY_TRADE_URL = process.env.REACT_APP_SERVER_URL+"/buy/trade";
const initTrade = socketClient(SOCKET_ENDPOINT+"/initTrade");

export default function SingleSellAd(){
  const [account,_]= useContext(AccountContext);
  const [ad,setAd] = useState(null);
  const [tradeAmount,setTradeAmount] = useState(0);
  const [tradeWarning,setTradeWarning] = useState('');
  const [error,setError] = useState("");
  const [amount,setAmount]= useState(0);
  const [unit,setUnit] = useState(0);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const buyTrade = async(a,tradeID) => {
  try{
        initTrade.emit('inittraderoom',tradeID);
        initTrade.on('tradeinitialized', (data) => {
          navigate("/trade/"+tradeID);
          setLoading(false);
        });

        await createBuyTrade(tradeID,ad._id,a);
        toast.success("Waiting for confirmation", {
            position: 'middle-center',
          });
          return;
          //window.location.reload();
   }catch(error){
        toast.error(error.message, {
          position: 'middle-center',
        });
        setLoading(false);
   }
};

  const initBuyTrade = ()=>{
    const run = async ()=>{
      try{
        setLoading(true);  
        var {data:response} = await axios.get(SELL_AD_URL+"/"+id,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })

        if(response.error){
          toast.error(response.error, {
            position: 'middle-center',
          });
          setLoading(false);
        }
        if(!response.success){
          toast.error(response.message, {
            position: 'middle-center',
          });
          setLoading(false);
        }  
        
       if(response.success){
            setAd(response.data);
             if(unit > ad.balance){
              toast.error("Ad require less amount than you specified", {
                position: 'middle-center',
              });
              return;
             }
             if(ad.status!="active"){
              toast.error("Ad is not active", {
                position: 'middle-center',
              });
              setLoading(false);
              return;
           }
  
           var {data:response} = await axios.post(BUY_TRADE_URL+"/"+id,{
            unit,
            seller:ad.owner._id
          },{
              headers:{
                  "Authorization":`Bearer ${token}`
              }
          });
          
          if(response.error){
            toast.error(response.error, {
              position: 'middle-center',
            });
            setLoading(false);
          }
          if(!response.success){
            toast.error(response.message, {
              position: 'middle-center',
            });
            setLoading(false);
          }          
          if(response.success){
           buyTrade(response.result.amount,response.result._id);   
          }  
        }
        //navigate("/trade/"+response.result._id);
    }catch(err){
        toast.error(err.message, {
          position: 'middle-center',
        });
        setLoading(false);
     }
    }
    run();
  }

  const fetchAd = useCallback(async() => {
    try{
      const {data:response} = await axios.get(SELL_AD_URL+"/"+id,{
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
          setAd(response.data);
      }
    }catch(error){
      toast.error(error.message, {
        position: 'middle-center',
      });
    }
  })

 useEffect(()=>{
    fetchAd();
  },[])
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
		 
		  <div className="main-content">
		  
			<Header account={account}/>
			 <main style={{width:'100%'}}>
			
				<section className="sell-nfts-area mb-50 mt-120">
				  <div className="container">
				   <div className="row mb-30 mt-20">
              <div className="col col-6 col-xs-6 col-sm-6">
                  <h3 className="page-title">Ad #{id}</h3>
              </div>
              <div className="col col-6 col-xs-6 col-sm-6 text-end">
              
              </div>
            </div>
				  
				  
				   <div className="row p-10">
                       {
                          ad!=null?
                         <div className="trade-record-card pt-10 pb-10 mb-10">
                         <div className="row">
                          <div className="col col-12 col-xs-12 col-sm-4 mb-20 pt-10">
                            <div className="row">
                              <div className="col col-2 col-xs-2">
                                <img src="{Avatar}" style={{width:"30px", height:"30px"}} />
                              </div>
                              <div className="col col-10 col-xs-10 text-start"> 
                                 <div className="row">
                                        <div className="col col-12 col-xs-12">
                                            <span className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</span>
                                        </div>
                                        <div className="col col-6 col-xs-6 text-end d-flex">
                                            <span className="value">{ad.owner.completedTrades}</span> &nbsp;
                                            <span className="label">Orders</span>
                                            &nbsp; &nbsp; 
                                            <span className="value">Completion</span>&nbsp;
                                            <span className="label">{isNaN((ad.owner.completedTrades * 100)/(ad.owner.completedTrades + ad.owner.incompleteTrades))? "0":  new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((ad.owner.completedTrades * 100)/(ad.owner.completedTrades + ad.owner.incompleteTrades))}% </span>
                                        </div>
                                    </div>
                              </div>
                            
                              <div class="col col-12 col-xs-12 text-start"> 
                                     <span class="label"> Payment Method</span> <br/>
                                     <span class="btn-dex-small btn-dex-default">
                                        { ad.paymentMethod.paymentMethod.name }
                                      </span>
                              </div>

                              <div className="col col-12 col-xs-12 col-sm-12 mb-20 pt-20">
                                <span className="label"> 
                                <b>Please Read Terms Carefully</b> <br/><br/>
                                  ✔ {ad.notes}
                                </span>
                              </div>
                                
                            </div>
                          </div>


                          <div className="col col-12 col-xs-12 col-sm-4 mb-20 pt-20">
                          <div className="row">
                            <div className="col col-12 col-xs-12 mb-10">
                                <span className="value number">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100)) }  {ad.currency.symbol}</span><br/>
                                <span className="label">Price</span>
                            </div>
                            <div className="col col-12 col-xs-12 mb-10">
                                <span className="value number">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                <span className="label">Amount</span>
                            </div>
                            <div className="col col-12 col-xs-12 mb-10">
                                <span className="value number">{ad.lowerLimit} - {ad.upperLimit} {ad.currency.symbol}</span><br/>
                                <span className="label">Limit</span>
                            </div>
                            <div className="col col-12 col-xs-12 mb-10">
                                <span class="value number">{ad.deadline} Minutes</span><br/><span className="label">Payment Time</span> 
                            </div>
                          </div>
                          </div>

                          <div class="col col-12 col-xs-12 col-sm-4 mb-20 pt-20">
                          <form >
                          <div class="row"> 
                            <div class="col col-12 col-xs-12 col-sm-12">
                                <label>I will pay</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" value={amount} aria-label="" onChange={(e)=>{
                                           setAmount(e.target.value);
                                           const unit = e.target.value / (ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100))
                                           setUnit(unit)
                                          }} />
                                    <span class="input-group-text">{ad.currency.symbol}</span>
                                </div>
                                <span class="rate-info float-end">&nbsp; </span>
                            </div>
                          </div>

                          <div class="row"> 
                              <div class="col col-12 col-xs-12 col-sm-12">
                                <label>I want to receive</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" aria-label="" value={unit} onChange={(e)=>{
                                      setUnit(e.target.value);
                                      const amount = e.target.value *  (ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100));
                                      setAmount(amount);
                                      }}/>
                                    <span class="input-group-text">{ad.asset.symbol}</span>
                                </div>
                                <span class="rate-info float-end"> &nbsp; </span>
                            </div>
                          </div>

                          <div class="row form-row"> 
                            <div class="col col-12 col-xs-12 col-sm-12 d-flex">
                            <Link className="btn-dex-small btn-dex-default" type="button"
                              to={{ pathname:'/ad/sell/'}}> 
                                  Cancel
                            </Link>&nbsp;
                            <button class="btn-dex-small btn-dex-primary" type="button"
                                onClick={(e)=>{
                                  e.preventDefault();
                                  if(amount<ad.lowerLimit){
                                    toast.error("Amount lesser than ad lower limit", {
                                      position: 'middle-center',
                                   });
                                   // setTradeWarning('Amount lesser than lower limit');
                                  }
                                  else if(amount>ad.upperLimit){
                                    toast.error("Amount greater than ad upper limit", {
                                      position: 'middle-center',
                                   });
                                   //setTradeWarning('Amount greater than upper limit');
                                  }
                                  else{
                                  initBuyTrade();
                                  }
                                }}
                              >Buy {ad.asset.symbol}</button>

                           </div>
                          </div>
                          </form>
                          </div>
                          </div>
                          </div>
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
                  </div>
				</section>
		     </main>
	       <Nav/>
	     </div>
			  
        </>	  
    )
}