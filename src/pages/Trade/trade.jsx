import React,{useContext,useEffect,useState,useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {Link,useNavigate,useParams} from "react-router-dom";
import Timer from "./components/timer"
import Chat from "./components/chat/chat";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from '../../contexts/account';
import Header from "../Landing/components/header";
import Nav from "../Landing/components/nav";
import axios from "axios";
const token = localStorage.getItem("authToken");

const TRADE_URL= process.env.REACT_APP_SERVER_URL+"/trade"

export default function Trade() {
  const [account,_] = useContext(AccountContext);
  const [error,setError] = useState("");
  const [trade,setTrade] = useState(null);
  const [cancelled,setCancelled] = useState(false);
  const {id} = useParams();

 //const handleTime = ()=>swetCancelled(true);

  const fetchTrade = useCallback(async() => {
    try{
      const {data:response} = await axios.get(TRADE_URL+'/'+id,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      if(response.error){
        setError(response.error);
      }
      if(!response.success){
        setError(response.message)
      }
      console.log(response);
      setTrade(response.data);
    }catch(error){
      setError(error.message)
    }
  })

  useEffect(()=>{
    fetchTrade();
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
              
                <div className="row">
                {
                  trade!=null ?
                <div className="col col-8 col-xs-12 col-sm-8 p-30">
              
                 <div className="row mb-30 mt-20">
                    <div className="col col-8 col-xs-12 col-sm-8">
                          <h3 className="page-title">Buy Ad</h3>
                      </div>
                      <div className="col col-4 col-xs-12 col-sm-4" style={{fontSize:"11px"}}>
                        <span className="label p-0" style={{fontSize:"11px"}}> Trade ID </span>
                        <span className="value p-0"> #{trade._id} </span>
                     </div>
                 </div>
                

                 <div className="row mb-20">
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Rate </span></div>
                      <div className="d-flex"> <h5 className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.rate["$numberDecimal"])}</h5>&nbsp;<h5 className="value dim">{trade.advert.currency.symbol}</h5></div>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Amount </span></div>
                      <div className="d-flex"> <h5 className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.price["$numberDecimal"]) }</h5>&nbsp;<h5 className="value dim">NGN</h5></div>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-4">
                      <div> <span className="label p-0"> Quantity </span></div>
                      <div className="d-flex"> <h5 className="value">{  new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.unit["$numberDecimal"])}</h5>&nbsp;<h5 className="value dim">{trade.advert.asset.symbol}</h5></div>
                    </div>
                </div>

                
                <div className="row mb-20">
                    <div className="trade-record-card p-20 pt-10 pb-20 mb-10">
                        <div className="row mb-20">
                            <div className="col col-12 col-xs-12 col-sm-12 value mb-10">
                                Please confirm that you have successfully transferred the money to the seller
                                through the following payment method
                            </div>

                            <div className="card col col-12 col-xs-12 col-sm-12 p-20 text-dark">
                             <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12 p-10">
                                The following is the seller's payment info. Please make sure the money is transferred from an amount
                                you own. Money will not be transferred automatically by the platform <br/><br/>
                                <span className="btn-dex-small btn-dex-danger">{trade.advert.paymentMethod.paymentMethod.name}</span> 
                               </div>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 p-10">
                               {
                                  trade.advert.paymentMethod.details && 
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
                              </div>  
                            </div>

                        </div>
                    </div>
                </div>


                  <div className="row mb-10">
                      <div className="col col-12 col-xs-12 col-sm-12">
                        {//trade.advert?.deadline && <Timer time={trade.advert.deadline} handler={handleTime}/>
                        }
                      </div>
                  </div>

                  <div className="row mb-20">
                      <div className="col col-12 col-xs-12 col-sm-12 text-white">
                          Please make a payment before timer counts down, otherwise, the order will be cancelled.
                      </div>
                  </div>
              
                  { !cancelled ?
                    <div className="row">
                      <div className="col col-12 col-xs-12 col-sm-12">
                        <button className="btn-dex btn-success btn-dex-primary">Transferred, Next</button> &nbsp;
                        <button className="btn-dex btn-dex-danger">Cancel</button>
                      </div>
                    </div>
                    :
                    <div className="row">
                      <div className="col col-12 col-xs-12 col-sm-12">
                      <button className="btn-dex btn-dex-danger">Cancel</button>
                      </div>
                    </div>
                 }

                </div>
                :
                "No Trade found"
                }
                            
               <Chat/>
              </div>

              </div> 
             </section>
           </main>
           <Nav/>
          </div>
       </>
    )
}
