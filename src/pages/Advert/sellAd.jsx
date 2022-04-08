import React,{useContext,useState,useEffect,useCallback} from "react";
import {Link,useNavigate} from "react-router-dom";
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png";
import Nav from "../Landing/components/nav";
import NavSocial from "../Landing/components/navsocial";
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const SELL_ADS_URL= process.env.REACT_APP_SERVER_URL+"/sell/adverts";
const FILTERED_AD_URL = process.env.REACT_APP_SERVER_URL+"/sell/adverts";
const ASSETS_URL = process.env.REACT_APP_SERVER_URL+"/assets";
const CURRENCIES_URL = process.env.REACT_APP_SERVER_URL+"/countries";
const BUY_TRADE_URL = process.env.REACT_APP_SERVER_URL+"buy/trade";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";

export default function SellAd(){
  const [account,_]= useContext(AccountContext);
  const [ads,setAds] = useState([]);
  const [error,setError] = useState("");
  const [currency,setCurrency] = useState("");
  const [asset,setAsset] = useState("");
  const [currencies,setCurrencies] = useState([]);
  const [assets,setAssets] = useState([]);
  const [methods,setMethods] = useState([]);
  const [method,setMethod] = useState("");
  const [methodName,setMethodName] = useState("");
  const navigate = useNavigate();

  const runQuery = useCallback(async() => {
      try{
      const filters = {
        currency,paymentMethod:method,asset
      }
      Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
      const q = new URLSearchParams(filters).toString();
      const {data:response} = await axios.get(`${FILTERED_AD_URL}/?${q}`,{
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
      setAds(response.data);
      }catch(error){
        setError(error.message)
      }
  });

  const fetchAds = useCallback(async() => {
    try{
      const {data:response} = await axios.get(SELL_ADS_URL,{
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
      console.log(response.data)
      setAds(response.data);
    }catch(error){
      setError(error.message)
    }
  });

  const fetchAssets = useCallback(async() => {
    try{
      const {data:response} = await axios.get(ASSETS_URL,{
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
      setAssets(response.data);
      setAsset(response.data[0]._id);
  }catch(err){
      setError(err.message)
  }
});

const fetchCurrencies = useCallback(async() => {
  try{
    const {data:response} = await axios.get(CURRENCIES_URL,{
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
  setCurrencies(response.data);
  setCurrency(response.data[0].symbol);
  }catch(error){
    setError(error.message)
  }
});


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
    setMethod(response.data[0]._id);
    setMethodName(response.data[0].name);
    await runQuery();
  }catch(error){
    setError(error.message)
  }
});

  useEffect(()=>{
    fetchAssets();
    fetchCurrencies();
    fetchMethods();
  },[token])
    return (
        <>
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
					   <div className="row">
						 <div className="row">
                           <div className="col col-6 col-xs-6 col-sm-6">
							   <h3 className="page-title">Buy Ads</h3>
							</div>
							<div className="col col-6 col-xs-6 col-sm-6 text-end">
								   <button className="btn-dex btn-dex-default dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
									  Ad Management
									</button>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
									  <li><Link className="dropdown-item" to="/ad/create">Create Ad</Link></li>
									  <li><Link className="dropdown-item" to="/ad/list">Ad list</Link></li>
									</ul>
							</div>
                        </div>   
					</div>
					
					
                   <form>
					   <div className="row mt-30 mb-20">
						<div className="col col-6 col-xs-6 col-sm-2 mb-10">
						   <Link to="/ad/sell" className="btn-dex btn-dex-default p-10">Buy</Link> 
						   &nbsp;&nbsp;
						   <Link to="/ad/buy" className="btn-dex btn-dex-primary p-10">Sell</Link>
						</div>

						<div className="col col-6 col-xs-6 col-sm-2 mb-10">
							
						</div>

						<div className="col col-6 col-xs-6 col-sm-2 mb-10">
							<select className="form-control no-radius" value={asset} onChange={(e)=>setAsset(e.target.value)}>
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

						<div className="col col-6 col-xs-6 col-sm-2">
							<select className="form-control no-radius" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
							<option value="">All Currencies</option>
								{
								  currencies && currencies.map((currency)=>(
									<>
									  <option value={currency._id}>{currency.symbol}</option>
									</>
								  ))
								}
							</select>
						</div>

						<div className="col col-6 col-xs-6 col-sm-2 mb-10">
						<select className="form-control no-radius" value={method} onChange={(e)=>{
								setMethod(e.target.value);
								methods.filter(method => method._id === e.target.value)
								.map(method =>{ 
								  setMethodName(method.name);
								 }) 
							   }}>
								<option value="">All Payment Methods</option>
								{
								  methods && methods.map((method)=>(
									<>
									<option value={method._id}>{(method.name).toString()}</option>
									</>
								  ))
								}
							</select>
						</div>

						<div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
						  <span className="submit" onClick={(e)=>{
							e.preventDefault();
							runQuery();
						  }} >Filter</span>
						   &nbsp;&nbsp; &nbsp;&nbsp;
						  <span className="submit" onClick={(e)=>{
							setAsset("");
							setCurrency("");
							setMethod("");
						  }} >Reset</span>
						</div>

						<div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
						 
						</div>
					  </div>
					</form>
					
				  
				   <div className="row p-10">
                       {
                         ads ? ads.map((ad)=>{
                          return (
                            <>
                            <div className="trade-record-card pt-10 pb-20 mb-10">
                            <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                                <div className="row">
                                  <div className="col col-2 col-xs-2">
                                    <img src={Avatar} style={{width:"30px", height:"30px"}} />
                                  </div>
                                  <div className="col col-10 col-xs-10 text-start"> 
                                    <div className="row">
                                        <div className="col col-12 col-xs-12 p-10">
                                            <span className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</span>
                                        </div>
                                        <div className="col col-12 col-xs-12 p-10 d-flex mb-0 pb-0">
                                            <span className="label">Orders</span>  &nbsp;
                                            <span className="value">{ad.unit["$numberDecimal"]}</span>
                                        </div>

                                        <div className="col col-12 col-xs-12 p-10 d-flex mt-0 pt-0">
                                           <span className="label">Completion</span>&nbsp;
                                            <span className="value">92%</span>
                                        </div>
                                    </div>
                                 </div>
                               </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                              <div className="row">
                                <div className="col col-6 col-xs-6">
                                    <span className="value number p-0">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(ad.currency.rateToDollar["$numberDecimal"] * ad.asset.rateToDollar["$numberDecimal"] * (ad.factor["$numberDecimal"]/100)) } {ad.currency.symbol}</span><br/>
                                    <span className="label p-0">Price</span>
                                </div>

                                <div className="col col-6 col-xs-6">
                                    <span className="value number p-0">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                    <span className="label p-0">Amount</span>
                                </div>
                             </div> 
                            </div>

                            <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                              <span className="value number p-0">{ad.lowerLimit} - {ad.upperLimit} {ad.currency.symbol}</span><br/>
                              <span className="label p-0">Limit</span>
                            </div>

                           <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20"> 
                              <span className="value p-0"> {methodName}  </span><br/>
                              <span className="label p-0">Payment Method</span>
                          </div>
                          
                          <div className="col col-12 col-xs-12 col-sm-2 text-end p-20">
                            <Link className="btn-dex-small btn-dex-primary" type="button"
                              to={{ pathname:'/ad/sellad/'+ad._id, state:{adId:ad._id}}}> 
                                Buy
                            </Link>
                           </div> 
                           </div>
                           </div>
                           </>
                          )
                         }):
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