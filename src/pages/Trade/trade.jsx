import React,{useContext,useEffect,useState} from 'react'
import Timer from "./components/timer"
import Chat from "./components/chat/chat";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from '../../contexts/account';
import Header from "../Landing/components/header";
import Nav from "../Landing/components/nav";
import axios from "axios";
const token = localStorage.getItem("authToken");

const TRADE_URL= process.env.REACT_APP_SERVER_URL+"/buy/trade"

export default function Trade() {
  const [account,_] = useContext(AccountContext);
  const [error,setError] = useState("");
  const [trade,setTrade] = useState({});
  const [cancelled,setCancelled] = useState(false);

  const handleTime = ()=>setCancelled(true);

  useEffect(()=>{
    const fetchTrade = ()=>{
      const run = async ()=>{
        const {data:response} = await axios.get(TRADE_URL,{
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
        setTrade(response.data)
      }
      run();
    }

    fetchTrade();

  },[account])
    return (
        <>
         <div className="container-fluid body">
        <div className="row flex-nowrap">
        <Sidebar account={account}/>

            <div className="col py-3 main">
                  <div className="row p-20">
                   <Header account={account} />
  
                    </div>

                <div className="row">
                 <div className="trade-record-card mb-10">
                    <div className="row">
                       <div className="col col-12 col-xs-12 col-sm-8 p-30">
                        <div className="row mb-20">
                            <div className="col col-8 col-xs-12 col-sm-8">
                                <h3 className="page-title">Buy Ad</h3>
                            </div>
                            <div className="col col-4 col-xs-12 col-sm-4" style={{fontSize:"11px"}}>
                             <span className="label p-0" style={{fontSize:"11px"}}> ORDER NUMBER </span>
                             <span className="value p-0"> {trade.uid} </span>
                            </div>
                        </div>

                        <div className="row mb-20">
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Rate </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.advert?.currencyRate}</h5>&nbsp;<h5 className="value dim">{trade.advert?.currency}</h5></div>
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Amount </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.price}</h5>&nbsp;<h5 className="value dim">NGN</h5></div>
                           </div>
                           <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Quantity </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.unit}</h5>&nbsp;<h5 className="value dim">{trade.advert?.asset.name}</h5></div>
                           </div>
                        </div>

                        <div className="row mb-20">
                            <div className="trade-record-card p-20 pt-10 pb-20 mb-10">
                                <div className="row mb-20">
                                    <div className="col col-12 col-xs-12 col-sm-12 value mb-10">
                                       Please confirm that you have successfully transferred the money to the seller
                                       through the following payment method
                                    </div>

                                    <div className="card col col-12 col-xs-12 col-sm-12 p-20">
                                        The following is the seller's payment info. Please make sure the money is transferred from an amount
                                        you own. Money will not be transferred automatically by the platform
                                    </div>

                                    <div className="col col-12 col-xs-12 col-sm-12 p-20">
                                        <div className="row mb-20">
                                            <div className="col col-6 col-xs-6 col-sm-3">
                                                <span className="btn-dex-small btn-dex-danger">{trade.advert?.paymentMethod.paymentMethod.name}</span>
                                            </div>
                                            {trade.advert?.paymentMethod && (()=>{
                                              let det = JSON.parse(trade.advert?.paymentMethod.details);
                                               det && Object.entries(det).map(([name,index])=>(
                                                    <>
                                                    <div className="col col-6 col-xs-6 col-sm-3" key={index}>
                                              <span className="label p-0"> {name} </span><br/>
                                              <h6 className="value">{det[name]}</h6>
                                           </div>
                                                    </>
                                                ))
                                            })()
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mb-10">
                            <div className="col col-12 col-xs-12 col-sm-12">
                              {trade.advert?.deadline && <Timer time={trade.advert.deadline} handler={handleTime}/>}
                            </div>
                        </div>

                        <div className="row mb-20">
                            <div className="col col-12 col-xs-12 col-sm-12">
                                Please make a payment before timer counts down, otherwise, the order will be cancelled.
                            </div>
                        </div>


                        { !cancelled ?
                          <div className="row">
                            <div className="col col-12 col-xs-12 col-sm-12">
                              <button className="btn-dex btn-success btn-dex-primary">Transferred, Next</button>
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
                        <Chat/>
                     
                    </div>

                 </div>


              </div>
            </div>
           </div>
     </div>
     <Nav/>
        </>
    )
}
