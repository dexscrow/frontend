import {Link} from "react-router-dom";

export default function Nav(){
    return (
      <nav className="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0" style={{background:"#ccc"}}>
      <div className="row p-0">
          <div className="col-5 col-xs-5 d-flex align-items-center align-middle p-0">

              <ul className="nav nav-pills">
                  <li className="nav-item text-center">
                      <Link to="/ad/list" className="nav-link align-middle px-0">
                          <img src="images/p2p.svg"/><br/>
                           <span className="ms-1 d-sm-inline">P2P Trading</span>
                      </Link>
                  </li>

                  <li className="nav-item text-center">
                      <Link to="/" className="nav-link align-middle px-0">
                          <img src="images/add.svg"/><br/>
                          <span className="ms-1 d-sm-inline">Staking</span>
                      </Link>
                  </li>

              </ul>

          </div>
          
          <div className="col-7 col-xs-7 account float-end pt-10">
              <img src="images/avatar.png" alt="hugenerd" width="60" height="60" className="rounded-circle"/>
          </div>
      </div>
   </nav>
    )
}