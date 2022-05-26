import{useState,useEffect,useContext} from "react";
import toast, { Toaster } from 'react-hot-toast';
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import {Link} from "react-router-dom";
import Sidebar from "../Landing/components/sidebar";
import Nav from "../Landing/components/nav"
import axios from "axios";

const TRADES_URL = process.env.REACT_APP_SERVER_URL+"/trades"
const FILTERED_TRADE_URL = process.env.REACT_APP_SERVER_URL+"/trades"

export default function Trades(){
    const [account,_] = useContext(AccountContext);
    const [trades,setTrades] = useState([]);
    const [error,setError] = useState("");
    const [date,setDate]= useState("");
    const [status,setStatus] = useState("active");
    const [priceType,setPriceType] = useState("");
    const [asset,setAsset] = useState("");
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem("authToken");

    const runQuery = ()=>{
        const run = async ()=>{
          setLoading(true);
          try{
          if(token==='null' || token===null || token==='undefined'){
              toast.error("Please connect wallet first", {
                  position: 'middle-center',
              });
              return
          }
          const filters = {
            createdAt:date,status,priceType,asset
          }
          Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
          const q = new URLSearchParams(filters).toString();
          const {data:response} = await axios.get(`${FILTERED_TRADE_URL}/?${q}`,{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          
          if(response.error){
            toast.error(response.error, {
              position: 'middle-center'
            });
          }
  
          if(!response.success){
            toast.error(response.message, {
              position: 'middle-center'
            });
          }else{
           setTrades(response.data);
          }
          setLoading(false);
          }catch(error){
            toast.error(error.message, {
              position: 'middle-center'
            });
            setLoading(false);
          }
        }
        run();
      }

    useEffect(()=>{
        /*const run = async ()=>{
            setLoading(true);
            if(token==='null' || token===null || token==='undefined'){
              return
            }
            const {data:response} = await axios.get(TRADES_URL,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message)
            }else{
            setTrades(response.data);
            }
            setLoading(false);
        }
        run();*/
    },[])
    return(
    <>
     <Toaster containerStyle={{ position: 'absolute' }} />
     <div class="overlay" style={{display:loading?'block':'none'}}>
				<div class="spinner"></div>
				<br/>
				Loading...
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
                        <h3 className="page-title">Trades</h3>
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
                         <li>
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

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <label>Asset</label>
                        <select className="form-control no-radius"  value={asset} onChange={(e)=>setAsset(e.target.value)}>
                            <option value="">--Select Asset--</option>
                            <option value="BTCB">BTCB</option>
                            <option value="ETH">ETH</option>
                            <option value="SOL">SOL</option>
                            <option value="BTCB">BNB</option>
                            <option value="USDT">USDT</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <label>Order Type</label>
                        <select className="form-control no-radius"  value={priceType} onChange={(e)=>setPriceType(e.target.value)}>
                        <option value="">--Select Type--</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <label>Status</label>
                        <select className="form-control no-radius"  value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="">--Select Status--</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <div className="col col-12"><label>Date</label> </div>
                        <div className="col col-12 d-flex"><input type="date" value={date} onChange={e=>setDate(new Date(e.target.value).toISOString())}/></div>  
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-start">
                      <br/><span onClick={(e)=>{
                        e.preventDefault();
                        runQuery();
                        }}> Filter</span>
                       &nbsp; &nbsp;
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
                    
                     trades.length>0 ? trades.map((trade)=>(
                     <>
                     <div className="trade-record-card pt-10 pb-20">
                     <div className="row">
                         
                        <div className="col col-6 col-xs-6 col-sm-2">
                           <b>{trade.type}</b> <br/>
                           <b><u> <Link className="text-white"
                              to={{ pathname:'/trade/'+trade._id, state:{id:trade._id}}}> 
                              #{trade._id}
                            </Link></u></b><br/>
                           <span className="label">Asset</span><br/>
                           <span className="value"> {trade.advert.asset.symbol}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Rate</span><br/>
                            <span className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.rate["$numberDecimal"])} &nbsp; {trade.advert.currency.symbol}</span>
                        </div>
                       
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Quantity </span><br/>
                            <span className="value">{  new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.unit["$numberDecimal"])} {trade.advert.asset.symbol}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Price</span><br/>
                            <span className="value">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(trade.price["$numberDecimal"]) } &nbsp;  {trade.advert.currency.symbol}</span>
                        </div>
                        <div className="col col-6 col-xs-6  col-sm-2"><br/><br/>
                            <span className="label">Counterparty</span><br/>
                            <span className="value">{trade.advert.owner.username}</span>
                        </div>
                        <div className="col  col-6 col-xs-3 col-sm-2"><br/><br/>
                            <span className="label">Status</span><br/>
                            <span className="value">{trade.status}</span><br/><br/>

                            <span className="label">Action</span><br/>
                            <span className="value">
                             <Link className=""
                              to={{ pathname:'/trade/'+trade._id, state:{id:trade._id}}}> 
                               View
                            </Link>
                            </span>
                        </div>
                      </div>
                     </div>
                    </>
                    ))
                    :
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                     <div className="row d-flex justify-content-center align-items-center">
                      <span className="text-center">
                       No Trade Found
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