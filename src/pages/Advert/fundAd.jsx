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
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";

export default function FundAd(){
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

const fundAd = useCallback(async() => {
 
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


  <Sidebar account={account}/>
		 <div className="offcanvas-overly"></div>
		 
		  <div className="main-content">
		  
			<Header account={account}/>
			 <main style={{width:'100%'}}>
			 
			   <section className="sell-nfts-area mb-50 mt-120">
				<div className="container">
				
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
                                          .map(method =>  <span class="btn-dex-small btn-dex-danger text-white">{method.name}</span>) 
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
                                <span className="value number">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100)) } {ad.currency.symbol}</span><br/>
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
                              {ad.funded? <h1>Coin in escrow</h1> :  <h1>No coins in escrow</h1> }
                              {
                                ad.funded? "": <button type="button" value="Update" className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                        e.preventDefault();
                                        fundAd();
                                       }}>Fund Ad</button>
                                }  

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