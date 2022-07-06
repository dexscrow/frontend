import React from 'react';
import { trimText } from '../../../helpers/utils';
//import useLogin from '../../../hooks/useLogin';
import {Link} from "react-router-dom";
import Logo from "../../../assets/logo-long.png";

export default function HomeHeader({account}) {
    //  useEffect(()=>{
    //  },[account])
   
    return (
        <>
		
	    <header>
		  <div className="menu-area">
			<div className="container">
				<div className="row">
					<div className="col-12 p-10">
					<div className="menu-wrap d-flex align-items-center justify-content-between"  style={{background:"#651953"}}>
                      <nav className="menu-nav d-flex align-items-center justify-content-between p-10">
								<div className="logo float-start d-flex align-items-center"> 
								 <Link to="/">
								  <img src={Logo} alt="" />
								 </Link>
								</div>
								
								
								<div className="header-action float-end d-flex align-items-center">
									<ul className="">
									  <li className="header-btn">
									    <Link to="/ad/sell" className="banner-btn text-white">Launch App<i className="fi-sr-arrow-right"></i></Link> 	
									  </li>					  
									</ul>
								</div>
							</nav>
						</div>

					</div>
				</div>
			   </div>
		    </div>
          </header>
        </>
    )
}
