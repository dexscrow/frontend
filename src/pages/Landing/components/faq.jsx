export default function Faq(){
    return(
        <>
        <div className="row pt-0 pb-50 mb-20" style={{minHeight:"500px", background: "url('images/bg4.png')",  backgroundPosition:"cover", backgroundRepeat: "no-repeat"}}>
			   <div className="col-12 col-xs-8 col-sm-6 offset-sm-3 offset-xs-2 p-0 text-center mt-40">
					<h3>Frequently Asked Questions</h3>
					<h2>If you have questions we have answer</h2>
			   </div>
			   
			   <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2  col-xs-12 text-center mt-40">
	
                <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                     <button className="accordion-button accord-btn active" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       What is Dexscrow?
                     </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Dexscrow is a dex-fiat peer to peer trading platform. This platform will ensure that dex traders can seamlessly trade their Bep-20 tokens for fiat of their choice. Traders will be able to create adverts with their price and preferred payment option.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                       Are Dexscrow smart contract audited ?
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                       We take Security very seriously, we carry out smart contract audit, site security test and other wide variety of test regularly to ensure that investors funds are fully safe and secured. More so all our audit will be opened to the general public and can be verifiable by anyone.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                       What's Dexscrow business model ? 
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    We intend to run a profitable platform. Our goal is to generate consistent revenue as a company and to incentivise our investors
                    </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button accord-btn  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    What's next for the Dexscrow?
                    </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    After we launch our trading platform, we will focus on decentralization and governance. We will be giving more of the decision making and governance to our community. We will carefully work out a plan to rollout DAO and give a large part of decision making and the project back to our community that believed in us
                    </div>
                    </div>
                  </div>
                 </div>

                </div>


                </div>
        </>
    )
}