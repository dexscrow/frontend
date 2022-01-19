import React from 'react'
import {Link} from "react-router-dom";
import Add from "../../../assets/add.svg";
import Avatar from "../../../assets/avatar.png";
import P2P from "../../../assets/p2p.svg";

export default function Sidebar({account}) {
    return (
             <div className="col-auto col-md-1 col-xl-1 px-sm-2 px-0 align-items-center side d-none d-md-block">
                <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                    <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">&nbsp;</span>
                    </Link>
                    
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start menu" id="menu">
                        <li className="nav-item text-center" style={{width:"100%"}}>
                            <Link to="/ad/buy" className="nav-link align-middle text-center px-0">
                                <img src={P2P}/><br/>
                                 <span className="ms-1 d-none d-sm-inline">P2P Trade</span>
                            </Link>
                        </li>

                        <li className="nav-item text-center" style={{width:"100%"}}>
                            <Link to="/" className="nav-link align-middle text-center px-0">
                                <img src={Add}/><br/>
                                <span className="ms-1 d-none d-sm-inline">Staking</span>
                            </Link>
                        </li>

                    </ul>

                    {
                        
                        account && <div className="row mb-sm-auto mb-0 align-items-center align-items-sm-start menu-rotate">
                    
                        <div className="col col-xs-2 text-center">
                            <span className="">Completed</span><br/>
                            <span className="">100%</span>
                       </div>

                        <div className="col col-xs-2 text-center">
                             <span className="">Orders</span><br/>
                             <span className="">0</span>
                       </div>

                      
                    </div>}

                    <hr/>
                        { account &&   <div className="dropdown pb-4">
                                <Link to="/profile" className="d-flex align-items-center text-white text-decoration-none">
                                    <img src={Avatar} alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                                    <span className="d-none d-sm-inline mx-1"></span>
                                </Link>
                            </div>}
                </div>
            </div>

    )
}
