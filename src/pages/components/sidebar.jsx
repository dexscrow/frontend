import React, {useState,useEffect,useCallback} from 'react';
import {Link} from "react-router-dom";

export default function Sidebar({account}) {
    useEffect(() => {
    }, []);

    return (

        <div className="sidebar d-none d-md-block">
		    <div className="sidebar-logo mb-25">
			 { /* <a href=""><img src={Logo} alt="" /></a> */ }
            </div>
            <div className="sidebar-icon">
                <ul>       
                    <li className="active"><Link to="/matches" className="nav-link align-middle text-white text-center px-0"><i className="fi-sr-pulse"></i></Link></li>
                    <li><Link to="/staking" className="nav-link align-middle text-center text-white px-0"><i className="fi-sr-diamond"></i></Link></li>
                    <li><Link to="/profile" className="d-flex align-items-center text-white text-decoration-none"><i className="fi-sr-user"></i></Link></li>
                </ul>
            </div>
        </div>

    )
}
