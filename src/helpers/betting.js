import {ethers} from "ethers";
import betting from "../blockchain/Betting.json";

const BETTING_CONTRACT_ADDRESS = "0xc2088a01412EDD6a41B4A949F8934f8BfD4b6b83";

export const createStake = async (gameId,matchId,stake,teamId,odd)=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   await provider.send("eth_requestAccounts", []);
   const signer = provider.getSigner();
   const Bet = new ethers.Contract(BETTING_CONTRACT_ADDRESS,betting.abi,signer);
   let wei = ethers.utils.parseEther(stake);
   try{
        var transaction = await Token.approve(BETTING_CONTRACT_ADDRESS,wei);
        await transaction.wait();
        transaction = await Bet.createStake(gameId,matchId,wei,teamId,odd);
        await transaction.wait();
        return true;
     }catch(error){
       throw new Error(error.message);
    }
 }
 