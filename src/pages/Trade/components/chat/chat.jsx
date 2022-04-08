// import io from "socket.io-client";

export default function Chat(){

    return (
        <div className="col col-4 col-xs-12 col-sm-4 p-0 trade-record-card" style={{minHeight:"100%"}}>
                         
        <div className="box direct-chat direct-chat-success" style={{background: "transparent", minHeight:"100%",overflowY:"scroll"}}>
           <div className="box-body">
             <div className="direct-chat-messages">
               <div className="direct-chat-msg">
                 <div className="direct-chat-info clearfix">
                 </div>
                 <div className="direct-chat-text">
                   Hey
                 </div>
               </div>
               <div className="direct-chat-msg right">
                 <div className="direct-chat-info clearfix">
                 </div>
                 <div className="direct-chat-text">
                   Hi
                 </div>
               </div>
             </div>
             <div className="direct-chat-contacts">
               <ul className="contacts-list">
                 <li>
                   {/* <a href="#">
                     <img className="contacts-list-img" src="https://bootdey.com/img/Content/user_1.jpg"/>
       
                     <div className="contacts-list-info">
                           <span className="contacts-list-name">
                             Count Dracula
                             <small className="contacts-list-date pull-right">2/28/2015</small>
                           </span>
                       <span className="contacts-list-msg">How have you been? I was...</span>
                     </div>
                   </a> */}
                 </li>
               </ul>
             </div>
           </div>
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