import {Link} from "react-router-dom";
import Add from "../../../assets/add.svg";
import Avatar from "../../../assets/avatar.png";
import P2P from "../../../assets/p2p.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavSocial(){
    return (
      <>
       <nav className="navbar navbar-expand-sm p-0 text-center">
       <div className="col col-12 col-xs-12">
            <ul className="d-flex justify-content-center social-nav" style={{listStyle:"none"}}>
                    <li className="active">
                        <FontAwesomeIcon icon={['fab', 'twitter']}  /> 
                        <a href="https://twitter.com/Dexscrow1" style={{textDecoration:"none"}}> Twitter</a> 
                   </li>
                    <li>
                        <FontAwesomeIcon icon={['fab', 'telegram']}  /> 
                        <a href="https://t.me/dexscrow" style={{textDecoration:"none"}}> Telegram</a> 
                    </li>
                    <li>
                        <FontAwesomeIcon icon="file" />  
                        <a href="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true" style={{textDecoration:"none"}}> White Paper</a> 
                    </li>
                </ul>
        </div>
      </nav>
   </>
    )
}