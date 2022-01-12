import {Link} from "react-router-dom";

export default function Nav(){
    return (
      <nav class="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0" style="background:#ccc">
      <div class="row p-0">
          <div class="col-5 col-xs-5 d-flex align-items-center align-middle p-0">

              <ul class="nav nav-pills">
                  <li class="nav-item text-center">
                      <Link to="/ad/trade" class="nav-link align-middle px-0">
                          <img src="images/p2p.svg"/><br/>
                           <span class="ms-1 d-sm-inline">P2P Trading</span>
                      </Link>
                  </li>

                  <li class="nav-item text-center">
                      <Link to="/" class="nav-link align-middle px-0">
                          <img src="images/add.svg"/><br/>
                          <span class="ms-1 d-sm-inline">Staking</span>
                      </Link>
                  </li>

              </ul>

          </div>
          
          <div class="col-7 col-xs-7 account float-end pt-10">
              <img src="images/avatar.png" alt="hugenerd" width="60" height="60" class="rounded-circle"/>
          </div>
      </div>
   </nav>
    )
}