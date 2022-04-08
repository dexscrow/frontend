import {memo} from 'react';
import { calculateFactor, calculatePrice} from '../../../helpers/utils';
import Misc from './misc';
import useFetch from "../../../hooks/useFetch";

const END_POINT = process.env.REACT_APP_SERVER_URL+'/assets';
const TRADE_FEE = process.env.TRADE_FEE;
const BuyTab = memo(({
    step,setStep,priceType,factor,setFactor,assets,asset,setAsset,currency,setCurrency,currencyRate,setCurrencyRate,assetPrice,setAssetPrice,price,setPrice,currencies,setCurrencies,upperLimit,setUpperLimit,lowerLimit,setLowerLimit,authToken,totalAsset,setTotalAsset,deadline,setDeadline,notes,setNotes,registered,setRegistered,registerChecked,setRegisterChecked,prefferedMethod,online,setOnline,autoreply,setAutoReply
}) =>{
    return (
        <>
            <div className="tab-pane fade show active" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                          <form>
                            <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>Assets</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                   {
                                      assets && assets.map((a)=>(
                                           <>
                                           <input type="radio" name="asset" value={a.symbol} key={a._id} onChange={(e)=>{
                                               setAsset(e.target.value);
                                               setAssetPrice(a.rateToDollar["$numberDecimal"]);
                                               setPrice(Number(a.rateToDollar["$numberDecimal"] * currencyRate * Number(factor / 100)).toFixed(2))
                                            }}
                                            checked={a.symbol==asset}
                                            />
                                           {a.symbol.toUpperCase()} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  

                            <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>With Cash</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                   {
                                     currencies &&  currencies.map((c)=>(
                                           <>
                                           <input type="radio" name="currency" value={c} key={currency._id} onChange={(e)=>{
                                                setCurrency(c);
                                                setPrice((c.rateToDollar["$numberDecimal"] * assetPrice * Number(factor / 100)).toFixed(2));
                                                setCurrencyRate(c.rateToDollar["$numberDecimal"]);
                                            }
                                               }
                                           checked={c.symbol==currency.symbol}/>
                                           {c.symbol} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  


                            <div className={`row form-row ${step !== 1 ? "d-none":""} buy-step-1`}>     
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                  <div className="label"><b>Your Price</b></div>
                                  <div className="d-flex"><h5 className="currency">{currency.symbol}</h5>&nbsp;<h5>{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(assetPrice) * Number(currencyRate) * Number(factor / 100)) }</h5></div>
                                </div>
                                
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster d-none mb-20">
                                    <div className="label"><b>Highest Order Price</b></div>
                                    <div className="d-flex"><h4 className="currency">{currency.symbol}</h4>&nbsp;<h4>411.34</h4></div>
                                </div>
                                
                                {
                                /*
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                    <div className="label"><b>Price Type</b></div>
                                    <div>
                                    
                                        <input type="radio" name="priceType" onChange={()=>{
                                            setFactor(100);
                                            setPriceType("fixed");
                                        }
                                        } checked={priceType === "fixed"}/> 
                                         
                                         Factor &nbsp;
                                         <input type="radio" name="priceType" onChange={()=>{
                                             setFactor(0);
                                             setPriceType("floating")
                                         }}  checked={priceType === "floating"}/>Floating &nbsp;
                                    </div>
                                </div>
                                 */
                                }

                       <div className={`col col-xs-12 col-sm-12 col-md-6 form-cluster mb-20`}>
                                  
                                  <div className={`${priceType === "fixed" ? "d-none":""}`}>
                                      <div className="label"><b>Set Price Factor</b></div>
                                  <div>
                                   
                                  <div className="value-button" id="decrease" value="Decrease Value"
                                     onClick={(e)=>{
                                        let newfactor = Number(factor) - 0.01; 
                                        setFactor(Number(newfactor).toFixed(2));
                                        //let factorPrice = calculatePrice(currencyRate,newfactor);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(newfactor / 100));
                                      }}
                                    >-</div>
                                    <input type="number" id="number" placeholder="100" className="text-dark" value={factor} onChange={(e)=>{
                                        setFactor(Number(e.target.value));
                                        //let factorPrice = calculatePrice(currencyRate,e.target.value);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(e.target.value / 100));
                                    }}/>
                                    <div className="value-button" id="increase" value="Increase Value"
                                    onClick={(e)=>{
                                        let newfactor = Number(factor) + 0.01; 
                                        setFactor(Number(newfactor).toFixed(2));
                                        //let factorPrice = calculatePrice(currencyRate,newfactor);
                                        setPrice(Number(assetPrice) * Number(currencyRate) * Number(newfactor / 100));
                                      }}
                                      >+</div>
                                    <div className="pricing-formula"> <span>Pricing Formula</span> &nbsp;  {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((price))} * {factor}% = <b> {currency.symbol} {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((price)) } </b> </div>
                                  </div>
    
                                  <div className={`${priceType === "floating" ? "d-none":""}`}>
                                  <div className="label"><b>Set Fixed Price</b></div>
                                  
                                  
                                  <div className={`value-button`} id="decrease"value="Decrease Value"
                                   onClick={(e)=>{
                                    price = Number(price) - 1;
                                    setCurrencyRate(price);
                                    setFactor(calculateFactor(price,currency.rateToDollar["$numberDecimal"]));
                                    setPrice(price.toFixed(2));
                                  }}
                                  >-</div>
                                    <input type="number" id="number" onChange={(e)=>{
                                        setCurrencyRate(e.target.value);
                                        setFactor(calculateFactor(e.target.value,currency.rateToDollar["$numberDecimal"]));
                                        
                                    }} />
                                    <div className="value-button" id="increase"value="Increase Value"
                                    onClick={(e)=>{
                                        price = Number(price) + 1;
                                        setCurrencyRate(price);
                                        setFactor(calculateFactor(price,currency.rateToDollar["$numberDecimal"]));
                                        setPrice(price.toFixed(2));
                                    }}
                                    >+</div>
                                  </div>
                                </div>
                               </div>  
                              </div>


                              <div className={`row buy-step-2 ${step !== 2 ? "d-none":""} `}>     
                                <div className="col col-12 col-xs-12 col-sm-6">
                                    <div className="row form-row"> 
                                        <div className="col col-12 col-xs-12 col-sm-8">
                                            <label>Total Amount</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" aria-label="" name="totalAsset" value={totalAsset} required onChange={(e)=>{
                                                    setTotalAsset(e.target.value);
                                                }}/>
                                                <span className="input-group-text"> <b>{(asset).toUpperCase()}</b></span>
                                            </div>
                                            <span className="rate-info float-end"> = {new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(price) * Number(totalAsset)) } {currency.symbol}</span>
                                        </div>

                                     </div>

                                     <div className="row form-row"> 

                                        <div className="col col-xs-5 col-sm-5 mt-10">
                                            <label>Order Limit</label>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" aria-label="" value={lowerLimit} onChange={(e)=>setLowerLimit(e.target.value)}/>
                                                <span className="input-group-text">{currency.symbol}</span>
                                            </div>
                                            <span className="rate-info"> Min Limit</span>
                                        </div>

                                        <div className="col col-xs-2 col-sm-2 mt-10 text-center">
                                            <br/><br/>
                                            ~
                                        </div>

                                        <div className="col col-xs-5 col-sm-5 mt-10">
                                            <label>&nbsp;</label>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" value={upperLimit} onChange={(e)=>setUpperLimit(e.target.value)}/>
                                                <span className="input-group-text">{currency.symbol}</span>
                                            </div>
                                            <span className="rate-info">Max Limit</span>
                                        </div>
                                     </div>
           
                                     <div className="row form-row">                          
                                        <div className="col col-12 col-xs-12 col-sm-8 mt-20">
                                            <label>Payment Time Limit</label>
                                            <select className="form-control" value={deadline} onChange={(e)=>{
                                                setDeadline(Number(e.target.value));
                                            }}>
                                                <option value="15">15 Min</option>
                                                <option value="30">30 Min</option>
                                                <option value="45">45 Min</option>
                                                <option value="60">60 Min</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row form-row"> 
                                        <div className="col col-xs-12 col-sm-8">
                                            {/* <span className="dim">Estimated Fee:</span> {Number(totalAsset) * 0.001} {asset} */}
                                        </div>
                                    </div>
                                </div>

                                <div className="col col-12 col-xs-12 col-sm-6">
                                        <div className="col col-12 col-xs-12 col-sm-12">
                                            <div className="label"><b>Payment Method</b></div>
                                        </div>
                                        <div className="col col-6 col-xs-6 col-sm-6">
                                           <small> Select a payment method </small> 
                                        </div>
                                        <div className="col col-6 col-xs-6 col-sm-6">
                                        {prefferedMethod && <span className="btn-dex-small btn-dex-default">{prefferedMethod}</span>} &nbsp;
                                            <button className="btn-dex-small btn-dex-primary" data-bs-toggle="modal" data-bs-target="#epaymentMethodModal" type="button">+ ADD</button>
                                        </div>
                                    </div>
                            </div>  
                           <Misc step={step} notes={notes} setNotes={setNotes} registered={registered} setRegistered={setRegistered} registerChecked={registerChecked} setRegisterChecked={setRegisterChecked} asset={asset}  online={online} setOnline={setOnline} autoreply={autoreply} setAutoReply={setAutoReply}/>
                            <div className="row form-row">     
                                <div className="col col-xs-12 text-end">
                                    <button className="btn-dex btn-dex-primary buy-step1-next" onClick={(e)=>{
                                        e.preventDefault();
                                        step === 1 ? setStep(1) : setStep(step-1)
                                        }}>Prev</button>
                                    <button className={`btn-dex ${step === 3 ? "d-none" : ""} btn-dex-default buy-step1-next`} onClick={(e)=>{
                                        e.preventDefault();
                                       step ===3 ? setStep(3) : setStep(step+1)}
                                    }>Next</button>
                                    <button className={`btn-dex ${step === 3 ? "" :"d-none"} btn-dex-default`} data-bs-toggle="modal"data-bs-target="#confirmPostModal" disabled={step === 3 ? false:true} onClick={(e)=>{e.preventDefault();
                                    }}>Submit</button>
                                </div>
                            </div> 
                          </form>
                        </div>
        </>
    )
})

export default BuyTab;
