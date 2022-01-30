import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Avatar from "../../../assets/avatar.png";

const BUY_TRADE_URL = process.env.REACT_APP_SERVER_URL+"buy/trade";

export default function SellAdComp({token,ad}){
    console.log(ad);

    const [clicked,setClicked] = useState(false);
    const [amount,setAmount]= useState(0);
    const [error,setError] = useState("");
    const [currentAd,setCurrentAd] = useState({});
    const [unit,setUnit] = useState(0);
    const navigate = useNavigate();

    const initBuyTrade = ()=>{
        const run = async ()=>{
          try{
            const {data:response} = await axios.post(BUY_TRADE_URL+"/"+currentAd,{
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


    return (
        <>
             <div className="trade-record-card pt-10 pb-20 mb-10">
                 <div className="row">

                            {
                             !clicked && (
                             <>
                              <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                                <div className="row">
                                  <div className="col col-2 col-xs-2">
                                    <img src={Avatar} style={{width:"30px", height:"30px"}} />
                                  </div>
                                  <div className="col col-10 col-xs-10 text-start"> 
                                    <div className="row">
                                        <div className="col col-12 col-xs-12">
                                            <h4 className="username">{ad.owner.username ? ad.owner.username : "annonymous"}</h4>
                                        </div>
                                        <div className="col col-6 col-xs-6 text-end d-flex">
                                            <span className="value">1</span>
                                            <span className="label">Orders</span>
                                            &nbsp; &nbsp; 
                                            <span className="value">Completion</span>
                                            <span className="label">92%</span>
                                        </div>
                                    </div>
                                 </div>
                               </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                              <div className="row">
                                <div className="col col-6 col-xs-6">
                                    <span className="value number">{ad.amount["$numberDecimal"]} {ad.currency}</span><br/>
                                    <span className="label">Price</span>
                                </div>

                                <div className="col col-6 col-xs-6">
                                    <span className="value number">{ad.unit["$numberDecimal"]} {ad.asset.symbol}</span><br/>
                                    <span className="label">Amount</span>
                                </div>
                             </div> 
                            </div>

                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                              <span className="value number">{ad.lowerLimit} - {ad.upperLimit} {ad.currency}</span><br/>
                              <span className="label">Limit</span>
                            </div>

                           <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                               <span className="value ">{ad.paymentMethod.paymentMethod.name}</span>
                              <span className="label">Payment Method</span>
                          </div>
                          
                          <div className="col col-12 col-xs-12 col-sm-1 text-end p-20">
                            <button className="btn-dex-small btn-dex-primary p-10" onClick={(e)=>{
                              setClicked(true);
                              setCurrentAd(ad)
                                }}>{ad.priceType === "sell"?"buy":"sell"}</button>
                          </div> 
                           </>
                          )
                         }
                          


                          {
                          clicked && (
                          <>
                          <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                             <div className="row">
                                  <div className="col col-2 col-xs-2">
                                    <img src={Avatar} style={{width:"30px", height:"30px"}} />
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
                                        <span class="btn-dex-small btn-dex-danger">{ad.paymentMethod.paymentMethod.name}</span>
                                  </div>
                                   
                              </div>
                             </div>


                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
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
                                    <span className="value number">{ad.lowerLimit}{ad.currency} - {ad.upperLimit} {ad.currency}</span><br/>
                                    <span className="label">Limit</span>
                                </div>
                                <div className="col col-12 col-xs-12 mb-10">
                                    <span className="label">Payment Time</span> <span class="value number">{ad.deadline} Minutes</span>
                                </div>
                              </div>
                            </div>

                            <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                                <span className="label"> 
                                <b>Please Read Terms Carefully</b> <br/><br/>
                                 ✔ {ad.notes}
                                </span>
                            </div>

                            <div class="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                              <form >
                              <div class="row"> 
                                <div class="col col-12 col-xs-12 col-sm-12">
                                    <label>I will pay</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" value={amount} aria-label="" onChange={(e)=>setAmount(e.target.value)}/>
                                        <span class="input-group-text"><span class="text-primary" onClick={(e)=>setAmount(ad.balance)}>All</span> {ad.currency}</span>
                                    </div>
                                    <span class="rate-info float-end">&nbsp; </span>
                                </div>
                              </div>

                              <div class="row"> 
                                 <div class="col col-12 col-xs-12 col-sm-12">
                                    <label>I want to receive</label>
                                    <div class="input-group">
                                        <input type="number" class="form-control" aria-label="" value={unit} onChange={(e)=>setUnit(e.target.value)}/>
                                        <span class="input-group-text">{ad.asset.symbol}</span>
                                    </div>
                                    <span class="rate-info float-end"> &nbsp; </span>
                                </div>
                              </div>
                             
                              <div class="row form-row"> 
                                <div class="col col-12 col-xs-12 col-sm-12 d-flex">
                                  <button class="btn-dex-small btn-dex-default" type="button" onClick={(e)=>setClicked(false)}>Cancel</button>&nbsp;
                                  <button class="btn-dex-small btn-dex-primary" type="button"
                                  onClick={(e)=>{
                                    e.preventDefault();
                                    initBuyTrade();
                                  }}
                                  >Buy {ad.asset.symbol}</button>
                                </div>
                              </div>
                              </form>
                            </div>
                            </>
                             )
                            }
                            
                          </div>
                        </div>
        </>
    )

}