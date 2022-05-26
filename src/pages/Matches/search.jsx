import {useEffect}  from "react";

export default function Search({leagues,league,fetchMatchByLeague,search,setSearchTerm,setDate}){

	useEffect(()=>{
       
    })

    return (
        <>
        <div className="row">
		  <div className="col-12 col-xs-12">
		  <div className="filter-section mb-60">
			<div className="section-text text-center">
				<h3>Search Matches</h3>
			</div>
			<form>
				<div className="row mt-10">
					
					<div className="col-xl-3 col-lg-6 mt-10">
						<div className="single-input">
						  <img src="images/trophy.png" alt="icon"/>
						  <select className="form-control no-radius" value={league} onChange={(e)=>{
							  fetchMatchByLeague(e.target.value);
							}
							  }>
							<option value="">Select League</option>
								{
								  leagues && leagues.map((league)=>(
									<>
									  <option value={league._id}>{league.name}</option>
									</>
								  ))
								}
							</select>
						</div>
					</div>


					<div className="col-xl-3 col-lg-6 mt-10">
						<div className="input-area">
							<img src="images/search.png" alt="icon"/>
							<input type="text" placeholder="Search by Team" onChange={(e)=>setSearchTerm(e.target.value)}/>
						</div>
					</div>

					<div className="col-xl-3 col-lg-6 mt-10">
						<div className="input-area">
							<img src="images/calendar.png" alt="icon"/>
							<input type="date" id="dateSelect" placeholder="Select Date" oonChange={(e)=>setDate(e.target.value)}/>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 mt-10">
						<button className="btn btn-sm btn-dex-primary" onClick={(e)=>{
							e.preventDefault();
					      	search();
						   }}> Search </button>
					</div>
					
				</div>
			</form>
		  </div>
		  </div>
		</div>
      </>
    )
}