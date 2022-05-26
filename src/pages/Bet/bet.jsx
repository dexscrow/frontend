import axios from "axios";
import socketClient from "socket.io-client";
import { useEffect,useContext,useState,useCallback } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/sidebar'
import Header from '../components/header';
import Nav from "../components/nav";
import InnerNav from "../components/innernav"
import {createStake} from "../../helpers/betting";
import AccountContext from '../../contexts/account';
import {useParams, useNavigate} from "react-router-dom";
const { DateTime } = require("luxon");
const token = localStorage.getItem("authToken");
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SOCKET_ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT;
const initBet = socketClient(SOCKET_ENDPOINT+"/initBet");

export default function Bet() {
	const [account,setAccount] = useContext(AccountContext);
	const [loading,setLoading] = useState(false);
	const [match,setMatch] = useState(null);
	const [selection,setSelection] = useState("");
	const [stake,setStake] = useState(0);
	const [odd,setOdd] = useState('win');
	const [potentialWin,setPotentialWin] = useState(0);
    const {matchId,teamId} = useParams();
	const navigate = useNavigate();

	const getMatch = async()=>{
		try{
		  setLoading(true);
		  const {data:response} = await axios.get(SERVER_URL+'/game/'+matchId,{
			headers:{
			  "Authorization":`Bearer ${token}`
			}
		  });
		  if(response.error){
			toast({
			  title: response.error || "An error occured",
			  status: 'error',
			  duration: 9000,
			  position:'top-right',
			  isClosable: true,
			})
		  }
		  if(!response.success){
			toast({
			  title: response.message || "An error occured",
			  status: 'error',
			  duration: 9000,
			  position:'top-right',
			  isClosable: true,
			})
		  }
		  if(response.success){
			 setLoading(false);
			  setMatch(response.data);
			  const match = response.data;
			  if(match.team1._id===teamId){
				setSelection(match.team1.name);
				setOdd('win');
			  }
			  else if(match.team2._id===teamId){
				setSelection(match.team2.name);
				setOdd('win');
			  }
			  else{
				  if(teamId==="draw"){
				    setSelection("Draw");
					setOdd('draw');
			      }else{
					 toast({
						title: "You have not made any outcome selection",
						status: 'error',
						duration: 9000,
						position:'top-right',
						isClosable: true,
					  })
				  }
			  }
			return
		   }
		 }
		catch(error){
		  setLoading(false);
		  toast({
			title: error.message || "An error occured",
			status: 'error',
			duration: 9000,
			position:'top-right',
			isClosable: true,
		  })
		}
	 }

    const initCreateStake = async(e)=>{
		setLoading(true);
		try {
			const {data:response} = await axios.post(`${SERVER_URL}/stake/`+matchId,{
				selectedTeam:teamId,
				odd:odd,
				stake:stake
			},{
				headers:{
					"Authorization":`Bearer ${token}`
				}
			}
			);
			if(response.error && response.error !== ""){
				setLoading(false);
				toast({
				  title: response.error || "something went wrong",
				  status: 'error',
				  duration: 9000,
				  position:'top-right',
				  isClosable: true,
				})
				return;
			  }
			  if(response.success === false){
				setLoading(false);
				toast({
				  title: response.message || "something went wrong",
				  status: 'error',
				  duration: 9000,
				  position:'top-right',
				  isClosable: true,
				})
				return;
			  }
			  initBet.emit('initcreatestakeroom','room');
			  if(teamId==="draw"){
		       await createStake(response.data,matchId,stake,teamId,"draw");
			  }else{
				await createStake(response.data,matchId,stake,teamId,"win");
			  }	  
	    } catch (error) {
		  setLoading(false);
		  toast({
			title: error.message,
			status: 'error',
			duration: 9000,
			position:'top-right',
			isClosable: true,
		  })
		}
	}

	const getPotentialWin = ()=>{
		var dividend =  1;
		if(stake>0){
		if(match.team1._id===teamId){
			dividend = (match.team2Stakes + match.drawStakes) -  ((match.team2Stakes + match.drawStakes) * process.env.REACT_APP_TOTAL_COMMISSION)
			dividend>0?setPotentialWin((parseFloat(stake) / 100 ) * dividend): setPotentialWin(1);
		}
		else if(match.team2._id===teamId){
 		    dividend = (match.team1Stakes + match.drawStakes) -  ((match.team1Stakes + match.drawStakes) * process.env.REACT_APP_TOTAL_COMMISSION)
			dividend>0?setPotentialWin((parseFloat(stake) / 100 ) * dividend): setPotentialWin(1);
		}
		else{
			if(teamId==="draw"){
				dividend = (match.team1Stakes + match.team2Stakes) -  ((match.team1Stakes + match.team2Stakes) * process.env.REACT_APP_TOTAL_COMMISSION)
				dividend>0?setPotentialWin((parseFloat(stake) / 100 ) * dividend): setPotentialWin(1);
			}else{
				setPotentialWin(0);
			}
		}
	   }
	}

	const formatTime = (timestamp)=>{
		const myDateTime = DateTime.fromSeconds(timestamp);
		return myDateTime.toLocaleString(DateTime.DATETIME_FULL);
	}

	useEffect(()=>{
		getMatch();
		initBet.on('gamestaked', () => {
		toast({
			title: "Game has been staked successfully",
			status: 'success',
			duration: 9000,
			position:'top-right',
			isClosable: true,
		 });
		setLoading(false);
		navigate("/history");
	   });
    },[])

    return(
        <>
         <Toaster containerStyle={{ position: 'absolute' }} />
      
         <div class="overlay" style={{display:loading?'block':'none'}}>
				<div class="spinner"></div>
				<br/>
				Loading...
		 </div>
		 
		<Sidebar account={account}/>
		 <div className="offcanvas-overly"></div>
		 
		  <div className="main-content">
		  
			<Header account={account}/>
			  <main style={{width:'100%'}}>
			   <section className="sell-nfts-area mb-50 mt-120">
                <div className="container">
				
				 <InnerNav/>
			      
				   <div className="row flex-nowrap">
				
				     <div className="col">
						
					 {
					    match!=null &&
						<div className="row p-20">
						 <div className="col-12 col-xs-12 col-sm-12 mt-30 text-center">
						   <h3> Add Stake</h3>
						 </div>
									
						 <div className="col-12 col-xs-12 col-sm-8 offset-sm-2 inner mt-30 text-center">

											
							<div className="row justify-content-center">
								<div className="col-12 col-lg-12 col-sm-12 col-xs-12 betpop mt-20 mb-20">
							
									<div className="top-item mt-20 d-flex">
										<h4>Your Selection</h4> <button className="btn-dex-small btn-dex-default">{selection}</button>
									</div>
									

									<div className="mid-area">
										<div className="single-area">
											<div className="item-title d-flex align-items-center justify-content-between">
												<span>Your Stake Amount:</span>
											</div>
											<div className="d-flex in-dec-val">
												<input type="text" className="InDeVal1"  onChange={(e)=>{ setStake(e.target.value); getPotentialWin(e.target.value); }}/> <span>BNB</span>		
											</div>
											<div className="d-flex mt-10"><br/>
												<span className="btn-dex-small btn-dex-primary" onClick={(e)=>{ e.preventDefault(); initCreateStake(); }}>Stake</span>
											</div>
										</div>
									</div>
									
									<div className="bottom-area">
										<div className="fee-area">
										  <div className="row">
											 <div className="col-6 col-xs-12 col-sm-6">
											  <p><b>Outcome Dividend:</b><span className="amount"> {potentialWin}  BNB </span><br/><i><small>Outcome dividend is likely to change until start of match</small></i></p>
											  <p className="fee"><b>Total Outcome Withdrawable:</b> <span className="amount">{ new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((potentialWin + parseFloat(stake)))} BNB</span></p>
											 </div>
											 <div className="col-6 col-xs-12 col-sm-6">
											 <p className="date-area"><b>Match:</b> <span className="amount">{match.team1.name} Vs {match.team2.name}</span> </p>
											  <p className="date-area"><b>Time:</b> <span className="amount">{formatTime(match.matchTimestamp)}</span> </p>
											 </div>
										  </div>
										</div>	
						
									</div>
	
								</div>
							</div>
					    </div>
                     </div>

					 }
		  		  
				    </div>
			     </div>

               </div>
			  </section>
             </main>
		   <Nav/>
         </div>   
        </>
    )
}