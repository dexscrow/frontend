import React, {useContext,useState,useEffect,useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import {Link} from "react-router-dom";
import Nav from "../Landing/components/nav";
import NavSocial from "../Landing/components/navsocial";
import AccountContext from "../../contexts/account";
import {totalStakers,totalStaked,stakeOf,createStake,createStakeHolder,rewardOf,withdrawReward,removeStake} from '../../helpers/staking';
const token = localStorage.getItem("authToken");

/*const URL = process.env.REACT_APP_SERVER_URL+'/staking/sitestake';
const USER_STAKING_URL = process.env.REACT_APP_SERVER_URL+'/staking/userstake';
const USER_UNSTAKE_URL = process.env.REACT_APP_SERVER_URL+'/staking/unstake';
const STAKING_WITHDRAWABLE_URL = process.env.REACT_APP_SERVER_URL+'/staking/stakeWithdrawable';
const USER_WITHDRAW_STAKE  = process.env.REACT_APP_SERVER_URL+'/staking/withdrawStake';
const USER_WITHDRAW_REWARD  = process.env.REACT_APP_SERVER_URL+'/staking/withdrawReward';*/

export default function Staking() {
    const [account,setAccount] = useContext(AccountContext);
    const [error,setError] = useState("");
    const [assetStaked,setAssetStaked] = useState(0);
    const [stakers,setStakers] = useState(0);
    const [step,setStep] = useState(1);
    const [terms,setTerms] = useState(0);
    const [amount,setAmount] = useState(0);
    const [userStake,setUserStake] = useState(0);
    const [userReward,setUserReward] = useState(0);
    const authToken = localStorage.getItem("authToken");

    const getStakeOf = useCallback(async() => {
        try{
             const stake = await stakeOf();
             setUserStake(stake);
            }catch(error){
                toast.error('An error occured', {
                    position: 'middle-center',
                });
                setError(error.message)
            }
    });

    const getTotalStakers = useCallback(async() => {
        try{
             const stakers = await totalStakers();
             setStakers(stakers);
            }catch(error){
                toast.error('An error occured', {
                    position: 'middle-center',
                });
                setError(error.message)
            }
    });

    const getTotalStaked = useCallback(async() => {
        try{
             const stake = await totalStaked();
             setAssetStaked(stake);
            }catch(error){
                toast.error('An error occured', {
                    position: 'middle-center',
                });
                setError(error.message)
            }
    });

    const getRewardOf = useCallback(async() => {
        try{
             const reward = await rewardOf();
             setUserReward(reward);
            }catch(error){
                toast.error('An error occured', {
                    position: 'middle-center',
                });
                setError(error.message)
            }
    });

    const stakeInit = useCallback(async() => {
        try{
             toast.error('Staking program not started yet', {
                position: 'middle-center',
             });
             /*
             const stake = createStakeHolder(amount.toString());
             getTotalStaked();
             getStakeOf();
             getRewardOf();
             getTotalStakers();*/
            }catch(error){
                setError(error.message)
            }
    });

    const stake = useCallback(async() => {
        try{
            toast.error('Staking program not started yet', {
                position: 'middle-center',
             });
             /*const stake = createStake(amount);
             getTotalStaked();
             getStakeOf();
             getRewardOf();
             getTotalStakers();*/
            }catch(error){
                setError(error.message)
            }
    });

    const unstake = useCallback(async() => {
        try{
             const stake = removeStake();
             getTotalStaked();
             getStakeOf();
             getRewardOf();
             getTotalStakers();
            }catch(error){
                setError(error.message)
            }
    });

    const runWithdrawReward = useCallback(async() => {
        try{
             const stake = withdrawReward();
             getRewardOf();
            }catch(error){
                setError(error.message)
            }
    });

    useEffect(() => {
        getTotalStaked();
        getStakeOf();
        getRewardOf();
        getTotalStakers();

        // The effect calls innerFunction, hence it should declare it as a dependency
        // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
    }, []);

    return (      
      <> 
       <Toaster containerStyle={{ position: 'absolute' }} />
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
                               <span className="value">{stakers}</span><br/>
                              </div>
                          </div>
                        </div>
                   </div>

                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center ">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Total DXW Staked</span><br/>
                               <span className="value">{assetStaked}</span><br/>
                              </div>
                          </div>
                        </div>
                   </div>

                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center p-0">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">APR</span><br/>
                               <span className="value">{} 15%</span><br/>
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
                               <span className="value">{userStake} DXW</span><br/>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 align-items-center text-center"><br/>
                                {
                                    userStake>0?
                                    <button  type="button" value="Update" className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                        e.preventDefault();
                                    unstake();
                                    }}>Unstake</button>
                                    :
                                    ""
                                }
                               
                              </div>
                          </div>
                        </div>
                   </div>


                   <div className="col col-6 col-xs-6 col-sm-4 align-items-center text-center ">
                       <div className="trade-record-card pt-10 pb-20 mb-10">
                           <div className="row">
                              <div className="col col-12 col-xs-12 col-sm-12">
                               <span className="label">Rewards</span><br/>
                               <span className="value">{userReward} DXW</span><br/>
                              </div>
                              <div className="col col-12 col-xs-12 col-sm-12 align-items-center text-center"><br/>
                                {
                                    userReward>0?
                                    <button type="button" value="Update" className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                        e.preventDefault();
                                        runWithdrawReward();
                                       }}>Withdraw</button>
                                    :
                                    ""
                                }
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
                        <span className={`FormStepIcon ${step === 1 ?"is-passed":""}`}>
                            <span className="FormStepIcon-circle">1</span>
                            <span className="FormStepIcon-title text-start">Instruction</span>
                        </span>
                        </li>
                    
                        <li className="FormStepList-item">
                        <span className={`FormStepIcon ${step === 1 ?"is-active":""} ${step === 2 ?"is-passed":""}`}>
                            <span className="FormStepIcon-circle">2</span>
                            <span className="FormStepIcon-title text-start">Amount</span>
                        </span>
                        </li>
                    
                        <li className="FormStepList-item">
                        <span className={`FormStepIcon FormStepIcon--last ${step === 2 ?"is-active":""}`}>
                            <span className="FormStepIcon-circle">3</span>
                            <span className="FormStepIcon-title text-start">Confirm &amp; Submit</span>
                        </span>
                        </li>
                    </ol>
                    </div>
                    
                    <div className="col col-12">
                        
                        <div className={`row form-row ${step === 1 ?"":"d-none"}`} style={{background:"#ccc"}}>     

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
                                                <input type="checkbox" value="1" name="terms" onClick={(e)=>{
                                                setTerms(e.target.value);
                                                }}/> &nbsp; ticking the box means you agree to staking terms
                                            </span>
                                        </div>
                                        <div className="col col-xs-12 text-center mt-20">
                                            <button className="btn-dex btn-dex-default sell-step1-next" 
                                               onClick={(e)=>{
                                               setStep(2);
                                            }}>Next</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>


                        <div className={`row form-row p-20 stake-step-2 ${step === 2 ?"": "d-none"}`} style={{background:"#ccc"}}>      
                        <div className="col col-12 col-xs-12 col-sm-12 mb-20 mt-20">
                                <h4>Amount</h4>
                        </div>
                        
                        <div className="col col-12 col-xs-12 col-sm-6 offset-sm-3 col-md-6 offset-md-3 form-cluster mb-20">
                         <form>
                            <div className="row form-row"> 
                                <div className="col col-12 col-xs-12 col-sm-12">
                                    <label>Amount to Stake</label>
                                    <div className="input-group mb-3">
                                        <input type="text" name="amount" className="form-control" aria-label="" onChange={(e)=>{
                                        setAmount(e.target.value);
                                    }}/>
                                        <span className="input-group-text">DXW</span>
                                    </div>
                                </div>
                                <div className="col col-12 col-xs-12 col-sm-12 text-end">
                                
                                <button className="btn-dex-small btn-dex-primary" 
                                        onClick={(e)=>{
                                        e.preventDefault();
                                        setStep(1);
                                    }}>Back</button>
                                    {
                                     userStake>0?<button className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                        e.preventDefault();
                                        stakeInit();
                                    }}>Stake</button>:
                                    <button className="btn-dex-small btn-dex-default" onClick={(e)=>{
                                        e.preventDefault();
                                        stakeInit();
                                    }}>Stake</button>
                                    }
                                    
                                </div>
                            </div>


                            </form>
                            
                        </div>
                     </div>

                    </div>

                  </div>
 
                  <NavSocial/>
                </div>
              </div>
          </div>
        <Nav/>
        </>
    )
}
