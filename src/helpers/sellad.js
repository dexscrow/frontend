import {ethers} from "ethers";
import sellad from "../contracts/Advert.json";
import token from "../contracts/TestCoin.json";
//const CONTRACT_ADDRESS = process.env.BUY_TRADE_CONTRACT;
const CONTRACT_ADDRESS =  "0x10C2a96284eC4D27A8BEfA4C167d64E0C77161A4";

export const createAdvert = async (advertID,amount,asset) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Ad = new ethers.Contract(CONTRACT_ADDRESS,sellad.abi,signer);
  const Token = new ethers.Contract(asset,token.abi,signer);
  let wei = await ethers.utils.parseEther(amount.toString());

  try{
        var transaction = await Token.approve(CONTRACT_ADDRESS,wei);
        await transaction.wait();
        transaction = await Ad.createAdvert(advertID,wei,asset);
        await transaction.wait();

        return true;
    }catch(error){
      throw new Error(error.message);
   }
}


export const deposit = async (advertID,amount,asset) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Ad = new ethers.Contract(CONTRACT_ADDRESS,sellad.abi,signer);
  const Token = new ethers.Contract(asset,token.abi,signer);
  let wei = await ethers.utils.parseEther(amount.toString());
  
  try{
       var transaction = await Token.approve(CONTRACT_ADDRESS,wei);
       await transaction.wait();
       transaction = await Ad.deposit(advertID,wei);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const close = async (advertID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Ad = new ethers.Contract(CONTRACT_ADDRESS,sellad.abi,signer);
  try{
       var transaction = await Ad.close(advertID);
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
  const Ad = new ethers.Contract(CONTRACT_ADDRESS,sellad.abi,signer);
  try{
       await Ad.close(advertID);
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const getAdBalance = async (adID) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Trade = new ethers.Contract(CONTRACT_ADDRESS,sellad.abi,signer);
  try{
       var transaction = await Trade.getBalance(adID);
       let wei = ethers.utils.formatEther(transaction);
       return transaction;
    }catch(error){
      throw new Error(error.message);
   }
}

const timeout = async (delay:number)=>{
  return new Promise( res => setTimeout(res, delay));
}
