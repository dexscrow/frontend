import React,{useContext,useState,useEffect,useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AccountContext from "../../contexts/account";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png"
import Sidebar from "../Landing/components/sidebar";
import InvalidKyc from "./components/invalidKyc";
import PendingKyc from "./components/pendingKyc";
import Nav from "../Landing/components/nav";
import VerifiedKyc from "./components/verifiedKyc";
import axios from "axios";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
const token = localStorage.getItem("authToken");

const API_URL = process.env.REACT_APP_SERVER_URL+"/user/me"
const EMAIL_URL = process.env.REACT_APP_SERVER_URL+"/user/email"
const USERNAME_URL = process.env.REACT_APP_SERVER_URL+"/user/username"
const KYC_URL = process.env.REACT_APP_SERVER_URL+"/user/kyc"

export default function Profile() {
    const [account,_] = useContext(AccountContext);
    const [user,setUser] = useState(null);
    const [username,setUsername] = useState('');
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [step,setStep] = useState(1);
    const [usernameUpdate,setUsernameUpdate] = useState(true);
    const [emailUpdate,setEmailUpdate] = useState(true);
    const [email,setEmail] = useState('');
    const [selfie,setSelfie] = useState('');
    const [identity,setIdentity] = useState('');
    const [loading,setLoading] = useState(false);
   
    const [identityModalShow, setIdentityModalShow] = useState(false);
    const identityModalHandleClose = () => setIdentityModalShow(false);
    const identityModalHandleShow = () => setIdentityModalShow(true);
   
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
          const reader = new FileReader();
          reader.onload = function (e) {
            setIdentity(e.target.result);
          };
          reader.readAsDataURL(file);
          return file;
        });
      }, []);
    
    const { acceptedFiles,getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };

      const submitKyc = async() => {
        try{
            setLoading(true);
            if(token==='null' || token===null || token==='undefined'){
                toast.error("Please connect wallet first", {
                    position: 'middle-center',
                });
                return
            }
            const {data:response} = await axios.post(KYC_URL,{firstname,lastname,selfie,identity},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response || response.error){
                toast.error(response.error, {
                    position: 'middle-center',
                  });
            }
            if(!response.success){
                toast.error(response.message, {
                    position: 'middle-center',
                  });
            }else{
                toast.success(response.message, {
                    position: 'middle-center',
                  });
                setIdentityModalShow(false);
                getUser();    
           }
           setLoading(false);
        }catch(error){
            setLoading(false);
            toast.error(error.message, {
                position: 'middle-center',
              });
        }
    };

    const updateUsername = async()=>{
            try{    
            setLoading(true);
            if(token==='null' || token===null || token==='undefined'){
                toast.error("Please connect wallet first", {
                    position: 'middle-center',
                });
                return
            }
            const {data:response} = await axios.post(USERNAME_URL,{name:username},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response){
                toast.error("An error occured with the request", {
                    position: 'middle-center',
                  });
               return;
            }
            if(!response.success){
                toast.error(response.error, {
                    position: 'middle-center',
                  });
            }else{
            toast.success(response.message, {
                position: 'middle-center',
              });
              getUser();
            }
            setLoading(false);
            }catch(error){
                setLoading(false);
                toast.error(error.message, {
                    position: 'middle-center',
                  });
            }
    }

    const updateEmail = async ()=>{
            try{
            setLoading(true);
            if(token==='null' || token===null || token==='undefined'){
                toast.error("Please connect wallet first", {
                    position: 'middle-center',
                });
                return
            }
            const {data:response} = await axios.post(EMAIL_URL,{email},{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            if(!response){
                toast.error("An error occured with the request", {
                    position: 'middle-center',
                  });
                return;
            }
            if(!response.success){
                toast.error(response.error, {
                    position: 'middle-center',
                });
            }else{
                toast.success(response.message, {
                position: 'middle-center',
               });
               getUser();
            }
            setLoading(false);
            return;
            }catch(error){
                setLoading(false);
                toast.error(error.message, {
                    position: 'middle-center',
                 });
            }
    }

    const getUser = async() => {
        try{
            setLoading(true);
            if(token==='null' || token===null || token==='undefined'){
                toast.error("Please connect wallet first", {
                    position: 'middle-center',
                });
                return
            }
            const {data:response} = await axios.get(API_URL,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });

            if(!response || response.error){
                toast.error(response.error, {
                    position: 'middle-center',
                  });
            }
            if(!response.success){
                toast.error(response.message, {
                    position: 'middle-center',
                  });
            }else{
            setUser(response.data);
            setUsername(response.data.username);
            setEmail(response.data.email);
            if(response.data.username!=''){
                setUsernameUpdate(false);
            }
            if(response.data.email!=''){
                setEmailUpdate(false);
            }
           }
           setLoading(false);
        }catch(error){
            setLoading(false);
            toast.error(error.message, {
                position: 'middle-center',
              });
        }
    };
    
    useEffect(()=>{
        getUser();
    },[])

    return (
        <>
        <Toaster containerStyle={{ position: 'absolute' }} />

        <Modal show={identityModalShow} onHide={identityModalHandleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Identity Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>

           <div className={`container ${step !== 1 ? "d-none":""} `}>
            <form action="" method="" style={{border:"1px dotted #f4f4f4", borderRadius:"5px"}} class="p-10">
                <div className="row form-row mb-10">     
                    <div className="col col-12 col-xs-12 col-sm-12">
                        <div className="label"><b>First Name</b></div>
                    </div>
                    <div className="col col-12 col-xs-12 col-sm-12">
                     <input type="text" id="First Name" placeholder="Enter Your First Name" onChange={(e)=>{
                                        setFirstName(e.target.value); }} style={{width:"100%", height:"30px",color:"#ffffff", borderBottom:'0px'}} />
                   </div>
                </div>

                <div className="row form-row mb-10">     
                    <div className="col col-12 col-xs-12 col-sm-12">
                        <div className="label"><b>Last Name</b></div>
                    </div>
                    <div className="col col-12 col-xs-12 col-sm-12">
                     <input type="text" id="Last Name" placeholder="Enter Your Last Name" onChange={(e)=>{
                                        setLastName(e.target.value); }} style={{width:"100%", height:"30px",color:"#ffffff",  borderBottom:'0px'}} />
                   </div>
                </div>

                <div className="row form-row">     
                    <div className="col col-12 col-xs-12 col-sm-12 text-right">
                        <button className="btn-dex btn-dex-primary buy-step1-next" onClick={(e)=>{
                            e.preventDefault();
                            setStep(2);
                            }}>Next</button>
                    </div>        
                </div>

              </form>
            </div>

            <div className={`container ${step !== 2 ? "d-none":""} `}>
              <form action="" method="" style={{border:"1px dotted #f4f4f4", borderRadius:"5px"}} class="p-10">
                <div className="row form-row mb-10">     
                    <div className="col col-12 col-xs-12 col-sm-12">
                        <h3> Take a Selfie</h3>
                    </div>
                </div>

                <div className="row form-row mb-10">     
                  <div className="col col-12 col-xs-12 col-sm-12"> Instructions: Avoid shadows on face or anything blocking face view, no hats, no dark lenses, or anything that obscures the face. Photo should be front view, full face from shoulders up, eyes open and looking at camera. Avoid blurry pictures.</div>
                   <div className="col col-12 col-xs-12 col-sm-12">
                   { selfie === '' && <Webcam 
                        style={{width:"100%"}}
                        audio={false}
                        height={300}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                       >
                        {({ getScreenshot }) => (
                        <button
                            onClick={(e) => {
                            e.preventDefault();
                            const imageSrc = getScreenshot();
                            setSelfie(imageSrc);
                            }}
                        >
                            Capture photo
                        </button>
                        )}
                    </Webcam>
                    }

                    { 
                     selfie !== '' && <img src={selfie} style={{width:"100%", height:"200px"}} alt="Selfie image"/>         
                    }
                    { 
                     selfie !== '' && <button
                                        onClick={(e) => {
                                        e.preventDefault();
                                        setSelfie('');
                                        }}
                                    >
                                    Retake photo
                                    </button>        
                    }
                    
                   </div>
                </div>

                <div className="row form-row">     
                    <div className="col col-12 col-xs-12 col-sm-12 text-right">
                        <button className="btn-dex btn-dex-primary buy-step1-next" onClick={(e)=>{
                            e.preventDefault();
                            setStep(3);
                            }}>Next</button>
                    </div>        
                </div>

              </form>
            </div>


            <div className={`container ${step !== 3 ? "d-none":""} `}>
              <form action="" method="" class="p-10">
                <div className="row form-row mb-10">     
                    <div className="col col-12 col-xs-12 col-sm-12">
                        <h3> Upload Identity Document</h3>
                    </div>
                </div>

                <div className="row form-row mb-10">     
                  <div className="col col-12 col-xs-12 col-sm-12 mb-10"> Instructions: Accepted forms of identity document include; International Passport or a Driver License</div>
                   <div className="col col-12 col-xs-12 col-sm-12">
                     <div {...getRootProps()} className="text-center" style={{padding:'5px',border:"1px dotted #f4f4f4", borderRadius:"5px", minHeight:'100px'}}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        )}

                        <div className="text-center">
                            <button type="button" className="btn btn-primary">
                               Click to select files
                            </button>
                        </div>
                        <div className="mt-10">
                          <img src={identity} alt="Identity" style={{width:'auto', height:'100px'}} />
                        </div>
                      </div>
                   </div>
                </div>

                <div className="row form-row">     
                    <div className="col col-12 col-xs-12 col-sm-12 text-right">
                        <button className="btn-dex btn-dex-primary buy-step1-next" onClick={(e)=>{
                            e.preventDefault();
                            submitKyc();
                            }}>Submit
                        </button>
                    </div>        
                </div>

              </form>
            </div>


             

          


            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        


           <div className="overlay" style={{display:loading?'block':'none'}}>
				<div className="spinner"></div>
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
					   <div className="row mb-30 mt-20">
                        <div className="col col-6 col-xs-6 col-sm-6">
                        <h3 className="page-title">Profile</h3>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-6 text-end">
                            <span className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Ad Management
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><Link className="dropdown-item" to="/ad/create">Create Ad</Link></li>
                            <li><Link className="dropdown-item" to="/ad/list">Ad list</Link></li>
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
				  
				   <div className="row p-10">
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
                                    { !usernameUpdate?                                     
                                     <input type="text" className="form-control" aria-label="" value={username} readOnly />
                                    :<input type="text" className="form-control" aria-label="" value={username}  onChange={(e)=>setUsername(e.target.value)}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center"><br/>
                            <button type="button" value="Update" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                                e.preventDefault();
                                if(!usernameUpdate){
                                }else{
                                 updateUsername();
                                }
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
                                  { 
                                    !emailUpdate?    
                                    <input type="text" className="form-control" aria-label="" value={email} readonly />
                                    :
                                    <input type="text" className="form-control" aria-label="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                  }
                                </div>
                            </div>
                        </div>
                        <div className="col col-6 col-xs-6 col-sm-3 align-items-center text-center"><br/>
                            <button type="button" value="Update" className="btn-dex-small btn-dex-primary" onClick={(e)=>{
                                e.preventDefault();
                                if(!emailUpdate){
                                }else{
                                 updateEmail();
                                }
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

                                        { user && user.kycStatus === "invalid" &&  
                                         <div className="col text-center">
											<button className="btn-dex-small btn-dex-primary" onClick={identityModalHandleShow}>Update</button>
									     </div>
                                        }

									  </div>
								 </div>
							</div>
						</div>

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
