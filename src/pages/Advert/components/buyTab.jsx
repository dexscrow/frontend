import {memo} from 'react';
import { calculateFactor, calculatePrice} from '../../../helpers/utils';
import Misc from './misc';
import useFetch from "../../../hooks/useFetch";

const END_POINT = 'http://localhost:8000/assets'



 const BuyTab = memo(({
    step,setStep,priceType,setPriceType,factor,setFactor,assets,setAssets,asset,setAsset,currency,setCurrency,currencyRate,setCurrencyRate,assetPrice,setAssetPrice,price,setPrice,currencies,setCurrencies,upperLimit,setUpperLimit,lowerLimit,setLowerLimit,authToken,totalAsset,setTotalAsset
}) =>{
    
    return (
        <>
            <div className="tab-pane fade show active" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                          <form>
                            <div className="row form-row buy-step-1">     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>Assets</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                   {
                                      assets && assets.map((asset)=>(
                                           <>
                                           <input type="radio" name="asset" value={asset.symbol} key={asset._id} onClick={(e)=>{
                                               setAsset(e.target.value);
                                               setAssetPrice(asset.rateToDollar["$numberDecimal"]);
                                               setPrice(Number(asset.rateToDollar["$numberDecimal"] * currencyRate))
                                            }}
                                                />
                                           {asset.symbol.toUpperCase()} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  

                            <div className="row form-row buy-step-1">     
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <div className="label"><b>With Cash</b></div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12">
                                   {
                                     currencies &&  currencies.map((currency)=>(
                                           <>
                                           <input type="radio" name="currency" value={currency} key={currency._id} onClick={(e)=>{
                                               setCurrency(currency);
                                                setPrice(currency.rateToDollar["$numberDecimal"] * assetPrice);
                                                setCurrencyRate(currency.rateToDollar["$numberDecimal"]);
                                            }
                                               }/>
                                           {currency.symbol} &nbsp;
                                           </>
                                       ))
                                   }
                                </div>
                            </div>  


                            <div className="row form-row buy-step-1">     
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                  <div className="label"><b>Your Price</b></div>
                                  <div className="d-flex"><h4 className="currency">{currency.symbol}</h4>&nbsp;<h4>{price}</h4></div>
                                </div>
                                
                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster d-none mb-20">
                                    <div className="label"><b>Highest Order Price</b></div>
                                    <div className="d-flex"><h4 className="currency">{currency.symbol}</h4>&nbsp;<h4>411.34</h4></div>
                                </div>

                                <div className="col col-12 col-xs-12 col-sm-12 col-md-3 form-cluster mb-20">
                                    <div className="label"><b>Price Type</b></div>
                                    <div>
                                        <input type="radio" name="priceType" onChange={()=>{
                                            setFactor(100);
                                            setPriceType("fixed");
                                        }
                                        } checked={priceType === "fixed"}/>Fixed &nbsp;
                                         <input type="radio" name="priceType" onChange={()=>{
                                             setFactor(0);
                                             setPriceType("floating")
                                         }}  checked={priceType === "floating"}/>Floating &nbsp;
                                    </div>
                                </div>

                                <div className={`col col-xs-12 col-sm-12 col-md-3 form-cluster mb-20`}>
                                  
                                  <div className={`${priceType === "fixed" ? "d-none":""}`}>
                                      <div className="label"><b>Floating Price Margin</b></div>
                                    <div className="value-button" id="decrease" value="Decrease Value">-</div>
                                    <input type="number" id="number" onChange={(e)=>{
                                        setFactor(Number(e.target.value));
                                        let factorPrice = calculatePrice(currencyRate,e.target.value);
                                        setPrice(Number(assetPrice * factorPrice));
                                    }}/>
                                    <div className="value-button" id="increase" value="Increase Value">+</div>

                                    <div className="pricing-formula"> <span>Pricing Formula</span> &nbsp;  {currencyRate} * {factor}% = <b> {currency.symbol} {price} </b> </div>
                                  </div>

                                  <div className={`${priceType === "floating" ? "d-none":""}`}>
                                    <div className={`value-button`} id="decrease"value="Decrease Value">-</div>
                                    <input type="number" id="number" onChange={(e)=>{
                                        setCurrencyRate(e.target.value);
                                        setFactor(calculateFactor(e.target.value,currency.rateToDollar["$numberDecimal"]));
                                        
                                    }} />
                                    <div className="value-button" id="increase"value="Increase Value">+</div>
                                  </div>
                                </div>
                              </div>  


                              <div className={`row buy-step-2 ${step <2 ? "d-none":""} `}>     
                                <div className="col col-12 col-xs-12 col-sm-6">
                                    <div className="row form-row"> 
                                        <div className="col col-12 col-xs-12 col-sm-8">
                                            <label>Total Amount</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" aria-label="" name="totalAsset" value={totalAsset} required onChange={(e)=>{
                                                    setTotalAsset(e.target.value);
                                                    setPrice(Number((e.target.value * assetPrice) * currencyRate))
                                                }}/>
                                                <span className="input-group-text"> <b>{(asset).toUpperCase()}</b></span>
                                            </div>
                                            <span className="rate-info float-end"> = {price} {currency.symbol}</span>
                                        </div>

                                     </div>

                                     <div className="row form-row"> 

                                        <div className="col col-xs-5 col-sm-5 mt-10">
                                            <label>Order Limit</label>
                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" aria-label="" value={lowerLimit} onChange={(e)=>setLowerLimit(e.target.value)}/>
                                                <span className="input-group-text">{currency.symbol}</span>
                                            </div>
                                            <span className="rate-info"> Min limit must not be 0</span>
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
                                            <span className="rate-info"> = {lowerLimit} {currency.symbol}</span>
                                        </div>
                                     </div>
           
                                     <div className="row form-row">                          
                                        <div className="col col-12 col-xs-12 col-sm-8 mt-20">
                                            <label>Payment Time Limit</label>
                                            <select className="form-control">
                                                <option value="15">15 Min</option>
                                                <option value="30">30 Min</option>
                                                <option value="45">45 Min</option>
                                                <option value="60">60 Min</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row form-row"> 
                                        <div className="col col-xs-12 col-sm-8">
                                            <span className="dim">Estimated</span> i Fee 0.3 {asset}
                                        </div>
                                    </div>
                                </div>

                                <div className="col col-12 col-xs-12 col-sm-6">
                                    <div className="col col-xs-12 col-sm-12">
                                        <div className="label"><b>Payment Method</b></div>
                                    </div>
                                    <div className="col col-xs-6">
                                       <small> Select Up To 5 Methods </small> 
                                    </div>
                                    <div className="col col-xs-6">
                                        <span className="btn-dex-small btn-dex-danger">Bank Transfer</span>
                                        <span className="btn-dex-small btn-dex-primary" data-bs-toggle="modal" data-bs-target="#paymentMethodModal">+ ADD</span>
                                    </div>
                                </div>
                            </div>  
                           <Misc step={step}/>
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
                                    <button className={`btn-dex ${step === 3 ? "" :"d-none"} btn-dex-default`} data-bs-toggle="modal"data-bs-target="#confirmPostModal" disabled={step === 3 ? false:true} onClick={(e)=>e.preventDefault()}>Submit</button>
                                </div>
                            </div> 
                          </form>
                        </div>
        </>
    )
})

export default BuyTab;
