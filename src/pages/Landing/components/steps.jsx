export default function Steps({setStep}){

	return(
    <>
    <div className="col-12 col-xs-12 col-sm-6 col-md-6">
		 <div className="row mt-30 p-20">
		   <div className="btn col-12 col-xs-8 col-sm-8 offset-sm-2 offset-xs-2 stepsbutton d-flex justify-content-center align-self-center" onClick={(e)=>setStep(1)}> 
			 <img src="images/step1.png" style={{width:"23px",height:"23px"}}/> &nbsp;&nbsp;<h5 className="align-middle">Select a Sport</h5>
		   </div>
		   
		   <div className="btn col-12 col-xs-8 col-sm-8 offset-sm-2 offset-xs-2 stepsbutton d-flex justify-content-center align-self-center" onClick={(e)=>setStep(2)}> 
			 <img src="images/step2.png" style={{width:"23px",height:"23px"}}/> &nbsp;&nbsp; <h5>Find a Match</h5>
		   </div>
		   
		   <div className="btn col-12 col-xs-8 col-sm-8 offset-sm-2 offset-xs-2 stepsbutton d-flex justify-content-center align-self-center" onClick={(e)=>setStep(3)}> 
				<img src="images/step3.png" style={{width:"23px", height:"23px"}}/> &nbsp;&nbsp; <h5>Select Outcome</h5>
		   </div>

		   <div className="btn col-12 col-xs-8 col-sm-8 offset-sm-2 offset-xs-2 stepsbutton d-flex justify-content-center align-self-center" onClick={(e)=>setStep(4)}> 
			 <img src="images/step4.png" style={{width:"23px", height:"23px"}}/> &nbsp;&nbsp;  <h5>Enter Stake Amount</h5>
		   </div>

		 </div>
	</div>
    </>
		)
}