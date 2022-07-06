import React, {useContext,useState,useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Nav from "../Landing/components/nav";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");
const URL = process.env.REACT_APP_SERVER_URL+'/methods/payment/';
const DELETE_URL = process.env.REACT_APP_SERVER_URL+'/methods/payment/delete'; 

export default function Wallet() {
    const [account,setAccount] = useContext(AccountContext);
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [loading,setLoading] = useState(false);
    const [methodId,setMethodId] = useState("");

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const deleteModalHandleClose = () => setDeleteModalShow(false);
    const deleteModalHandleShow = () => setDeleteModalShow(true);

    const deleteMethod = (async() => {
        try{
            const {data:response} = await axios.delete(DELETE_URL+"/"+methodId,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(response.error){
              toast.error(response.error, {
                position: 'middle-center'
              });
            }
            if(!response.success){
              toast.error(response.message, {
                position: 'middle-center'
              });
            }
            if(response.success){
                toast.success("Payment method deleted successfully", {
                    position: 'middle-center'
                  });
              deleteModalHandleClose();
            }
        }catch(err){
            toast.error(err.message, {
              position: 'middle-center'
            });
         }
      });
  
      
    useEffect(()=>{
        const run = async()=>{
            setLoading(true);
            try{
                if(token==='null' || token===null || token==='undefined'){
                    toast.error("Please connect wallet first", {
                        position: 'middle-center',
                    });
                    return
                }
                const {data:response} = await axios.get(URL,{
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                });
                if(response.error){
                    toast.error(response.error, {
                        position: 'middle-center'
                    });
                }
                if(!response.success){
                    toast.error(response.message, {
                        position: 'middle-center'
                    });
                }else{
                setPaymentMethods(response.data);
                }
                setLoading(false);
            }catch(err){
                setLoading(false);
                toast.error(err.message, {
                    position: 'middle-center'
                });
            }
        }
       run();
    },[])
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


     <Modal show={deleteModalShow} onHide={deleteModalHandleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Confirm Ad Closing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <div className="row">
                  <div className="col-xs-12 col-sm-12">
                     Are you sure you want to delete? Click on the Proceed Button below 
                  </div>

                  <div className="col-xs-12 col-sm-12 text-center mt-20">
                     <button className="btn-dex btn-success btn-dex-primary"
                     onClick={(e)=>{
                      e.preventDefault();
                      deleteMethod();
                    }}
                    >Proceed</button>
                  </div>
                </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
      </Modal>



         <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirm Asset Release</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                     Are you sure you want to delete? Click on the Proceed Button below 
                  </div>

                  <div className="col-xs-12 col-sm-12 text-center mt-20">
                     <button className="btn-dex btn-success btn-dex-primary"
                     onClick={(e)=>{
                      e.preventDefault();
                      deleteMethod();
                    }}
                    >Proceed</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

		 
		  <div className="main-content">
		  
			<Header account={account}/>
			 <main style={{width:'100%'}}>
			 
			 <section className="sell-nfts-area mb-50 mt-120">
				<div className="container">
	               <div className="row mb-30 mt-20">
                        <div className="col col-6 col-xs-6 col-sm-6">
                        <h3 className="page-title">Payment Methods</h3>
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
                         <li >
                             <Link to="/profile" style={{textDecoration:"none"}}>
                             Profile
                             </Link>
                        </li>
                         <li>
                             <Link to="/trades" style={{textDecoration:"none"}}>
                               Trade History 
                              </Link>
                         </li>
                         
                         <li className="active">
                             <Link to="/method/payment" style={{textDecoration:"none"}}>Payment Methods</Link>
                         </li>
                     </ul>
                     </div>
                   </div>

                    <div className="row p-10">
					  
					   <div class="col col-12 col-sm-12 col-lg-12 mb-20 mt-20 text-end">
                           <Link to="/methods/payment/new" style={{textDecoration:"none", color:'#000'}} className="btn-small btn-dex-default p-10">
                               Create New +
                            </Link>
                        </div>
                        
                          {
							 paymentMethods.length>0 ? paymentMethods.map((method)=>{
							   let det = JSON.parse(method.details);
							   return (<>
								<div className="trade-record-card pt-10 pb-20 mb-10">
								<div className="row">
								<div className="col col-6 col-xs-6 text-start">
									<button className="btn-dex-small btn-dex-primary"type="button"> {method.paymentMethod?.name}</button>
								</div>
                                <div className="col col-6 col-xs-6 text-end">
									<span className="badge badge-primary"  onClick={(e)=>{
                                        setMethodId(method._id);
                                        deleteModalHandleShow();
                                        }}>X</span>
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
                                  </div>
                                        </>)
                                    })
                                    :
                                    <div className="trade-record-card pt-10 pb-20 mb-10">
                                      <div className="row d-flex justify-content-center align-items-center">
                                        <span className="text-center">
                                        No Payment Method Found
                                        </span>
                                      </div>
                                    </div>
                          }
                      
                    </div>
                  </div>
              </section>

		   </main>
	      <Nav/>
	     </div>
			
        </>
    )
}
