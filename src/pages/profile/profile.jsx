import React,{useContext,useState,useEffect} from 'react'
import AccountContext from "../../contexts/account";
import {setBinanceWalletConnection} from "../../helpers/scrow";
import {Link} from "react-router-dom";
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png"
import Sidebar from "../Landing/components/sidebar";
import InvalidKyc from "./components/invalidKyc";
import PendingKyc from "./components/pendingKyc";
import Nav from "../Landing/components/nav";
import VerifiedKyc from "./components/verifiedKyc";
import axios from "axios";
const token = localStorage.getItem("authToken");

const API_URL = process.env.REACT_APP_SERVER_URL+"/user/me"
const EMAIL_URL = process.env.REACT_APP_SERVER_URL+"/user/email"
const USERNAME_URL = process.env.REACT_APP_SERVER_URL+"/user/username"

export default function Profile() {
    const [account,_] = useContext(AccountContext);
    const [user,setUser] = useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState(null);

    const updateUsername = ()=>{
        const run = async ()=>{
            try{
                
            const {data:response} = await axios.post(USERNAME_URL,{name:username},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response || response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message)
            }
            return;

            }catch(error){
                
                setError(error.message)
            }

        }
        run();
    }

    const updateEmail = ()=>{
        const run = async ()=>{
            try{
                
            const {data:response} = await axios.post(EMAIL_URL,{email},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response || response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message)
            }
            return;

            }catch(error){
                
                setError(error.message)
            }

        }
        run();
    }
    useEffect(()=>{
        async function request(){ 
        if(!account){
            await setBinanceWalletConnection();
        }
    }
    request();
    },[account])


    useEffect(()=>{
        console.log(user)
        const run = async ()=>{
            try{
                const {data:response} = await axios.get(API_URL,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });

                if(!response || response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError(response.message)
                }
                console.log(response.data)
                setUser(response.data);
            }catch(error){
                setError(error.message)
            }
        }
        run();
    },[account])
    return (
        <>
             <div className="container-fluid body">
        <div className="row flex-nowrap">
        <Sidebar account={account}/>



            <div className="col py-3 main">
                  <div className="row p-0">
                   <Header account={account}/>
                    </div>

                    <div className="row mb-30 mt-20">
                        <div className="col col-6 col-xs-6 col-sm-6">
                        <h3 className="page-title">Profile</h3>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-6 text-end">
                            <span className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Ad Management
                            </span>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><Link class="dropdown-item" to="/ad/create">Create Ad</Link></li>
                            <li><Link class="dropdown-item" to="/ad/list">Ad list</Link></li>
                            </ul>
                        </div>
                    </div>


                    <div className="row">
                    <div className="col col-12 col-xs-12">
                    <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
                         <li className="active">
                             <Link to="/profile" style={{textDecoration:"none"}}>
                             Profile
                             </Link>
                        </li>
                         <li>
                             <Link to="/trades" style={{textDecoration:"none"}}>
                               Trade History 
                              </Link>
                         </li>
                         
                         <li>
                             <Link to="/method/payment" style={{textDecoration:"none"}}>Payment Methods</Link>
                         </li>
                     </ul>
                     </div>
                   </div>


                <div className="row">
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                    <form action="" method="">
                     <div className="row">
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                          <br/>
                           <b>Nickname</b> 
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3">
                            <span className="label p-0">It is recommended not to use real name. Your nickname & status is connected to your wallet's address.</span><br/>
                        </div>
            
                        <div className="col col-6 col-xs-6 col-sm-3 pt-20">
                            <div className="row">
                                <div className="col col-3 col-xs-3 col-sm-3 text-end">
                                    <img src={Avatar} style={{height:"30px", width:"30px"}}/>
                                </div>
                                <div className="col col-9 col-xs-9 col-sm-9">
                                    <input type="text" className="form-control" aria-label="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center"><br/>
                            <button type="button" value="Update" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                                e.preventDefault();
                                updateUsername();
                            }}>Update</button>
                        </div>
                     
                    </div>
                    </form>
                    </div>
                    <div className="trade-record-card pt-10 pb-20 mb-10 col-sm-12">
                    <form action="" method="">
                     <div className="row">
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                          <br/>
                           <b>Email</b> 
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3">
                            <span className="label p-0">Your Email address needs to be valid to recieve update</span><br/>
                        </div>
            
                        <div className="col col-6 col-xs-6 col-sm-3 pt-20">
                            <div className="row">
                                <div className="col col-3 col-xs-3 col-sm-3 text-end">
                                    <img src={Avatar} style={{height:"30px", width:"30px"}}/>
                                </div>
                                <div className="col col-9 col-xs-9 col-sm-9">
                                    <input type="text" className="form-control" aria-label="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center"><br/>
                            <button type="button" value="Update" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                                e.preventDefault();
                                updateEmail();
                            }}>Update</button>
                        </div>
                     
                    </div>
                    </form>
                    </div>
                    <div className="trade-record-card pt-10 pb-20 mb-10">
                         <div className="row">
                            <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                              <br/>
                               <b>Rating</b> 
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-9">
                                <div className="row">
                                    <div className="col col-6 col-xs-6 col-sm-3">
                                        <span className="value">0</span><br/>
                                        <span className="label">Orders</span>
                                   </div>

                                   <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">100%</span><br/>
                                    <span className="label p-0">Positive Feedback</span>
                                  </div>

                                  <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">0</span><br/>
                                    <span className="label">Positive</span>
                                 </div>

                                 <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">0</span><br/>
                                    <span className="label">Negative</span>
                                 </div>

                              </div>
                            
                         </div>
                        </div>
                    </div>



                    
                        <div className="row">

                          <div className="col col-6 col-xs-12 col-sm-6 p-0">
                            <div className="trade-record-card pt-10 pb-20 mb-10">
                             <div className="row">
                                <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                                    <br/>
                                     <b>Account Level</b> 
                                  </div>
                                  <div className="col col-6 col-xs-6 col-sm-9">
                                      <div className="row">
                                          <div className="col">
                                             <img src="images/level1.svg" /><br/>
                                              <span className="label">Level 1</span>
                                         </div>
       
                                         <div className="col">
                                           <img src="images/level2.svg" /><br/>
                                          <span className="label">Level 2</span>
                                        </div>
       
                                        <div className="col">
                                          <img src="images/level3.svg" /><br/>
                                          <span className="label">Level 3</span>
                                       </div>
       
                                    </div>
                                 </div>
                            </div>
                          
                           </div>
                         </div>

                          <div className="col col-6 col-xs-12 col-sm-6">

                            <div className="trade-record-card pt-10 pb-20 mb-10">
                                <div className="row">
                                    <div className="col col-12 col-xs-12 col-sm-3 align-items-center text-center">
                                        <br/>
                                         <b>KYC</b> 
                                      </div>
                                      <div className="col col-12 col-xs-12 col-sm-9 p-20">
                                          <div className="row">
                                              <div className="col">
                                                 <img src="images/approved.svg" style={{width:"40px", height:"40px"}}/>
                                             </div>
           
                                             <div className="col">
                                                 { user && (user.kycStatus === "pending" ? 
                                                 <PendingKyc/> :(
                                                     user.kycStatus === "invalid"?
                                                     <InvalidKyc/> :
                                                     <VerifiedKyc/>
                                                 ))
                                                }
                                            </div>
           
                                            <div className="col text-center">
                                                <button className="btn-dex-small btn-dex-primary">Update</button>
                                           </div>
           
                                        </div>
                                     </div>
                                </div>
                            </div>
   
                          </div>
                        </div>
                    </div>

                   </div>




              </div>
            </div>
       <Nav/>
        </>
    )
}
