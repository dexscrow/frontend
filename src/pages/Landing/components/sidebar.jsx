import React from 'react'
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
             <div className="col-auto col-md-1 col-xl-1 px-sm-2 px-0 align-items-center side d-none d-md-block">
                <div className="d-flex flex-column align-items-center px-3 pt-2 text-white min-vh-100">
                    <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span to="/" className="fs-5 d-none d-sm-inline">Dexscrow</span>
                    </Link>
                    
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start menu" id="menu">
                        <li className="nav-item text-center">
                            <a href="#" className="nav-link align-middle px-0">
                                <img src="/images/buy_sell.svg"/><br/>
                                 <span className="ms-1 d-none d-sm-inline">Buy/Sell</span>
                            </a>
                        </li>

                        <li className="nav-item text-center">
                            <a href="#" className="nav-link align-middle px-0">
                                <img src="/images/create.svg"/><br/>
                                <span className="ms-1 d-none d-sm-inline">Create Ad</span>
                            </a>
                        </li>

                    </ul>

                    <div className="row mb-sm-auto mb-0 align-items-center align-items-sm-start menu-rotate">
                    
                        <div className="col col-xs-2 text-center">
                            <span className="">Completed</span><br/>
                            <span className="">96.20%</span>
                       </div>

                        <div className="col col-xs-2 text-center">
                             <span className="">Orders</span><br/>
                             <span className="">124</span>
                       </div>

                      
                    </div>

                    <hr/>
                    <div className="dropdown pb-4">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="/images/avatar.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                            <span className="d-none d-sm-inline mx-1"></span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}
