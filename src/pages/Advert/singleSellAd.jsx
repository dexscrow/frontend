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

const SELL_AD_URL= process.env.REACT_APP_SERVER_URL+"/sell/singleadvert";
const BUY_TRADE_URL = process.env.REACT_APP_SERVER_URL+"buy/trade";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";

export default function SingleSellAd(){
  const [account,_]= useContext(AccountContext);
  const [ad,setAd] = useState(null);
  const [tradeWarning,setTradeWarning] = useState('');
  const [currentAd,setCurrentAd] = useState({});
  const [error,setError] = useState("");
  const [currency,setCurrency] = useState("");
  const [amount,setAmount]= useState(0);
  const [asset,setAsset] = useState("");
  const [methods,setMethods] = useState([]);
  const [method,setMethod] = useState("");
  const [unit,setUnit] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();

  const initSellTrade = ()=>{
    const run = async ()=>{

      toast.error("You cannot perform trade yet, check back later", {
        position: 'middle-center',
      });

      return

      try{
        const {data:response} = await axios.post(BUY_TRADE_URL+"/"+id,{
          unit,
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
      const {data:response} = await axios.get(SELL_AD_URL+"/"+id,{
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
  }catch(error){
    setError(error.message)
  }
})

  useEffect(()=>{
    fetchAd();
    fetchMethods();
  },[token])
    return (
        <>
         <Toaster containerStyle={{ position: 'absolute' }} />
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
                       <h3 className="page-title"> Ad #{id}</h3>
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

                   <div className="row">
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
                                        { 
                                          methods.filter(method => method._id === ad.paymentMethod.paymentMethod)
                                          .map(method =>  <span class="btn-dex-small btn-dex-danger">{method.name}</span>) 
                                        }
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
                                <span className="value number">{ad.amount["$numberDecimal"]} {ad.currency}</span><br/>
                                <span className="label">Price</span>
                            </div>
                            <div className="col col-12 col-xs-12 mb-10">
                                <span className="value number">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                <span className="label">Amount</span>
                            </div>
                            <div className="col col-12 col-xs-12 mb-10">
                                <span className="value number">{ad.lowerLimit} - {ad.upperLimit} {ad.currency}</span><br/>
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
                                           const unit = e.target.value / ad.amount["$numberDecimal"];
                                           setUnit(unit)
                                          }} />
                                    <span class="input-group-text">{ad.currency}</span>
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
                                      const amount = e.target.value * ad.amount["$numberDecimal"];
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
                                    setTradeWarning('Amount lesser than lower limit');
                                  }
                                  else if(amount>ad.lowerLimit){
                                    setTradeWarning('Amount greater than upper limit');
                                  }
                                  else{
                                  initSellTrade()
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
                  <NavSocial/>
              </div>
            </div>
          </div>
        <Nav/>
        </>
    )
}