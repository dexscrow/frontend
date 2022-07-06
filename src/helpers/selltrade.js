import {ethers} from "ethers";
import buyad from "../contracts/BuyAdvert.json";
import token from "../contracts/TestCoin.json";
//const CONTRACT_ADDRESS = process.env.BUY_AD_CONTRACT;
const CONTRACT_ADDRESS = "0xF26E16571F5ff6Ba9dbD862c8BEc2E38C516Bc5d";

export const createSellTrade = async (advertID,buyer,asset,amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buyad.abi,signer);
  const Token = new ethers.Contract(asset,token.abi,signer);
  let wei = ethers.utils.parseEther(amount.toString());
  
  try{
       var transaction = await Token.approve(CONTRACT_ADDRESS,wei);
       await transaction.wait();
       transaction = await Trade.createSellTrade(advertID,buyer,asset,wei);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const transferAsset = async (advertID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buyad.abi,signer);
  try{
       var transaction = await Trade.transferAsset(advertID);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const cancel = async (advertID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,buyad.abi,signer);
  try{
       var transaction =  await Trade.close(advertID);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}


const timeout = async (delay:number)=>{
  return new Promise( res => setTimeout(res, delay));
}
