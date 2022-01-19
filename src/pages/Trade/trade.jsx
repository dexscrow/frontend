import React,{useContext,useEffect,useState} from 'react'
import Sidebar from "../Landing/components/sidebar";
import AccountContext from '../../contexts/account';
import Header from "../Landing/components/header";
import Nav from "../Landing/components/nav";
import axios from "axios";
const token = localStorage.getItem("authToken");

const TRADE_URL= process.env.REACT_APP_SERVER_URL+"/trade"

export default function Trade() {
  const [account,_] = useContext(AccountContext);
  const [error,setError] = useState("");
  const [trade,setTrade] = useState({});

  useEffect(()=>{
    const fetchTrade = ()=>{
      const run = async ()=>{
        const {data:response} = await axios.get(TRADE_URL,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        if(response.error){
          setError(response.error);
        }
        if(!response.success){
          setError(response.message)
        }
        console.log(response);
        setTrade(response.data)
      }
    }

  },[account])
    return (
        <>
         <div className="container-fluid body">
        <div className="row flex-nowrap">
        <Sidebar account={account}/>

            <div className="col py-3 main">
                  <div className="row p-20">
                   <Header account={account} />
  
                    </div>

                <div className="row">
                 <div className="trade-record-card mb-10">
                    <div className="row">
                       <div className="col col-12 col-xs-12 col-sm-8 p-30">
                        <div className="row mb-20">
                            <div className="col col-8 col-xs-12 col-sm-8">
                                <h3 className="page-title">Buy Ad</h3>
                            </div>
                            <div className="col col-4 col-xs-12 col-sm-4" style={{fontSize:"11px"}}>
                             <span className="label p-0" style={{fontSize:"11px"}}> ORDER NUMBER </span>
                             <span className="value p-0"> {trade.uid} </span>
                            </div>
                        </div>

                        <div className="row mb-20">
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Rate </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.advert?.currencyRate}</h5>&nbsp;<h5 className="value dim">{trade.advert?.currency}</h5></div>
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Amount </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.price}</h5>&nbsp;<h5 className="value dim">NGN</h5></div>
                           </div>
                           <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Quantity </span></div>
                             <div className="d-flex"> <h5 className="value">{trade.unit}</h5>&nbsp;<h5 className="value dim">{trade.advert?.asset.name}</h5></div>
                           </div>
                        </div>

                        <div className="row mb-20">
                            <div className="trade-record-card p-20 pt-10 pb-20 mb-10">
                                <div className="row mb-20">
                                    <div className="col col-12 col-xs-12 col-sm-12 value mb-10">
                                       Please confirm that you have successfully transferred the money to the seller
                                       through the following payment method
                                    </div>

                                    <div className="card col col-12 col-xs-12 col-sm-12 p-20">
                                        The following is the seller's payment info. Please make sure the money is transferred from an amount
                                        you own. Money will not be transferred automatically by the platform
                                    </div>

                                    <div className="col col-12 col-xs-12 col-sm-12 p-20">
                                        <div className="row mb-20">
                                            <div className="col col-6 col-xs-6 col-sm-3">
                                                <span className="btn-dex-small btn-dex-danger">{trade.advert?.paymentMethod.paymentMethod.name}</span>
                                            </div>
                                            {trade.advert?.paymentMethod && (()=>{
                                              let det = JSON.parse(trade.advert?.paymentMethod.details);
                                               det && Object.entries(det).map(([name,index])=>(
                                                    <>
                                                    <div className="col col-6 col-xs-6 col-sm-3" key={index}>
                                              <span className="label p-0"> {name} </span><br/>
                                              <h6 className="value">{det[name]}</h6>
                                           </div>
                                                    </>
                                                ))
                                            })()
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mb-10">
                            <div className="col col-12 col-xs-12 col-sm-12">
                              timer
                            </div>
                        </div>

                        <div className="row mb-20">
                            <div className="col col-12 col-xs-12 col-sm-12">
                                Please make a payment before timer counts down, otherwise, the order will be cancelled.
                            </div>
                        </div>


                        <div className="row">
                            <div className="col col-12 col-xs-12 col-sm-12">
                              <button className="btn-dex btn-success btn-dex-primary">Transferred, Next</button>
                              <button className="btn-dex btn-dex-danger">Cancel</button>
                            </div>
                        </div>
                       </div>
                        
                       <div className="col col-12 col-xs-12 col-sm-4 p-0" style={{background:"#333",minHeight:"100%"}}>
                         
                         <div className="box direct-chat direct-chat-success" style={{background: "transparent", minHeight:"100%",overflowY:"scroll"}}>
                            {/* .box-header  */}
                            <div className="box-body">
                              {/*  Conversations are loaded here */}
                              <div className="direct-chat-messages">
                                {/* <!-- Message. Default to the left --> */}
                                <div className="direct-chat-msg">
                                  <div className="direct-chat-info clearfix">
                                    {/* <!--<span className="direct-chat-name pull-left">Alexander Pierce</span>--> */}
                                     {/* <!--<span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>-->/ */}
                                  </div>
                                  {/* <!-- /.direct-chat-info --> */}
                                  {/* <!--<img className="direct-chat-img" src="https://bootdey.com/img/Content/user_1.jpg" alt="Message User Image"/>--><!-- /.direct-chat-img --> */}
                                  <div className="direct-chat-text">
                                    Is this template really for free? That's unbelievable!
                                  </div>
                                  {/* <!-- /.direct-chat-text --> */}
                                </div>
                                {/* <!-- /.direct-chat-msg --> */}
                        
                                {/* <!-- Message to the right --> */}
                                <div className="direct-chat-msg right">
                                  <div className="direct-chat-info clearfix">
                                    {/* <!--<span className="direct-chat-name pull-right">Sarah Bullock</span>--> */}
                                    {/* <!--<span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>--> */}
                                  </div>
                                  {/* <!-- /.direct-chat-info --> */}
                                  {/* <!--<img className="direct-chat-img" src="https://bootdey.com/img/Content/user_2.jpg" alt="Message User Image"/>--><!-- /.direct-chat-img --> */}
                                  <div className="direct-chat-text">
                                    You better believe it!
                                  </div>
                                  {/* <!-- /.direct-chat-text --> */}
                                </div>
                                {/* <!-- /.direct-chat-msg --> */}
                              </div>
                              {/* <!--/.direct-chat-messages--> */}
                        
                              {/* <!-- Contacts are loaded here --> */}
                              <div className="direct-chat-contacts">
                                <ul className="contacts-list">
                                  <li>
                                    <a href="#">
                                      <img className="contacts-list-img" src="https://bootdey.com/img/Content/user_1.jpg"/>
                        
                                      <div className="contacts-list-info">
                                            <span className="contacts-list-name">
                                              Count Dracula
                                              <small className="contacts-list-date pull-right">2/28/2015</small>
                                            </span>
                                        <span className="contacts-list-msg">How have you been? I was...</span>
                                      </div>
                                      {/* <!-- /.contacts-list-info --> */}
                                    </a>
                                  </li>
                                  {/* <!-- End Contact Item --> */}
                                </ul>
                                {/* <!-- /.contatcts-list --> */}
                              </div>
                              {/* <!-- /.direct-chat-pane --> */}
                            </div>
                            {/* <!-- /.box-body --> */}
                            <div className="box-footer" style={{position: "absolute",bottom: "0", width:"100%"}}>
                              <form action="#" method="post">
                                <div className="input-group">
                                  <input type="text" name="message" placeholder="Type Message ..." className="form-control" style={{color:"#fff"}}/>
                                      <span className="input-group-btn">
                                        <button type="submit" className="btn btn-success btn-flat">Send</button>
                                      </span>
                                </div>
                              </form>
                            </div>
                            {/* <!-- /.box-footer--> */}
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
