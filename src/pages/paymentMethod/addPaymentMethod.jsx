import React,{useContext,useState,useEffect} from "react";
import {config} from "dotenv";
import {Navigate,useNavigate} from "react-router-dom";
import AccountContext from "../../contexts/account";
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import Nav from "../Landing/components/nav";
import axios from "axios";
config();
const token = localStorage.getItem("authToken");

const PAYMENT_METHODS_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment/all";

const ADD_PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL+"/methods/payment";


export default function AddPaymentMethod(){
    const [account,_] = useContext(AccountContext);
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [error,setError] = useState(null);
    const [currentMethod,setCurrentMethod] = useState([]);
    const [currentMethodDetails,setCurrentMethodDetails] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        data.append("paymentMethod",currentMethod._id);
        addPaymentMethod(data)
    }


    const addPaymentMethod = (formdata)=>{
        const run = async ()=>{
            const req = new Request(ADD_PAYMENT_METHOD_URL,{
                body:formdata,
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${token}`,
                }
            })
            const response = await fetch(req);
            if(response.error){
                setError(response.error)
            }
            if(!response.success){
                setError(response.message)
            }
           navigate("/method/payment");
        }
        run();
    }
 

    useEffect(()=>{
        
        const getMethods = async ()=>{
            try{
                
                const {data:response} = await axios.get(PAYMENT_METHODS_URL,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                if(response.error){
                    setError(response.error)
                }
                if(!response.success){
                    setError("cannot make request")
                }
                setPaymentMethods(response.data);
                
            }catch(error){
                setError(error.message)
            }
        };
        getMethods();
    },[account])


    return (
        <>
         <div className="container-fluid body">
            <div className="row flex-nowrap">
            <Sidebar account={account}/>

                <div className="col py-3 main">
                    <div className="row p-20">
                    <Header account={account}/>
                        </div>

                    <div className="row">
                    <div className="col col-12">
                        <h3 className="page-title">Add Payment Method</h3>
                    </div>
                    </div>

                    <div className="row">


                    <div className="trade-record-card pt-10 pb-20 mb-10">
                        <div className="row gap-2">
                        <div className="col col-12 col-xs-12 col-sm-12 mb-20">
                            {paymentMethods && paymentMethods.map((method)=>(
                                <>
                                    <button key={method._id} className="btn-dex-small btn-dex-primary m-2" onClick={(e)=>{
                                        setCurrentMethod(method);
                                        setCurrentMethodDetails(JSON.parse(method.details));
                                        }}>{method.name}</button>
                                </>
                            ))}
                        </div>
                        <div className="col col-12 col-xs-12 col-sm-12 d-flex justify-content-center" >
                            <form style={{width:"70%"}} onSubmit={handleSubmit}>
                            {currentMethodDetails && currentMethodDetails.map((detail)=>(
                                <>
                                <div className="row mb-20"> 
                                <div className="col col-12 col-xs-12 col-sm-10">
                                    <label className="dim">{detail.label}</label>
                                    <input type={detail.type === "string"? "text":"number"} name={(detail.label).toString()} className="form-control" placeholder={detail.instruction}/>
                                </div>
                            </div>
                                </>
                            ))}
                        
                         
                            {currentMethodDetails.length>0?
                             <div className="row mb-20">     
                                <div className="col col-xs-12 col-sm-10 text-end">
                                <button className="btn-dex-small btn-dex-danger">Cancel</button>
                                <button className="btn-dex-small btn-dex-default" type="submit">Confirm</button>
                                </div>
                            </div>:""
                             } 

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