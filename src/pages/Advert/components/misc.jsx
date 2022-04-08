import React from 'react'

export default function Misc({step,notes,setNotes,registered,setRegistered,registerChecked,setRegisterChecked,online,setOnline,autoreply,setAutoReply}) {
    return (
        <>
             <div className={`row buy-step-3 ${step !== 3 ? "d-none":""}`}>     
                    <div className="col col-12 col-xs-12 col-sm-6 col-md-6 form-cluster mb-20">
                        <div className="label"><b>Remarks (Optional) </b></div>
                        <div className="d-flex">
                            <textarea className="form-control" rows="3" value={notes} onChange={(e)=>{
                                setNotes(e.target.value)
                            }}></textarea>
                        </div>
                    </div>

                    <div className="col col-12 col-xs-12 col-sm-6 col-md-6 form-cluster mb-20">
                        <div className="label"><b>Auto Reply (Optional) </b></div>
                        <div className="d-flex">
                            <textarea className="form-control" value={autoreply} onChange={(e)=>{
                                setAutoReply(e.target.value)
                            }} placeholder="Auto reply message will be sent to  the counterparty once the order is created" rows="3"></textarea>
                        </div>
                    </div>

                    <div className="col col-12 col-xs-12 col-sm-12 col-md-12 form-cluster mb-20 dim">
                        Counterpart Conditions
                    </div>

                    <div className="col col-12 col-xs-12 col-sm-4 col-md-4 form-cluster mb-10">
                        <div className="col col-12 col-xs-12 col-sm-12">
                            <div className="label"><b>Registered</b></div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" style={{borderBottom:"0px"}}><input type="checkbox" defaultChecked={registerChecked} onChange={()=>setRegisterChecked(!registerChecked)} /></span>
                            <input type="text" className="form-control" aria-label="" value={registered} onChange={(e)=>setRegistered(e.target.value)}/>
                            <span className="input-group-text">Days Ago</span>
                        </div>
                    </div>

                    <div className="row form-row">     
                        <div className="col col-12 col-xs-12 col-sm-12">
                            <div className="label"><b>Status</b></div>
                        </div>
                        <div className="col col-12 col-xs-12 col-sm-12">
                            <input type="radio" name="online" value="now" checked={online === "now"} onChange={(e)=>setOnline('now')}/> Online Right Now &nbsp;
                            <input type="radio" name="online" value="later" checked={online === "later"} onChange={(e)=>setOnline('later')}/> Offline Manually Later&nbsp;
                        </div>
                    </div> 
                </div> 
        </>
    )
}
