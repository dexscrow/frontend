import {Link} from "react-router-dom";
import Add from "../../../assets/add.svg";
import Avatar from "../../../assets/avatar.png";
import P2P from "../../../assets/p2p.svg";

export default function Nav(){
    return (
      <>
      <nav className="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0" style={{background:"#ccc"}}>
      <div className="row p-0">
          <div className="col-10 col-xs-10 d-flex align-items-center align-middle p-0">

              <ul className="nav nav-pills">
                  <li className="nav-item text-center">
                      <Link to="/ad/sell" className="nav-link align-middle px-0">
                          <img src={P2P} /><br/>
                           <span className="ms-1 d-sm-inline">P2P Trade</span>
                      </Link>
                  </li>

                  <li className="nav-item text-center">
                      <Link to="/staking" className="nav-link align-middle px-0">
                          <img src={Add}/><br/>
                          <span className="ms-1 d-sm-inline">Staking</span>
                      </Link>
                  </li>

              </ul>

          </div>
          
          <div className="col-2 col-xs-2 account float-end pt-10">
              <Link to="/profile">
              <img src={Avatar} alt="hugenerd" width="60" height="60" className="rounded-circle"/>
              </Link>
          </div>
      </div>
   </nav>
   </>
    )
}