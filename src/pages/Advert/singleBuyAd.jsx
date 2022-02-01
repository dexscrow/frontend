import React,{useContext,useState,useEffect,useCallback} from "react";
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

const BUY_AD_URL = process.env.REACT_APP_SERVER_URL+"/buy/singleadvert";
const SELL_TRADE_URL = process.env.REACT_APP_SERVER_URL+"sell/trade";
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

        toast.error("You cannot perform trade yet, check back later", {
          position: 'middle-center',
        });

        return

        try{
          const {data:response} = await axios.post(SELL_TRADE_URL+"/"+id,{
            unit,
            paymentMethod:selectedMethod,
            price:amount
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
          navigate("/trade");
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
       <div className="container-fluid body">
        <div className="row flex-nowrap">
          <Sidebar account={account}/>
           <div className="col py-3 main">
                  <div className="row p-0">
                    <Header account={account}/>
                   </div>
                   <div className="row mb-30 mt-20">
                    <div className="col col-6 col-xs-6 col-sm-6">
                     <h3 className="page-title">Ad #{id}</h3>
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
                   <div className="row mb-20">
                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                       <Link to="/ad/sell" className="btn-dex btn-dex-primary p-10 pl-30">Buy</Link>
                       &nbsp;&nbsp;
                       <Link to="/ad/buy" className="btn-dex btn-dex-default p-10 pr-30">Sell</Link> 
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                           
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                      
                    </div>
                  </div>
                </form>

                  <div className="row">
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
                                            <h4 className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</h4>
                                        </div>
                                        <div className="col col-6 col-xs-6 text-end d-flex">
                                            <span className="value">{ad.unit["$numberDecimal"]}</span>
                                            <span className="label">Orders</span>
                                            &nbsp; &nbsp; 
                                            <span className="value">Completion</span>
                                            <span className="label">92%</span>
                                        </div>
                                    </div>
                                  </div>

                                  <div class="col col-12 col-xs-12 text-start"> 
                                        <span class="label"> Payment Method</span> <br/><br/>
                                        <span class="btn-dex-small btn-dex-danger">{ad.paymentMethod.name}</span>
                                  </div>

                                  <div className="col col-12 col-xs-12 col-sm-12 mb-20 pt-10">
                                      <span className="label p-0"> 
                                      <b>Please Read Terms Carefully</b> <br/><br/>
                                      ✔ {ad.notes}
                                      </span>
                                  </div>
                                   
                              </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-4 mb-10 pt-20">
                              <div className="row">
                                <div className="col col-12 col-xs-12">
                                    <span className="label p-0">Price</span><br/>
                                    <span className="value number p-0">{ad.amount["$numberDecimal"]} {ad.currency}</span><br/>
                                </div>
                                <div className="col col-12 col-xs-12">
                                   <span className="label p-0">Amount</span><br/>
                                   <span className="value number p-0">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                   
                                </div>
                                <div className="col col-12 col-xs-12">
                                    <span className="label p-0">Limit</span><br/>
                                    <span className="value number p-0">{ad.lowerLimit} - {ad.upperLimit} {ad.currency}</span><br/>
                                   
                                </div>
                                <div className="col col-12 col-xs-12">
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
                                           const unit = e.target.value / ad.amount["$numberDecimal"];
                                           setUnit(unit)
                                          }}/>
                                          <span class="input-group-text"> {ad.currency}</span>
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
                                            const amount = e.target.value * ad.amount["$numberDecimal"];
                                            setAmount(amount);
                                            }}/>
                                          <span class="input-group-text"><span class="text-primary" onClick={(e)=>{
                                            setUnit(assetBalance);
                                            const amount = ad.amount["$numberDecimal"] * assetBalance;
                                            setAmount(amount);
                                          }}>All</span> {ad.asset.symbol}</span>
                                      </div>
                                      <span class="rate-info float-end"> &nbsp; </span>
                                  </div>
                              </div>
                              <div class="row"> 
                                  <div class="col col-12 col-xs-12 col-sm-12">
                                    <label class="mb-10"> Payment Method</label>
                                    <select name="paymentmethod" class="form-control" value={selectedMethod} onChange={(e)=>setSelectedMethod(e.target.value)}>
                                        {
                                          paymentMethods && paymentMethods.map((method)=>(
                                            <>
                                             method.paymentMethod!=null && (
                                             <>
                                              <option value={method._id}>{method.paymentMethod.name} ({method.details.name}) </option>
                                              </>
                                             )
                                            </>
                                          ))
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
                                        else if(amount>ad.lowerLimit){
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
              <NavSocial/>
           </div>
          </div>
         </div>
         <Nav/>
        </>
    )
}