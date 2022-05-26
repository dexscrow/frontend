export default function Details(){
    return (
        <>
             <div className="row mt-30" style={{width:"98%"}}>
				       <div className="col-12 col-xs-12 col-sm-6 p-0 d-none d-sm-block">
					       <img src="images/about-bitbetio-image.png" style={{width:"100%", height:"auto", marginLeft:"-100px"}}/>
					   </div>
				       <div className="col-12 col-xs-12 col-sm-6">
					     <div className="row">
                           <div className="col-12">						 
						   {/*<h3> Fully Decentralized Sports Betting  </h3>*/}
                            <h2>A Revolution in Online Betting</h2>
						    <p className="text-justify">1DexBet.com is a decentralized peer-to-peer 
							   sports betting platforms built using blockchain smart contract and proof-of-stake concept. 
							   Unlike traditional sport betting, 1DexBet is very user-friendly as you don't have all the complex options to deal with, doesn’t 
							   require identity verification for deposits and withdrawals 
							</p>
						   </div>
						 </div>
						 
						 <div className="row">
                           <div className="col-6 col-sm-6">
                             <div className="features text-center">
							  <img src="images/decentralized.png" /> 
							  <h3>Decentralized</h3>
							 </div>						   
						   </div>
						   <div className="col-6 col-sm-6">	
						     <div className="features text-center">
							 <img src="images/peer.png" /> 
							  <h3>Peer-2-Peer</h3>
							 </div>	
						   </div>
						   <div className="col-6 col-sm-6">	
						     <div className="features text-center">
							  <img src="images/blockchain.png" /> 
							  <h3>Blockchain</h3>
							 </div>	
						   </div>
						   <div className="col-6 col-sm-6">	
						     <div className="features text-center">
							   <img src="images/limitless.png" /> 
						   	   <h3>Limitless</h3>
							 </div>	
						   </div>
 
					     </div>
				      </div>   
		</div>
        </>
    )
}