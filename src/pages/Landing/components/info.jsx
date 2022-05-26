
export default function Info() {
  return (
   <>
   <div className="row p-20">
				       
                       <div className="col-12 col-xs-10 col-md-8 offset-md-2 offset-xs-1">
                         <div className="row cus-mar">
                           <div className="col-xl-4 col-md-6 statcard">
                               <div className="single-area d-flex align-items-center">
                                   <div className="img-area">
                                       <img src="images/paid.png" alt="image"/>
                                   </div>
                                   <div className="text-area">
                                       <h2 className="m-none">
                                           <span className="counter">{new Intl.NumberFormat("en-Us", {
                                                        style: "currency",
                                                        currency: "USD",
                                                        minimumFractionDigits: 2
                                                        }).format(4941)}</span>
                                           </h2>
                                       <p style={{color:"#00FFFF"}}>Wins Paid Out</p>
                                   </div>
                               </div>
                           </div>
                           <div className="col-xl-4 col-md-6 statcard">
                               <div className="single-area d-flex align-items-center">
                                   <div className="img-area">
                                       <img src="images/won.png" alt="image"/>
                                   </div>
                                   <div className="text-area">
                                       <h2 className="m-none"><span className="counter">76</span></h2>
                                       <p style={{color:"#00FFFF"}}>Total Matches</p>
                                   </div>
                               </div>
                           </div>
                           <div className="col-xl-4 col-md-6 statcard">
                               <div className="single-area d-flex align-items-center">
                                   <div className="img-area">
                                       <img src="images/live.png" alt="image"/>
                                   </div>
                                   <div className="text-area">
                                       <h2 className="m-none"><span className="counter">10</span></h2>
                                       <p>Active Matches</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>				  
                  </div>
   </>
  )
}
