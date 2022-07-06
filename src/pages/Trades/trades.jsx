import{useState,useContext,useEffect} from "react";
import toast, { Toaster } from 'react-hot-toast';
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import {Link} from "react-router-dom";
import Sidebar from "../Landing/components/sidebar";
import Nav from "../Landing/components/nav";
import Paginate from '../Landing/components/pagination';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const FILTERED_TRADE_URL = process.env.REACT_APP_SERVER_URL+"/trades"

export default function Trades(){
    const [account,_] = useContext(AccountContext);
    const [trades,setTrades] = useState([]);
    const [assets,setAssets] = useState([]);
    const [date,setDate]= useState(new Date());
    const [status,setStatus] = useState("active");
    const [priceType,setPriceType] = useState("buy");
    const [asset,setAsset] = useState("");
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem("authToken");

    const [pageCount, setPageCount] = useState(0);
    const [from,setFrom] = useState(0);
    const [limit,setLimit] = useState(20);

    const getRecords = async()=>{
          try{
          setLoading(true);
          if(token==='null' || token===null || token==='undefined'){
              toast.error("Please connect wallet first", {
                  position: 'middle-center',
              });
              return
          }
          const filters = {
            createdAt:date.toISOString(),status,priceType,asset
          }
          Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
          const q = new URLSearchParams(filters).toString();
          const {data:response} = await axios.post(`${FILTERED_TRADE_URL}/?${q}`,{from,limit},{
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
           setTrades(response.data.trades);
           setPageCount((response.data.count/limit))
          }
          setLoading(false);
          }catch(error){
            toast.error(error.message, {
              position: 'middle-center'
            });
            setLoading(false);
          }
     }

     const getActiveTrades = async()=>{
      try{
      setLoading(true);
      if(token==='null' || token===null || token==='undefined'){
          toast.error("Please connect wallet first", {
              position: 'middle-center',
          });
          return
      }
      const {data:response} = await axios.post(FILTERED_TRADE_URL,{},{
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

     const fetchAssets = async() => {
      try{
        const {data:response} = await axios.get(ASSETS_URL,{
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
        }else{
          setAssets(response.data);
          setAsset(response.data[0]._id);
        } 
    }catch(err){
        toast.error(err.message, {
          position: 'middle-center',
        });
    }
  };

  useEffect(()=>{
    fetchAssets();
  },[token])

  useEffect(()=>{
    getActiveTrades();
  },[asset])
  

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
                    <div className="col-6 col-lg-2 col-md-2 col-sm-4 mb-10">
                        <label>Asset</label>
                        <select className="form-control no-radius" value={asset} onChange={(e)=>{
                          setAsset(e.target.value);
                        }}>
                        <option value="">All Assets</option>
                          {
                            assets && assets.map((asset)=>(
                            <>
                              <option value={asset._id}>{asset.symbol}</option>
                            </>
                            ))
                          }
                        </select>
                    </div>

                    <div className="col-6 col-lg-2 col-md-2 col-sm-4 mb-10">
                        <label>Order Type</label>
                        <select className="form-control no-radius"  value={priceType} onChange={(e)=>{
                          setPriceType(e.target.value);
                        }}>
                        <option value="">--Select Type--</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col-6 col-lg-2 col-md-2 col-sm-4 mb-10">
                        <label>Status</label>
                        <select className="form-control no-radius"  value={status} onChange={(e)=>{
                             setStatus(e.target.value);
                            }}
                             >
                            <option value="">--Select Status--</option>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div className="col-6 col-lg-2 col-md-2 col-sm-6 mb-10">
                        <div className="col col-12"><label>Date</label> </div>
                        <div className="col col-12 d-flex mt-10">
                          <DatePicker type="date" selected={date} onChange={(date) =>{
                            setDate(date);
                          }
                          }  />
                        </div>  
                    </div>

                    <div className="col-6 col-lg-2 col-md-2 col-sm-6 pt-30 d-flex justify-content-end">
                      <span onClick={(e)=>{
                        e.preventDefault();
                        getRecords();
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
                     <div className="trade-record-card pt-10 pb-20 mb-10">
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
               {
                   trades.length>0 && <div className="col col-12 col-xs-12 text-center mt-20"> 
                     <Paginate pageCount={pageCount} setFrom={setFrom} getRecords={getRecords} />
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