export default function Process({step}){
    return (
        <>
        <div className="col-12 col-xs-12 col-sm-6 col-md-6">
            <div className={`row p-20 ${step !== 2 ? "d-none":""}`}>
						<div className="col-12 col-xs-12 col-sm-12 step text-center"> 
						
						<div className="row p-20">
						
						 <div className="col-12 col-xs-12 col-sm-12 mt-30 text-center">
						  <h3> Find a Match</h3>
						</div>
									
						 <div className="col-12 col-xs-12 col-sm-12 inner mt-30 text-center">
					     <div className="bet-single-area mt-20">
                            <div className="head-area d-flex align-items-center">
                                <span className="btn-dex-small btn-dex-bordered">Soccer</span>
                                <p>Mar 23, 2022,3:45PM EDT</p>
                            </div>
                            <div className="bet-main-content">
                                <div className="team-single">
                                    <h4>Arsenal</h4>
                                    <span className="mdr">Home</span>
                                    <div className="img-area">
                                        <img src="images/team-logo-1.png" alt="image"/>
                                    </div>
									<span className="value text-white">60 BNB </span>
									<span className="info">Staked </span>
                                </div>
                                <div className="mid-area text-center">
                                    <div className="countdown d-flex align-items-center justify-content-center">
                                        <h4>
                                           <span className="seperator">VS</span>
                                        </h4>                         
                                    </div>
									<h4>Draw</h4>
									<span className="value text-white">60 BNB </span>
									<span className="info">Staked </span>
                                </div>
                                <div className="team-single">
                                    <h4>Chelsea</h4>
                                    <span className="mdr">Away</span>
                                    <div className="img-area">
                                        <img src="images/team-logo-2.png" alt="image"/>
                                    </div>
									<span className="value text-white">70 BNB </span>
									<span className="info">Staked </span>
                                </div>
                            </div>
                            <div className="bottom-item">
                                <span className="btn-dex-small btn-dex-default">Arsenal Win</span>&nbsp;
                                <span  className="btn-dex-small btn-dex-default">Draw</span> &nbsp;
                                <span  className="btn-dex-small btn-dex-default">Chelsea Win</span>
                            </div>
                        </div> 
						
					  </div>
                    </div>
							    
								
				  </div>
            </div>
            <div className={`row p-20 ${step !==3 ? "d-none":""}`}>
						<div className="col-12 col-xs-12 col-sm-12 step text-center"> 
						<div className="row p-20">
						 <div className="col-12 col-xs-12 col-sm-12 mt-30 text-center">
						  <h3> Select Outcome</h3>
						</div>
						 <div className="col-12 col-xs-12 col-sm-12 inner mt-30 text-center">
					     <div className="bet-single-area mt-20">
                            <div className="bottom-item mt-30">
                                <span className="btn-dex-small btn-dex-default">Team A Win</span>&nbsp;
                                <span  className="btn-dex-small btn-dex-default">Draw</span> &nbsp;
                                <span  className="btn-dex-small btn-dex-default">Team B Win</span>
                            </div>
                        </div> 
						
					  </div>
                    </div>
							    
								
				  </div>
            </div>
            <div className={`row p-20 ${step !==4 ? "d-none" :""}`}>
                <div className="col-12 col-xs-12 col-sm-12 step text-center"> 
					<div className="row p-20">
						<div className="col-12 col-xs-12 col-sm-12 mt-30 text-center">
						  <h3> Enter Stake</h3>
						</div>
						 <div className="col-12 col-xs-12 col-sm-12 inner mt-30 text-center">
							<div className="row justify-content-center">
								<div className="col-xxl-8 col-xl-9 col-lg-11 betpop mt-20 mb-20">
											<div className="top-item mt-20">
                                                <span className="btn-dex-small btn-dex-bordered">Team A Win</span>
											</div>
											<div className="mid-area">
												<div className="single-area">
													<div className="item-title d-flex align-items-center justify-content-between">
														<span>Your Stake Amount:</span>
													</div>
													<div className="d-flex in-dec-val">
														<input type="text" value="2" className="InDeVal1"/> <span>BNB</span>		
													</div>
													<div className="d-flex mt-10"><br/>
														<span className="btn-dex-small btn-dex-default">Stake</span>
													</div>
												</div>
												
											
											</div>
											<div className="bottom-area">
												<div className="fee-area">
													<p>Your Potential Win: <span className="amount">4  BNB </span><br/><i>Your potential wins changes until match start</i></p>
													<p className="fee">Outcome Total Stake: <span className="amount">100 BNB</span></p>
													<p className="date-area">Match Start: <span className="amount">March 21,2021 - 1:00 Am</span> </p>
												</div>
											</div>
												
								</div>
							</div>
					    </div>
                    </div>
				  </div>
            </div>
            <div className={`row p-20 ${step !==1 ? "d-none" : ""}`}>
						      <div className="col-12 col-xs-12 col-sm-12 step text-center">
							       <div className="row p-20">
								    <div className="col-12 col-xs-12 col-sm-12 mt-30 text-center">
							          <h3> Select a Sport</h3>
								    </div>
									
									<div className="col-12 col-xs-12 col-sm-12 mt-30 mb-30 inner">
									    <div className="row">
									        <div className="col-12 col-xs-6 col-sm-4 p-10">
											  <div className="sport pt-20">
											    <img src="images/ball.png" style={{width:"40px", height:"40px"}}/> <br/>
												<h3>Soccer </h3>
											  </div>
											</div>
											<div className="col-12 col-xs-6 col-sm-4 p-10">
											   <div className="sport pt-20">
											    <img src="images/basketball.png" style={{width:"40px", height:"40px"}}/> <br/>
												<h3> Basketball </h3>
											  </div>
											</div>
											<div className="col-12 col-xs-6 col-sm-4 p-10">
											  <div className="sport pt-20">
											    <img src="images/boxing.png" style={{width:"40px",height:"40px"}}/> <br/>
												<h3> Boxing </h3>
											  </div>
											</div>
											
											<div className="col-12 col-xs-6 col-sm-4 p-10">
											  <div className="sport pt-20">
											    <img src="images/football.png" style={{width:"40px", height:"40px"}}/> <br/>
												<h3> Football </h3>
											  </div>
											</div>
											<div className="col-12 col-xs-6 col-sm-4 p-10">
											  <div className="sport pt-20">
											    <img src="images/tennis.png" style={{width:"40px", height:"40px"}}/> <br/>
												<h3>Tennis</h3>
											  </div>
											</div>
											<div className="col-12 col-xs-6 col-sm-4 p-10">
											  <div className="sport pt-20">
											    <img src="images/ufc.png" style={{width:"40px",height:"40px"}}/> <br/>
												<h3> UFC </h3>
											  </div>
											</div>
									     </div>
									</div>
								  </div>
							  </div>
			</div>
        </div>
        </>
    )
}