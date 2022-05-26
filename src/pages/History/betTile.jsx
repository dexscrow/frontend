export default function BetTile({game}){
    return(
        <>
            <tr>
                <th scope="row">Arsenal Vs Chelsea</th>
                <td>{(new Date(game.createdAt)).toDateString()}</td>
                <td>0.02 BNB</td>
                <td>0.05 BNB</td>
                <td>Win</td>
                <td>Withdraw</td>
            </tr>
        </>
    )
}