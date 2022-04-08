import React,{useContext,useState,useEffect,useCallback} from "react";
import socketIOClient from "socket.io-client";
import {Link,useNavigate,useParams} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png";
import Nav from "../Landing/components/nav";
import NavSocial from "../Landing/components/navsocial";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT;
const BUY_AD_URL = process.env.REACT_APP_SERVER_URL+"/buy/singleadvert";
const SELL_TRADE_URL = process.env.REACT_APP_SERVER_URL+"/sell/trade";
const MY_PAYMENT_METHODS_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment";

export default function SingleBuyAd(){
    const [account,_]= useContext(AccountContext);
    const [ad,setAd] = useState(null);
    const [tradeWarning,setTradeWarning] = useState('');
    const [assetBalance,setAssetBalance] = useState(0);
    const [error,setError] = useState("");
    const [amount,setAmount]= useState(0);
    const [unit,setUnit] = useState(0);
    const [paymentMethods,setPaymentMethods]= useState([]);
    const [selectedMethod,setSelectedMethod] = useState({})
    const navigate = useNavigate();
    const {id} = useParams();

    const initSellTrade = ()=>{

      const run = async ()=>{
        try{
          const {data:response} = await axios.post(SELL_TRADE_URL+"/"+id,{
            unit,
            paymentMethod:selectedMethod
          },{
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
          console.log(response);
          
          //subscribe to Initialize trade, waiting for blockchain transaction to process
          const initTrade = socketIOClient(SOCKET_ENDPOINT+"/initTrade");
          initTrade.on("connect", function(){
            initTrade.emit('joinInitTrade',response.result._id);
          });

          //navigate("/trade/"+response.result._id);
      }catch(err){
          setError(err.message)
      }
      }
      run();
    }

    const fetchAd = useCallback(async() => {
      try{
        const {data:response} = await axios.get(BUY_AD_URL+"/"+id,{
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
        setAd(response.data);
      }catch(error){
        setError(error.message)
      }
    })

  const fetchMyPaymentMethods  = useCallback(async() => {
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

    useEffect(()=>{
      setAssetBalance(5);
      fetchAd();
      fetchMyPaymentMethods();
    },[token])

    return (
        <>
         <Toaster containerStyle={{ position: 'absolute' }} />
		 
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
                              <div className="col col-12 col-xs-12 col-sm-4 pt-10">
                             <div className="row">
                                  <div className="col col-2 col-xs-2">
                                    <img src={Avatar} style={{width:"30px", height:"30px"}} />
                                  </div>
                                  <div className="col col-10 col-xs-10 text-start"> 
                                    <div className="row">
                                        <div className="col col-12 col-xs-12">
                                            <span className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</span>
                                        </div>
                                        <div className="col col-6 col-xs-6 text-end d-flex">
                                            <span className="value">{ad.unit["$numberDecimal"]}</span> &nbsp;
                                            <span className="label">Orders</span>
                                            &nbsp; &nbsp; 
                                            <span className="value">Completion</span>&nbsp;
                                            <span className="label">92%</span>
                                        </div>
                                    </div>
                                  </div>

                                  <div class="col col-12 col-xs-12 text-start"> 
                                        <span class="label"> Payment Method</span> <br/>
                                        <span class="btn-dex-small btn-dex-default">{ad.paymentMethod.name}</span>
                                  </div>

                                  <div className="col col-12 col-xs-12 col-sm-12 mb-20 mt-10 pt-10">
                                      <span className="label p-0"> 
                                      <b>Please Read Terms Carefully</b> <br/><br/>
                                      ✔ {ad.notes}
                                      </span>
                                  </div>
                                   
                              </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-4 mb-10 pt-20">
                              <div className="row">
                                <div className="col col-12 col-xs-12 mb-10">
                                    <span className="label p-0">Price</span><br/>
                                    <span className="value number p-0">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100)) }  {ad.currency.symbol}</span><br/>
                                </div>
                                <div className="col col-12 col-xs-12 mb-10">
                                   <span className="label p-0">Amount</span><br/>
                                   <span className="value number p-0">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                   
                                </div>
                                <div className="col col-12 col-xs-12 mb-10">
                                    <span className="label p-0">Limit</span><br/>
                                    <span className="value number p-0">{ad.lowerLimit} - {ad.upperLimit} {ad.currency.symbol}</span><br/>
                                   
                                </div>
                                <div className="col col-12 col-xs-12 mb-10">
                                    <span className="label p-0">Payment Time</span><br/>
                                    <span class="value number p-0">{ad.deadline} Minutes</span>
                                </div>
                              </div>
                            </div>

                           

                            <div class="col col-12 col-xs-12 col-sm-4 mb-20 pt-20">
                              <form >
                              <div class="row"> 
                                  <div class="col col-12 col-xs-12 col-sm-12">
                                      <label>I want to recieve</label>
                                      <div class="input-group">
                                          <input type="number" class="form-control" value={amount} aria-label="" onChange={(e)=>{
                                           setAmount(e.target.value);
                                           const unit = e.target.value /  (ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100));
                                           setUnit(unit)
                                          }}/>
                                          <span class="input-group-text"> {ad.currency.symbol}</span>
                                      </div>
                                      <span class="rate-info text-center text-danger"> {tradeWarning} </span>
                                  </div>
                              </div>

                              <div class="row"> 
                                  <div class="col col-12 col-xs-12 col-sm-12">
                                      <label>I will sell</label>
                                      <div class="input-group">
                                          <input type="number" class="form-control" aria-label="" value={unit} onChange={(e)=>{
                                            setUnit(e.target.value);
                                            const amount = e.target.value *  (ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100));
                                            setAmount(amount);
                                            }}/>
                                          <span class="input-group-text"><span class="text-white" onClick={(e)=>{
                                            setUnit(assetBalance);
                                            const amount =  (ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100)) * assetBalance;
                                            setAmount(amount);
                                          }}>All &nbsp; </span> {ad.asset.symbol}</span>
                                      </div>
                                      <span class="rate-info float-end"> &nbsp; </span>
                                  </div>
                              </div>
                              <div class="row"> 
                                  <div class="col col-12 col-xs-12 col-sm-12">
                                    <label class="mb-10"> Payment Method</label>
                                    <select name="paymentmethod" class="form-control" onChange={(e)=>{ setSelectedMethod(e.target.value)}}>
                                    <option value="">--Select Payment Method-- </option>
                                        {
                                          paymentMethods && paymentMethods.map((method)=>{
                                          let details = JSON.parse(method.details);
                                          //console.log(Object.entries(details))
                                          return (
                                            <>
                                            <option value={method._id}>{method.paymentMethod.name} ({Object.entries(details)[0][1]}) </option>
                                            </>
                                          )
                                          }
                                          )
                                        }
                                    </select>
                                      <span class="rate-info float-end"> &nbsp; </span>
                                  </div>
                              </div>

                              <div class="row form-row"> 
                                  <div class="col col-12 col-xs-12 col-sm-12 d-flex">
                                  <Link className="btn-dex-small btn-dex-default" type="button"
                                    to={{ pathname:'/ad/buy/'}}> 
                                        Cancel
                                  </Link>&nbsp;
                                  <button class="btn-dex-small btn-dex-primary" type="button"
                                      onClick={(e)=>{
                                        e.preventDefault();
                                        if(amount<ad.lowerLimit){
                                          setTradeWarning('Amount lesser than lower limit');
                                        }
                                        else if(amount>ad.upperLimit){
                                          setTradeWarning('Amount greater than upper limit');
                                        }
                                        else{
                                        initSellTrade()
                                        }
                                      }}
                                    >Sell {ad.asset.symbol}</button>
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
                          Advert not found 
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