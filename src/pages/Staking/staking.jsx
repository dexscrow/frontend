import React, {useContext,useState,useEffect,useCallback} from 'react'
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import {Link} from "react-router-dom";
import axios from "axios";
import Nav from "../Landing/components/nav";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const URL = process.env.REACT_APP_SERVER_URL+'/staking/sitestake';
const USER_STAKING_URL = process.env.REACT_APP_SERVER_URL+'/staking/userstake';
const USER_UNSTAKE_URL = process.env.REACT_APP_SERVER_URL+'/staking/unstake';

export default function Staking() {
    const [account,setAccount] = useContext(AccountContext);
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [error,setError] = useState("");
    const [siteStake,setSiteStake] = useState("");
    const [userStake,setUserStake] = useState("");
    const authToken = localStorage.getItem("authToken");

    const fetchSiteStake = useCallback(async() => {
        try{
            const {data:response} = await axios.get(URL,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message)
            }
            setSiteStake(response.data);
        }catch(err){
            setError(err.message)
        }
    });

    const fetchUserStake  = useCallback(async() => {
        try{
            const {data:response} = await axios.get(USER_STAKING_URL,{
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            });
            if(response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message);
            }
            // console.log(response)
            setUserStake(response.data);
            
        }catch(error){
            setError(error.message)
        }
    });
 
    useEffect(() => {
        fetchSiteStake();
        fetchUserStake();
        // The effect calls innerFunction, hence it should declare it as a dependency
        // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
    }, []);

    const unstake = ()=>{
        const run = async ()=>{
            try{
                
            const {data:response} = await axios.post(USER_UNSTAKE_URL,{},{
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
            fetchUserStake();
            return;
            }catch(error){
                setError(error.message)
            }
        }
        run();
    }

    return (      
      <> 
       <div className="container-fluid body">
            <div className="row flex-nowrap">
              <Sidebar account={account}/>
                <div className="col py-3 main">
                    <div className="row p-0">
                        <Header account={account} />
                    </div>


                    <div className="row mb-30 mt-20">
                        <div className="col col-6 col-xs-6 col-sm-6">
                        <h3 className="page-title">Staking</h3>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-6 text-end">
                            &nbsp;&nbsp;
                        </div>
                    </div>


                  <div className="row">                   
                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center p-0">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Number of Stakers</span> <br/>
                               <span className="value">{siteStake.stakers?siteStake.stakers:0}</span><br/>
                              </div>
                          </div>
                        </div>
                   </div>

                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center ">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Total DXW Staked</span><br/>
                               <span className="value">{siteStake.totalStaked?siteStake.totalStaked:0}</span><br/>
                              </div>
                          </div>
                        </div>
                   </div>

                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center p-0">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">APY</span><br/>
                               <span className="value">{siteStake.apy?siteStake.apy:0}%</span><br/>
                              </div>
                          </div>
                        </div>
                   </div>
                 </div>


                
                 <div className="row">
                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center p-0">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Staked</span> <br/>
                               <span className="value">{userStake.stakedAmount?userStake.stakedAmount:0} DXW</span><br/>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 align-items-center text-center"><br/>
                               <button  type="button" value="Update" className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                e.preventDefault();
                               unstake();
                               }}>Unstake</button>
                              </div>
                          </div>
                        </div>
                   </div>

                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center ">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Rewards</span><br/>
                               <span className="value">{userStake.stakeReward?userStake.stakeReward:0} DXW</span><br/>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 align-items-center text-center"><br/>
                               <button type="submit" value="Update" className="btn-dex-small btn-dex-default">Withdraw</button>
                              </div>
                          </div>
                        </div>
                   </div>
                 </div>


                 <div className="row">
                    <div className="col col-12 mt-20 align-items-center text-center">
                        <h4>Stake Your DXW</h4>
                    </div>

                    <div className="col col-12 col-sm-12 mt-20">
                    <ol className="FormStepList">
                        <li className="FormStepList-item">
                        <span className="FormStepIcon is-passed">
                            <span className="FormStepIcon-circle">1</span>
                            <span className="FormStepIcon-title text-start">Instruction</span>
                        </span>
                        </li>
                    
                        <li className="FormStepList-item">
                        <span className="FormStepIcon is-active">
                            <span className="FormStepIcon-circle">2</span>
                            <span className="FormStepIcon-title text-start">Amount</span>
                        </span>
                        </li>
                    
                        <li className="FormStepList-item">
                        <span className="FormStepIcon FormStepIcon--last">
                            <span className="FormStepIcon-circle">3</span>
                            <span className="FormStepIcon-title text-start">Confirm &amp; Submit</span>
                        </span>
                        </li>
                    </ol>
                    </div>
                    
                    <div className="col col-12">
                        
                        <div className="row form-row stake-step-1" style={{background:"#ccc"}}>     

                            <div className="col col-12 col-xs-12 col-sm-12 mb-20 mt-20">
                                <h4>Instruction</h4>
                            </div>
                        
                            <div className="col col-12 col-xs-12 col-sm-12 col-md-12 form-cluster mb-20">
                                
                                <div className="cPanelContainer">
                                   
                                    <div className="cPanelContent row">
                                    
                                    
                                    <div className="cPanelSection col col-xs-6">
                                    <div className="cPanelArrowPulse"></div>
                                    <h5>Connected with Wallet</h5>
                                    <p>If not connected, click the "Connect Wallet" button in the top right corner</p>
                                    </div>
                                
                                   
                                    <div className="cPanelSection col col-xs-6">
                                    <div className="cPanelArrowPulse"></div>
                                    <h5>DXW available to deposit</h5>
                                    <p>Current Balance: 0.0000</p>
                                    </div>
                                    
                                   
                                    <div className="cPanelSection col col-xs-6">
                                    <div className="cPanelArrowPulse"></div>
                                    <h5>BNB available</h5>
                                    <p>BNB is required to pay transaction fees on the Binance Smart Chain network.
                                        BNB Balance: 0.0000</p>
                                    </div>
                                
                                    
                                    <div className="cPanelSection col col-xs-6">
                                    <h5> Stake</h5>
                                    <p>Enter amount of DXW you want to stake and approve transaction</p>
                                    </div>
                                    
                                    </div>
                                
                                
                                    <div className="cPanelFooter">
                                        <div className="col col-xs-12 text-center">
                                            <span>
                                                <input type="checkbox" name="terms" /> &nbsp;  Yea, I have read the <u data-bs-toggle="modal" data-bs-target="#termsModal">Staking Term</u>
                                            </span>
                                        </div>
                                        <div className="col col-xs-12 text-center mt-20">
                                            <button className="btn-dex btn-dex-default sell-step1-next">Next</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>


                        <div className="row form-row stake-step-2" style={{background:"#ccc"}}>      
                        <div className="col col-12 col-xs-12 col-sm-12 mb-20 mt-20">
                                <h4>Amount</h4>
                        </div>
                        
                        <div className="col col-12 col-xs-12 col-sm-12 col-md-12 form-cluster mb-20">
                        <form action="" method="">
                            <div className="row form-row"> 
                                <div className="col col-6 col-xs-6 col-sm-4">
                                    <label>Total Amount</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" aria-label="" />
                                        <span className="input-group-text">DXW</span>
                                    </div>
                                </div>
                                <div className="col col-6 col-xs-6 col-sm-4">
                                    <button className="btn-dex-small btn-dex-default">Stake</button>
                                </div>
                            </div>
                            </form>
                            
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
