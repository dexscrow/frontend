import {Link} from "react-router-dom";
const { DateTime } = require("luxon");

export default function Match({match}){

    const {} = match;

    const formatTime = (timestamp)=>{
		const myDateTime = DateTime.fromSeconds(timestamp);
		return myDateTime.toLocaleString(DateTime.DATETIME_FULL);
	}

    var team1 = match.team1.name.substr(0, 5);
    var team2 = match.team2.name.substr(0, 5);

    return (
        <>
         <div className="col-12 col-xs-12 col-sm-12 col-md-6 mt-10 inner text-center">
            <div className="bet-single-area mt-20">
            <div className="head-area d-flex align-items-center">
                <span className="btn-dex-small btn-dex-bordered">Soccer</span>
                <p>{formatTime(match.matchTimestamp)}</p>
            </div>
            <div className="bet-main-content">
                <div className="team-single">
                    <h4>{match.team1.name}</h4>
                    <span className="mdr">Home</span>
                    <div className="img-area">
                       <img src={match.team1.logo} alt="image"/>
                    </div>
                    <span className="value text-white">{match.team1Stakes} BNB </span>
                    <span className="info">Staked </span>
                </div>
                <div className="mid-area text-center">
                    <div className="countdown d-flex align-items-center justify-content-center">
                        <h4>
                         <span className="seperator">VS</span>
                        </h4>                         
                    </div>
                    <h4>Draw</h4>
                    <span className="value text-white">{match.drawStakes} BNB </span>
                    <span className="info">Staked </span>
                </div>
                <div className="team-single">
                    <h4>{match.team2.name}</h4>
                    <span className="mdr">Away</span>
                    <div className="img-area">
                        <img src={match.team2.logo} alt="image"/>
                    </div>
                    <span className="value text-white">{match.team2Stakes} BNB </span>
                    <span className="info">Staked </span>
                </div>
            </div>
            <div className="bottom-item">
                <Link to={{pathname:'/bet/'+match._id+'/'+match.team1._id}} className="btn-dex-small btn-dex-default">{team1} Win</Link>&nbsp;
                <Link to={{pathname:'/bet/'+match._id+'/draw'}} className="btn-dex-small btn-dex-default">Draw</Link> &nbsp;
                <Link to={{pathname:'/bet/'+match._id+'/'+match.team2._id}} className="btn-dex-small btn-dex-default">{team2} Win</Link>
            </div>
          </div>
        
        </div>
        </>
    )
}