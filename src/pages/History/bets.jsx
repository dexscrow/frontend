import BetTile from "./betTile";

export default function Bets({games}){
    return(
        <>
            <div className="col-12">
			<h5 className="title">Bet History</h5>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Match</th>
							<th scope="col">Date/Time</th>
							<th scope="col">Stake</th>
							<th scope="col">Reward</th>
							<th scope="col">Status</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{
							games!=null && games.length > 0 ? 
							games.map((game,idx)=>{
								<BetTile key={idx} game={game} />
							})
							: <div style={{textAlign:"center"}}>No Records Found</div>
						}
					</tbody>
				</table>
			</div>
		</div>
        </>
    )
}
