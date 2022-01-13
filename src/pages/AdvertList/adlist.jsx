import React,{useContext,useState,useEffect} from 'react'
import Header from '../Landing/components/header'
import Nav from "../Landing/components/nav"
import AccountContext from '../../contexts/account';
import Sidebar from '../Landing/components/sidebar';
import axios from "axios";

const URL = 'http://localhost:8000/adverts'
export default function Adlist() {
    const [account,_] = useContext(AccountContext);
    const [ads,setAds] = useState([]);
    const [error,setError] = useState("");
    const token = localStorage.getItem("authToken");

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
                console.log(response.data)
                setAds(response.data);
            }catch(err){
                setError(err.message)
            }
            
        }
       run();
    },[]);

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
                   <div className="row">
                    <div className="col col-12">
                       <h3 className="page-title">Advert List</h3>
                    </div>
                   </div>
                   <div className="row">
                    <div className="col col-12 col-xs-12">
                     <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
                         <li className="active">Balance & Rating</li>
                         <li>Transactions History </li>
                         <li>Ad Lists</li>
                         <li>Fiat Payment Methods </li>
                     </ul>
                     </div>
                   </div>

                   <form>
                   <div className="row">
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
                        <div className="col col-12 d-flex"><input type="date" /><input type="date" /></div>  
                    </div>

                    <div className="col col-xs-6 col-sm-2">
                      <br/>
                      Reset Filter
                    </div>
                  </div>
                </form>


                <div className="row">
                    <div className="trade-record-card pt-10 pb-20">
                    {
                        ads && ads.map((advert)=>(
                             <>
                     <div className="row">
                        <div className="col col-6 col-xs-6 col-sm-2">
                           <b>{advert.priceType}</b><br/>
                           <b><u>{advert.uid}</u></b><br/>
                           <span className="label">Asset</span><br/>
                           <span className="value"> {advert.asset}/{advert.currency}</span>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3">
                            <span className="label">Amount</span><br/>
                            <span className="value">{advert.amount} {advert.currency}</span><br/>
                            <span className="label">Limit</span><br/>
                            <span className="value">{advert.lowerLimit} - {advert.upperLimit} {advert.currency}</span>
                        </div>

                        <div className="col col-6 col-xs-6 col-sm-2"><br/><br/>
                            <span className="label">Price</span><br/>
                            <span className="value">411.87 USDT</span>
                        </div>

                        <div className="col col-6 col-xs-6  col-sm-2">
                            <br/><span className="label">{advert.paymentMethod.name}</span>
                            {/* <br/><span className="label">Paypal</span><br/> */}
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
