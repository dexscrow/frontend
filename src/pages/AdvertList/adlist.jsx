import React,{useContext,useState,useEffect} from 'react'
import Header from '../Landing/components/header'
import {Link} from "react-router-dom";
import Nav from "../Landing/components/nav"
import AccountContext from '../../contexts/account';
import Sidebar from '../Landing/components/sidebar';
import axios from "axios";
const token = localStorage.getItem("authToken");

const URL = process.env.REACT_APP_SERVER_URL+'/adverts/me';
const ASSETS_URL= process.env.REACT_APP_SERVER_URL+"/assets";


export default function Adlist() {
    const [account,_] = useContext(AccountContext);
    const [ads,setAds] = useState([]);
    const [error,setError] = useState("");
    const [date,setDate]= useState("");
    const [status,setStatus] = useState("");
    const [priceType,setPriceType] = useState("");
    const [asset,setAsset] = useState("");
    const [assets,setAssets] = useState([]);

    const runQuery = ()=>{
        const run = async ()=>{
          try{
            
          const filters = {
            createdAt:date,status,priceType,asset
          }
          Object.keys(filters).forEach(k => (!filters[k] && filters[k] !== undefined) && delete filters[k]);
          const q = new URLSearchParams(filters).toString();
          console.log(q)
          const {data:response} = await axios.get(`${URL}/?${q}`,{
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
        };

        
        run();
      }

    useEffect(()=>{
        const run = async()=>{
            try{
                const {data:response} = await axios.get(URL,{
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
                console.log(response)
                setAds(response.data);
            }catch(err){
                setError(err.message)
            }
            
        }
        const fetchAssets = async ()=>{
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
            console.log(response.data)
            setAssets(response.data);
        }catch(err){
            setError(err.message)
        }
        }
       run();
       fetchAssets();
    },[URL]);

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
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><Link className="dropdown-item" to="/ad/create">Create Ad</Link></li>
                                <li><Link className="dropdown-item" to="/ad/list">Ad list</Link></li>
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
                         <li>
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
                        <select className="form-control no-radius"  value={asset} onChange={(e)=>setAsset(e.target.value)}>
                             <option value="">All Asset</option>
                            {
                              assets && assets.map((asset)=>(
                                <>
                                  <option value={asset.symbol} key={asset._id}>{asset.symbol}</option>
                                </>
                              ))
                            }
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                        <label>Order Type</label>
                        <select className="form-control no-radius"  value={priceType} onChange={(e)=>setPriceType(e.target.value)}>
                            <option value="">All</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                        <label>Status</label>
                        <select className="form-control no-radius"  value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div className="col col-xs-6 col-sm-3">
                        <div className="col col-12"><label>Date</label> </div>
                        <div className="col col-12 d-flex"><input type="date" value={date} onChange={e=>setDate(new Date(e.target.value).toISOString())}/></div>  
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                      <span type="button" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                        e.preventDefault();
                        runQuery();
                        }}> Run Query</span>
                    </div>
                    <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                      <span type="button" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                        setDate("");
                        setStatus("");
                        setPriceType("");
                        setAsset("");
                      }}> Reset Filter </span>
                    </div>
                  </div>
                </form>
                <div className="row">
                    <div className="trade-record-card pt-10 pb-20">
                    {
                        ads !== [] ? ads.map((advert)=>(
                             <>
                     <div className="row" key={advert._id}>
                        <div className="col col-6 col-xs-6 col-sm-2">
                           <b>{advert.priceType}</b><br/>
                           <b><u>{advert.uid}</u></b><br/>
                           <span className="label">Asset</span><br/>
                           <span className="value"> {advert.asset}/{advert.currency}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3">
                            <span className="label">Amount</span><br/>
                            <span className="value">{advert.unit} {advert.asset}</span><br/>
                            <span className="label">Limit</span><br/>
                            <span className="value">{advert.lowerLimit} - {advert.upperLimit} {advert.currency}</span>
                        </div>

                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Price</span><br/>
                            <span className="value">{advert.amount} {advert.currency}</span>
                        </div>

                        <div className="col col-6 col-xs-6  col-sm-2">
                            <br/><span className="label">{advert.paymentMethod.name}</span>
                        </div>

                        <div className="col  col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Status</span><br/>
                            <span className="value" data-bs-toggle="modal" data-bs-target="#confirmPublishModal">{advert.status}</span><br/><br/>
                        </div>

                        <div className="col  col-6 col-xs-6 col-sm-1"><br/><br/>
                            <img src="images/delete.svg" style={{width:"20px", height:"20px"}}/>
                             &nbsp;&nbsp;
                            <img src="images/edit.svg" style={{width:"20px", height:"20px"}}/>
                        </div>
 
                    </div>
                    </>
                        ))
                      :
                      <div className='row d-flex justify-content-center align-items-center'>
                        <span className="text-center">No Advert</span>
                      </div>
                      }
                 </div>
              </div>
            </div>
           </div>
     </div>
     <Nav/>
        </>
    )
}
