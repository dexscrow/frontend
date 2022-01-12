import React,{useContext,useState,useEffect} from 'react'
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import InvalidKyc from "./components/invalidKyc";
import PendingKyc from "./components/pendingKyc";
import VerifiedKyc from "./components/verifiedKyc";
import axios from "axios";
const token = localStorage.getItem("authToken");

const API_URL = process.env.SERVER_URL+"/user/me"
const EMAIL_URL = process.env.SERVER_URL+"/user/email"
const USERNAME_URL = process.env.SERVER_URL+"/user/username"

export default function Profile() {
    const [account,_] = useContext(AccountContext);
    const [user,setUser] = useState(null);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [error,setError] = useState(null);
    const [updatedName,setUpdatedName] = useState("");

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
            {account && <Sidebar/>}



            <div className="col py-3 main">
                  <div className="row p-20">
                   <Header account={account}/>
   
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
                            <span className="label">It is recommended not to use real name. Your nickname & status is connected to your wallet's address.</span><br/>
                        </div>
            
                        <div className="col col-6 col-xs-6 col-sm-3 pt-20">
                            <div className="row">
                                <div className="col col-3 col-xs-3 col-sm-3 text-end">
                                    <img src="images/avatar.png" style={{height:"30px", width:"30px"}}/>
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


                    <div className="trade-record-card pt-10 pb-20 mb-10">
                         <div className="row">
                            <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                              <br/>
                               <b>Rating</b> 
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-9">
                                <div className="row">
                                    <div className="col col-6 col-xs-6 col-sm-3">
                                        <span className="value">100</span><br/>
                                        <span className="label">Orders</span>
                                   </div>

                                   <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">100%</span><br/>
                                    <span className="label">Positive Feedback</span>
                                  </div>

                                  <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">100</span><br/>
                                    <span className="label">Positive</span>
                                 </div>

                                 <div className="col col-6 col-xs-6 col-sm-3">
                                    <span className="value">5</span><br/>
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
                                      <div className="col col-12 col-xs-12 col-sm-9">
                                          <div className="row">
                                              <div className="col">
                                                 <img src="images/approved.svg" style={{width:"40px", height:"40px"}}/>
                                             </div>
           
                                             <div className="col">
                                                 { user.kycStatus === "pending" ? 
                                                 <PendingKyc/> :(
                                                     user.kycStatus === "invalid"?
                                                     <InvalidKyc/> :
                                                     <VerifiedKyc/>
                                                 )
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
       
      <nav className="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0" style={{background:"#ccc"}}>
        <div className="row p-0">
            <div className="col-5 col-xs-5 d-flex align-items-center align-middle p-0">

                <ul className="nav nav-pills">
                    <li className="nav-item text-center">
                        <a href="#" className="nav-link align-middle px-0">
                            <img src="images/buy_sell.svg"/><br/>
                             <span className="ms-1 d-none d-sm-inline">Buy/Sell</span>
                        </a>
                    </li>

                    <li className="nav-item text-center">
                        <a href="#" className="nav-link align-middle px-0">
                            <img src="images/create.svg"/><br/>
                            <span className="ms-1 d-none d-sm-inline">Ad Center</span>
                        </a>
                    </li>
                </ul>
            </div>
            
            <div className="col-7 col-xs-7 account float-end pt-10">
                <img src="images/avatar.png" alt="hugenerd" width="60" height="60" className="rounded-circle"/>
            </div>
        </div>
     </nav>
        </>
    )
}
