import {Link} from "react-router-dom";
import Add from "../../../assets/add.svg";
import Avatar from "../../../assets/avatar.png";
import P2P from "../../../assets/p2p.svg";
import Logo from "../../../assets/logo-small.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Nav(){
    return (
      <>   
	  <nav className="navbar fixed-bottom navbar-expand-sm d-block d-md-none bottom-nav p-0">
		  <div className="row p-0">
			  <div className="sidebar-icon">
					<ul>       
						<li className="active"><Link to="/ad/sell" className="nav-link align-middle text-center text-white px-0"><i className="fi-sr-dashboard"></i></Link></li>
						<li><Link to="/staking" className="nav-link align-middle text-center text-white px-0"><i className="fi-sr-diamond"></i></Link></li>
						<li><Link to="/profile" className="d-flex align-items-center text-white text-decoration-none"><i className="fi-sr-user"></i></Link></li>
					</ul>
				</div>
		  </div>
	   </nav>
	   
   
	   <footer>
		<div className="footer-top-wrap">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-xl-3 col-lg-4 col-md-5 col-sm-9">
						<div className="footer-widget">
							<div className="footer-logo mb-25">
								 <Link to="/"><img src={Logo} alt="" /> </Link>
							</div>
							<p>First Decentralized Peer to Peer Crypto-Fiat Trading Platform allowing traders to seamlessly trade their BEP-20 tokens 
							for fiat of their choice.</p>
							<ul className="footer-social">
								  <li><a href="http://twitter.com/@dexscrow1"><FontAwesomeIcon icon={['fab', 'twitter']}  /> </a></li>
								  <li><a href="mailto:support@dexscrow.com"> <FontAwesomeIcon icon="envelope" /> </a></li>
								  <li><a href="http://t.me/dexscrow"><FontAwesomeIcon icon={['fab', 'telegram']}  /> </a></li>
								  <li>
										<a href="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true" style={{textDecoration:"none"}}> <FontAwesomeIcon icon="file" />   </a> 
						         </li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-3 col-sm-6">
						<div className="footer-widget">
							<h4 className="fw-title">Website</h4>
							<ul className="fw-links">
								<li><a href="https://dexscrow.com">Home</a></li>
								<li><a href="https://dexscrow.com/#featured">Features</a></li>
								<li><a href="https://dexscrow.com/#token">Tokenomics</a></li>
								<li><a href="https://dexscrow.com/#road">Roadmap</a></li>
							</ul>
						</div>
					</div>
					<div className="col-lg-2 col-md-3 col-sm-6">
						<div className="footer-widget">
							<h4 className="fw-title">Useful Links</h4>
							<ul className="fw-links">
								<li><a href="https://github.com/dexscrow/documentation/blob/main/whitepaper.pdf?raw=true">Whitepaper</a></li>
								<li><a href="https://www.dextools.io/app/bsc/pair-explorer/0xda7d1c5622cd7e24f8781edbe6749440a7076e46">Chat</a></li>
								<li><a href="https://github.com/ApeAudits1/Smart-Contract-Audits/blob/main/FungieDao(Child%20Contract).pdf">Audit</a></li>
							</ul>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="footer-widget">
							<h4 className="fw-title">Contact</h4>
							<ul className="fw-links">
								<li><a href="https://t.me/dexscrow">Whitepaper</a></li>
								<li><a href="https://t.me/dexscrow_announcement">Announcement Channel</a></li>
								<li><a href="https://www.twitter.com/dexscrow1">Twitter</a></li>
								<li><a href="mailto:support@dexscrow.com">support@dexscrow.com</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="copyright-wrap">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-md-6">
						<div className="copyright-text">
							<p>All rights reserved © 2022 by <a href="#">Dexscrow</a></p>
						</div>
					</div>
					<div className="col-md-6">
						<ul className="copyright-link-list">
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Terms And Condition</a></li>
							<li><a href="#">Contact Us</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>	 
   </>
    )
}