import {Link} from "react-router-dom";
import Avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavSocial(){
    return (
      <>
       <nav className="navbar navbar-expand-sm p-0 text-center">
       <div className="col col-12 col-xs-12">
            <ul className="d-flex justify-content-center footer-menu" style={{listStyle:"none"}}>
                    <li><a href="http://twitter.com/@dexscrow1"><FontAwesomeIcon icon={['fab', 'twitter']}  /> </a></li>
                    <li><a href="mailto:support@dexscrow.com"> <FontAwesomeIcon icon="envelope" /> </a></li>
                    <li><a href="http://t.me/dexscrow"><FontAwesomeIcon icon={['fab', 'telegram']}  /> </a></li>
                    <li>
                        <a href="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true" style={{textDecoration:"none"}}> <FontAwesomeIcon icon="file" />   </a> 
                    </li>
            </ul>
        </div>
      </nav>
   </>
    )
}