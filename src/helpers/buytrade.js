import {ethers} from "ethers";
import buytrade from "../contracts/Trade.json";
import sellad from "../contracts/Advert.json";
import token from "../contracts/TestCoin.json";
//const CONTRACT_ADDRESS = process.env.TRADE_CONTRACT;
const CONTRACT_ADDRESS = "0xac5b276028fc0B6017A05fB9eF82B6d5A324943D";

export const createBuyTrade = async (tradeID,advertID,amount) => {

  try{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buytrade.abi,signer);
  let wei = ethers.utils.parseEther(amount.toString());
  console.log(Trade);
  // problem is here
   const t = await Trade.createTrade(tradeID,advertID,wei);
   await t.wait();
  return true;
  }catch(error){
    console.log(error);
      alert(JSON.stringify(error));
      throw new Error(error.message);
   }
}

export const transferBuyAsset = async (tradeID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buytrade.abi,signer);
  try{
      var transaction = await Trade.transferAsset(tradeID);
      await transaction.wait();
      return true;
    }catch(error){
      //alert(JSON.stringify(error));
      //console.log(error);
      throw new Error(error.message);
      //throw new Error(error.message);
   }
}

export const cancelBuy = async (tradeID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buytrade.abi,signer);
  try{
       var transaction = await Trade.closeTrade(tradeID);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

const timeout = async (delay)=>{
  return new Promise( res => setTimeout(res, delay));
}
