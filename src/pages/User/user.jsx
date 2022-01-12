import{useState,useEffect,useContext} from "react";
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import axios from "axios";

const USER_URL = "http://localhost:8000/user"

export default function Trades(){
    const [account,_] = useContext(AccountContext);
    const [user, setUser] = useState({
        username: "",
        orders: 0,
        rating: 0,
        positiveScore: 0,
        negativeScore: 0,
        accountLevel: 0
    });
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(true);
    const token = localStorage.getItem("authToken");
    useEffect(()=>{
        const run = async ()=>{
            const {data:response} = await axios.get(USER_URL,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(response.error){
                setIsLoading(false);
                setError(response.error)
            }
            if(!response.success){
                setIsLoading(false);
                setError(response.message)
            }
            setIsLoading(false);
            setUser(response.data);
        }
        run();
    },[])
    return(
    <>
      <div class="row">
            <div class="trade-record-card pt-10 pb-20 mb-10">
            <form action="" method="">
                <div class="row">
                <div class="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                    <br/>
                    <b>Nickname</b> 
                </div>
                <div class="col col-6 col-xs-6 col-sm-3">
                    <span class="label">It is recommended not to use real name. Your nickname & status is connected to your wallet’s address.</span><br/>
                </div>
    
                <div class="col col-6 col-xs-6 col-sm-3 pt-20">
                    <div class="row">
                        <div class="col col-3 col-xs-3 col-sm-3 text-end">
                            <img src="images/avatar.png" style="height:30px; width:30px;"/>
                        </div>
                        <div class="col col-9 col-xs-9 col-sm-9">
                            <input type="text" class="form-control" aria-label="" value="Bigfash">
                        </div>
                    </div>
                </div>
                <div class="col col-6 col-xs-6 col-sm-3 align-items-center text-center"><br/>
                    <button ttype="submit" value="Update" class="btn-dex-small btn-dex-primary">Update</button>
                </div>
                
            </div>
            </form>
            </div>


            <div class="trade-record-card pt-10 pb-20 mb-10">
                    <div class="row">
                    <div class="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                        <br/>
                        <b>Rating</b> 
                    </div>
                    <div class="col col-6 col-xs-6 col-sm-9">
                        <div class="row">
                            <div class="col col-6 col-xs-6 col-sm-3">
                                <span class="value">100</span><br/>
                                <span class="label">Orders</span>
                            </div>

                            <div class="col col-6 col-xs-6 col-sm-3">
                            <span class="value">100%</span><br/>
                            <span class="label">Positive Feedback</span>
                            </div>

                            <div class="col col-6 col-xs-6 col-sm-3">
                            <span class="value">100</span><br/>
                            <span class="label">Positive</span>
                            </div>

                            <div class="col col-6 col-xs-6 col-sm-3">
                            <span class="value">5</span><br/>
                            <span class="label">Negative</span>
                            </div>

                        </div>
                    
                    </div>
                </div>
            </div>

             <div class="row">
               <div class="col col-6 col-xs-12 col-sm-6 p-0">
                <div class="trade-record-card pt-10 pb-20 mb-10">
                    <div class="row">
                    <div class="col col-6 col-xs-6 col-sm-3 align-items-center text-center">
                        <br/>
                            <b>Account Level</b> 
                        </div>
                        <div class="col col-6 col-xs-6 col-sm-9">
                            <div class="row">
                                <div class="col">
                                    <img src="images/level1.svg" /><br/>
                                    <span class="label">Level 1</span>
                                </div>

                                <div class="col">
                                <img src="images/level2.svg" /><br/>
                                <span class="label">Level 2</span>
                            </div>

                            <div class="col">
                                <img src="images/level3.svg" /><br/>
                                <span class="label">Level 3</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>

                    <div class="col col-6 col-xs-12 col-sm-6">

                    <div class="trade-record-card pt-10 pb-20 mb-10">
                        <div class="row">
                            <div class="col col-12 col-xs-12 col-sm-3 align-items-center text-center">
                                <br/>
                                    <b>KYC</b> 
                                </div>
                                <div class="col col-12 col-xs-12 col-sm-9">
                                    <div class="row">
                                        <div class="col">
                                            <img src="images/approved.svg" style="width:40px; height:40px;"/>
                                        </div>
    
                                        <div class="col">
                                        <span class="value">Passed</span><br/>
                                        <span class="label">Your data has been verified and accepted</span>
                                    </div>
    
                                    <div class="col text-center">
                                        <a href="" class="btn-dex-small btn-dex-primary">Update</a>
                                    </div>
    
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