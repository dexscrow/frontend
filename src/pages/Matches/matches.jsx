import axios from "axios";
import {Link} from "react-router-dom";
import { useEffect,useContext,useState,useCallback } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../components/sidebar'
import Header from '../components/header';
import Match from "./match";
import InnerNav from "../components/innernav";
import Nav from "../components/nav";
import Search from "./search"

import AccountContext from '../../contexts/account';
const authToken = localStorage.getItem("authToken");

const MATCHES_URL = process.env.REACT_APP_SERVER_URL+"/game";
const LEAGUES_URL = process.env.REACT_APP_SERVER_URL+"/league/all";
const SEARCH_URL = process.env.REACT_APP_SERVER_URL+"/game/search";
const SEARCH_BY_LEAGUE_URL = process.env.REACT_APP_SERVER_URL+"/game/searchbyleague";

export default function Matches(){
	const [account,_] = useContext(AccountContext);
    const [matches,setMatches] = useState([]);
    const [leagues,setLeagues] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [date,setDate] = useState("");
    const [error,setError] = useState("");
	const [loading,setLoading] = useState(false);
   
    const fetchMatches =  useCallback(async ()=>{
        try{
            const {data:response} = await axios.get(MATCHES_URL);
            if(!response){
                setError("something went wrong")
            }
            if(response.error){
                setError("something went wrong")
            }
            if(response.success == true){
                setMatches(response.data);
            }
        }catch(error){
            setError(error.message)
        }
    })

    const fetchLeagues =  useCallback(async ()=>{
        try{
            const {data:response} = await axios.get(LEAGUES_URL);
            if(!response){
                setError("something went wrong")
            }
            if(response.error){
                setError("something went wrong")
            }
            if(response.success == true){
                setLeagues(response.data);
            }
        }catch(error){
            setError(error.message)
        }
    })

    
    const fetchMatchesByLeague =  useCallback(async (leagueId)=>{
        try{
            const {data:response} = await axios.get(SEARCH_BY_LEAGUE_URL+"/".leagueId);
            if(!response){
                setError("something went wrong")
            }
            if(response.error){
                setError("something went wrong")
            }
            if(response.success == true){
                setLeagues(response.data);
            }
        }catch(error){
            setError(error.message)
        }
    })

    const search =  useCallback(async ()=>{
        try{
            const {data:response} = await axios.post(SEARCH_URL,{
             searchTerm:searchTerm,
             date:date
             }
            ,{
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            });
            if(!response){
                setError("something went wrong")
            }
            if(response.error){
                setError("something went wrong")
            }
            if(response.success == true){
                setMatches(response.data);
            }
        }catch(error){
            setError(error.message)
        }
    })


    useEffect(()=>{
        fetchMatches();
        fetchLeagues();
        //search();
    },[account])

    return (
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
			      <div className="row flex-nowrap">
					<div className="col all-soccer-bets">
					    <InnerNav/>
						<Search leagues={leagues} search={search} fetchMatchByLeague={fetchMatchesByLeague} setSearchTerm={setSearchTerm} setDate={setDate}/>
						<div className="row match">
							{
								matches.length > 0 ?matches.map((match,idx)=><Match key={idx} match={match} />) : <><div style={{textAlign:"center"}} className="text-white">No Match Available</div></>
							}
						</div>
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