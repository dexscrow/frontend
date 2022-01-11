import React,{useContext} from 'react'
import Sidebar from "../Landing/components/sidebar";
import AccountContext from '../../contexts/account';
import Header from "../Landing/components/header";

export default function Trade() {
  const [account,_] = useContext(AccountContext);
    return (
        <>
         <div className="container-fluid body">
        <div className="row flex-nowrap">
         {account && <Sidebar/>}

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
                             <span className="value p-0"> 0314-3123-3133 </span>
                            </div>
                        </div>

                        <div className="row mb-20">
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Amount </span></div>
                             <div className="d-flex"> <h5 className="value">541.45</h5>&nbsp;<h5 className="value dim">NGN</h5></div>
                            </div>
                            <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Amount </span></div>
                             <div className="d-flex"> <h5 className="value">541.45</h5>&nbsp;<h5 className="value dim">NGN</h5></div>
                           </div>
                           <div className="col col-6 col-xs-6 col-sm-4">
                             <div> <span className="label p-0"> Quantity </span></div>
                             <div className="d-flex"> <h5 className="value">109.9</h5>&nbsp;<h5 className="value dim">USDT</h5></div>
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
                                                <span className="btn-dex-small btn-dex-danger">Bank Transfer</span>
                                            </div>
                                            <div className="col col-6 col-xs-6 col-sm-3">
                                              <span className="label p-0"> Name </span><br/>
                                              <h6 className="value">Ola Fashade</h6>
                                           </div>
                                           <div className="col col-6 col-xs-6 col-sm-3">
                                             <span className="label p-0"> Bank Account Number </span><br/>
                                             <h6 className="value">0043320734</h6>
                                           </div>
                                           <div className="col col-6 col-xs-6 col-sm-3">
                                            <span className="label p-0"> Bank Name </span><br/>
                                            <h6 className="value">Kuda Bank</h6>
                                          </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row mb-10">
                            <div className="col col-12 col-xs-12 col-sm-12">
                                <h5 className="value text-success">PAYMENT TO BE MADE 13:30 </h5>
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
