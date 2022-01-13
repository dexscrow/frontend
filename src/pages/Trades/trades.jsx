import{useState,useEffect,useContext} from "react";
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import {Link} from "react-router-dom";
import Sidebar from "../Landing/components/sidebar";
import Nav from "../Landing/components/nav"
import axios from "axios";

const TRADES_URL = process.env.REACT_APP_SERVER_URL+"/trades"

export default function Trades(){
    const [account,_] = useContext(AccountContext);
    const [trades,setTrades] = useState([]);
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(true);
    const token = localStorage.getItem("authToken");
    useEffect(()=>{
        const run = async ()=>{
            const {data:response} = await axios.get(TRADES_URL,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(response.error){
                setIsLoading(false);
                setError(response.error)
            }
            if(!response.success){
                setIsLoading(false);
                setError(response.message)
            }
            setIsLoading(false);
            setTrades(response.data);
        }
        run();
    },[])
    return(
    <>
       <div className="container-fluid body">
        <div className="row flex-nowrap">
                <Sidebar account={account}/>
                 <div className="col py-3 main">
                  <div className="row p-20">
                    <Header account={account}/>
                    </div>
                  
                    <div className="row mb-30 mt-20">
                    <div className="col col-6 col-xs-6 col-sm-6">
                        <h3 className="page-title">Advert List</h3>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-6 text-end">
                        <span className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                Ad Management
                                </span>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><Link class="dropdown-item" to="/ad/create">Create Ad</Link></li>
                                <li><Link class="dropdown-item" to="/ad/list">Ad list</Link></li>
                                </ul>
                    </div>
                    </div>


                   <div className="row">
                    <div className="col col-12 col-xs-12">
                    <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
                         <li >
                             <Link to="/profile" style={{textDecoration:"none"}}>
                                Profile
                             </Link>
                             </li>
                         <li className="active">
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
                    <div className="col col-xs-6 col-sm-2">
                        <label>Asset</label>
                        <select className="form-control no-radius">
                            <option value="all">All Asset</option>
                            <option value="btc">BTC</option>
                            <option value="usdt">USDT</option>
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                        <label>Order Type</label>
                        <select className="form-control no-radius">
                            <option value="all">Buy/Sell</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                        <label>Status</label>
                        <select className="form-control no-radius">
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                            <option value="completed">Completed</option>
                            <option value="canceled">Canceled</option>
                            <option value="disputed">Disputed</option>
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-3">
                        <div className="col col-12"><label>Date</label> </div>
                        <div className="col col-12 d-flex"><input type="date" value="" /><input type="date" value="" /></div>  
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                      <br/>
                      Reset &nbsp; &nbsp; Filter
                    </div>
                  </div>
                </form>


                <div className="row">
                    <div className="trade-record-card pt-10 pb-20">
                        {trades && trades.map((trade)=>(
                            <>
                     <div className="row">
                         
                        <div className="col col-6 col-xs-6 col-sm-2">
                           <b>{trade.advert.priceType}</b> | 2021-12-17 15:11:52
                           <b><u>{trade.uid}</u></b><br/>
                           <span className="label">Asset</span><br/>
                           <span className="value"> {trade.advert.asset}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Fiat Amount</span><br/>
                            <span className="value">{trade.advert.price} NGN</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Price</span><br/>
                            <span className="value">{trade.advert.currencyRate} NGN</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Crypto Amount</span><br/>
                            <span className="value">{trade.unit} {trade.advert.asset}</span>
                        </div>
                        <div className="col col-6 col-xs-6  col-sm-2"><br/><br/>
                            <span className="label">Counterparty</span><br/>
                            <span className="value">{trade.advert.owner}</span>
                        </div>
                        <div className="col  col-6 col-xs-3 col-sm-2"><br/><br/>
                            <span className="label">Status</span><br/>
                            <span className="value">{trade.status}</span><br/><br/>

                            <span className="label">Action</span><br/>
                            <span className="value">View</span>
                        </div>
                    </div>
                    </>
                    ))}
                 </div>
              </div>


            </div>
           </div>


        </div>
       <Nav/>
    </>
    )
}