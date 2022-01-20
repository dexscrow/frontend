export default function Chat(){

    return (
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
    )
}