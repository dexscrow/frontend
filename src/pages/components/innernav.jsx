import {Link} from "react-router-dom";
export default function Nav(){
    return (
        <>
		 <div className="row mb-20">
		  <div className="col col-12 col-xs-12">
		  <ul className="d-flex inner-nav" style={{listStyle:"none", padding:"10px"}}>
			 <li className="active">
				 <Link to="/matches" style={{textDecoration:"none"}}>
				 Find Match
				 </Link>
			</li>
			 <li>
				 <Link to="/trades" style={{textDecoration:"none"}}>
				   My Bets
				  </Link>
			 </li>
			 <li>
				 <Link to="/method/payment" style={{textDecoration:"none"}}>Profile</Link>
			 </li>
			 <li>
				 <Link to="/method/payment" style={{textDecoration:"none"}}>Settings</Link>
			 </li>
		   </ul>
		 </div>
	   </div>
      </>
    )
}