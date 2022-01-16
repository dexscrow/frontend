import React, {useContext,useState,useEffect} from 'react'
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import {Link} from "react-router-dom";
import axios from "axios";
import Nav from "../Landing/components/nav";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const URL = process.env.REACT_APP_SERVER_URL+'/methods/payment/';


export default function Wallet() {
    const [account,setAccount] = useContext(AccountContext);
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [error,setError] = useState("");

    useEffect(()=>{
        const run = async()=>{
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
                setPaymentMethods(response.data);
            }catch(err){
                setError(err.message)
            }
            
        }
       run();
    },[])
    return (
            
    <><div className="container-fluid body">
            <div className="row flex-nowrap">
                <Sidebar account={account}/>
                <div className="col py-3 main">
                    <div className="row p-20">
                        <Header account={account} />
                    </div>
                    <div className="row">
                        <div className="col col-12">
                            <h3 className="page-title">Payment Methods</h3>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col col-12 col-xs-12">
                        <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
                         <li >
                             <Link to="/profile" style={{textDecoration:"none"}}>
                             Profile
                             </Link>
                             </li>
                         <li>
                             <Link to="/trades" style={{textDecoration:"none"}}>
                             Transactions History 
                              </Link>
                              </li>
                         <li >
                             <Link to="/ad/list" style={{textDecoration:"none"}}>
                             Ad Lists
                             </Link>
                             </li>
                         <li className="active">
                             <Link to="/method/payment" style={{textDecoration:"none"}}>Payment Methods</Link>
                              </li>
                     </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="trade-record-card pt-10 pb-20">
                        {
                                    paymentMethods && paymentMethods.map((method)=>{

                                        let det = JSON.parse(method.details);
                                       return (<>
                                        <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <button className="btn-dex-small btn-dex-primary"type="button"> {method.paymentMethod?.name}</button>
                                    </div>
                                </div>
                                {
                                    
                                    Object.entries(det).map(([name,index])=>(
                                        <>
                                             <div className="row" key={index}>
                                    <div className="col col-6 col-xs-6 label dim text-end">
                                        <b>{name} </b> :
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                       <b> {det[name]}</b>
                                    </div>
                                </div>
                                        </>
                                    ))
                                }
                                        </>)
                                    })
                        }
                        </div>
                    </div>


                </div>
            </div>


        </div>
        <Nav/>
        </>
    )
}
