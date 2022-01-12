import React,{useContext} from "react";
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
import Nav from "../Landing/components/nav";


export default function BuyAd(){
    const [account,_]= useContext(AccountContext)
    return (
        <>
        <div className="modal fade" id="confirmPublishModal" tabindex="-1" aria-labelledby="confirmPublishModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-sm">
      <div className="modal-content" style="background:#ccc;">
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
        </div>
    </div>
            <div className="col py-3 main">
                  <div className="row p-20">
                    <Header account={account}/>
                    </div>

                   <div className="row">
                    <div className="col col-12">
                       <h3 className="page-title">Buy Ad</h3>
                    </div>
                   </div>


                   <form>
                   <div className="row">
                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                       <a href="" className="btn-dex btn-dex-default p-10 pr-30">Buy</a> 
                       &nbsp;&nbsp;
                       <a href="" className="btn-dex btn-dex-primary p-10 pl-30">Sell</a>
                    </div>


                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius">
                            <option value="USDT" style="background-image:url(images/approved.svg);">USDT</option>
                            <option value="WBTC">WBTC</option>
                            <option value="WETH">WETH</option>
                            <option value="Solana">Solana</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2">
                        <select className="form-control no-radius">
                            <option value="NGN">NGN</option>
                            <option value="USDT">USDT</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                        <select className="form-control no-radius">
                            <option value="all">All Payments</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                       Reset Filter
                    </div>
                  </div>
                </form>


                  <div className="row">
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                       <div className="row">
                          <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                            <div className="row">
                              <div className="col col-2 col-xs-2">
                                <img src="images/avatar.png" style="width:30px; height:30px;" />
                              </div>
                              <div className="col col-10 col-xs-10 text-start"> 
                                <div className="row">
                                    <div className="col col-12 col-xs-12">
                                        <h4 className="username">Bigfash</h4>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end d-flex">
                                        <span className="value">100</span>
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
                                <span className="value number">411.87 USDT</span><br/>
                                <span className="label">Price</span>
                            </div>
                            <div className="col col-6 col-xs-6">
                                <span className="value number">10,000 USDT</span><br/>
                                <span className="label">Amount</span>
                            </div>
                          </div>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                            <span className="value number">50,000 - 1,000,0000 NGN</span><br/>
                            <span className="label">Limit</span>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-2 mb-20 pt-20">
                            <span className="label">Payment Method</span>
                        </div>

                        <div className="col col-12 col-xs-12 col-sm-1 text-end p-20">
                            <a href="" className="btn-dex-small btn-dex-primary p-10">Sell</a>
                        </div>       
                    </div>
                </div>
                                    
                <div className="trade-record-card pt-10 pb-20 mb-10">
                    <div className="row">
                       <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-10">
                         <div className="row">
                           <div className="col col-2 col-xs-2">
                             <img src="images/avatar.png" style="width:30px; height:30px;" />
                           </div>
                           <div className="col col-10 col-xs-10 text-start"> 
                             <div className="row">
                                 <div className="col col-12 col-xs-12">
                                     <h4 className="username">Bigfash</h4>
                                 </div>
                                 <div className="col col-6 col-xs-6 text-end d-flex">
                                     <span className="value">100</span>
                                     <span className="label">Orders</span>
                                      &nbsp; &nbsp; 
                                     <span className="value">Completion</span>
                                     <span className="label">92%</span>
                                 </div>
                             </div>
                        </div>

                        <div className="col col-12 col-xs-12 text-start"> 
                            <span className="label"> Payment Method</span> <br/><br/>
                            <span className="btn-dex-small btn-dex-danger">Bank Transfer</span>
                            <span className="btn-dex-small btn-dex-info">Paypal</span>
                            <span className="btn-dex-small btn-dex-warning">Go Bank</span>
                        </div>

                       </div>
                     </div>

                     <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                       <div className="row">
                         <div className="col col-12 col-xs-12 mb-10">
                             <span className="value number">411.87 USDT</span><br/>
                             <span className="label">Price</span>
                         </div>
                         <div className="col col-12 col-xs-12 mb-10">
                             <span className="value number">10,000 USDT</span><br/>
                             <span className="label">Amount</span>
                         </div>
                         <div className="col col-12 col-xs-12 mb-10">
                            <span className="value number">50,000 - 1,000,0000 NGN</span><br/>
                            <span className="label">Limit</span>
                         </div>
                         <div className="col col-12 col-xs-12 mb-10">
                            <span className="label">Payment Time</span> <span className="value number">15 Minutes</span>
                         </div>

                       </div>
                     </div>

                     <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                         <span className="label"> 
                            <b>Please Read Terms Carefully</b> <br/><br/>
                            ✔ I change (N100) to cover up for Binance Fees, Bank Charges and VAT. Sorry if I don’t I will I end up all in loose.<br/>
                            ✔ I pay instantly and expect instantly.<br/> 
                            ✔ This is based on Mutual Agreement if you accept please just type in that you have accepted it.
                         </span>
                     </div>

                     <div className="col col-12 col-xs-12 col-sm-3 mb-20 pt-20">
                        <form action="" method="">
                        
                         <div className="row"> 
                            <div className="col col-12 col-xs-12 col-sm-12">
                                <label>I want to pay</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label=""/>
                                    <span className="input-group-text"><span className="text-primary">All</span> NGN</span>
                                </div>
                                <span className="rate-info float-end">&nbsp; </span>
                            </div>
                         </div>

                         <div className="row"> 
                            <div className="col col-12 col-xs-12 col-sm-12">
                                <label>I will receive</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label=""/>
                                    <span className="input-group-text">USDT</span>
                                </div>
                                <span className="rate-info float-end"> &nbsp; </span>
                            </div>
                         </div>

                         <div className="row form-row"> 
                            <div className="col col-12 col-xs-12 col-sm-12 d-flex">
                              <button className="btn-dex-small btn-dex-default">Cancel</button>&nbsp;
                              <button className="btn-dex-small btn-dex-primary">Buy USDT</button>
                            </div>
                         </div>




                        </form>


                     </div>
                 </div>
              </div>


      
      
      
      
              </div>
              </div>
              <Nav/>
            </>
    )
}