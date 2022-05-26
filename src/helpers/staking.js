import {Contract,ethers} from "ethers";
import staking from "../contracts/Staking.json";
import token from "../contracts/TestCoin.json";
const CONTRACT_ADDRESS = "0x77ea85C0DE9C76A2AB7752a4752fBfcA17Dd2c04";
const TOKEN_ADDRESS = "0x8c1042D7EdFB8AAAC79ba6470Df10a096670B71f";

export const totalStaked = async () =>{
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
      const userAddress = await signer.getAddress();
      var totalStaked = await Stake.totalStake();
      let wei = ethers.utils.formatEther(totalStaked);
      return wei;
  }catch(error){
      return 0;
  }
}

export const totalStakers = async () =>{
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
      var stakers = await Stake.totalStakers();
      return parseInt(stakers);
  }catch(error){
    return 0;
  }
}

export const stakeOf = async () =>{
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
      const userAddress = await signer.getAddress();
      var totalStake = await Stake.stakeOf(userAddress);
      let wei = ethers.utils.formatEther(totalStake);
      return wei;
    }catch(error){
      return 0;
    }
}

export const createStake = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  const Token = new ethers.Contract(TOKEN_ADDRESS,token.abi,signer);
  let wei = ethers.utils.parseEther(amount);
  try{
       var transaction = await Token.approve(CONTRACT_ADDRESS,wei);
       await transaction.wait();
       transaction = await Stake.createStake(wei);
       await transaction.wait();
       return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const createStakeHolder = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  const Token = new ethers.Contract(TOKEN_ADDRESS,token.abi,signer);
  let wei = ethers.utils.parseEther(amount.toString());
  try{
      var transaction = await Token.approve(CONTRACT_ADDRESS,wei);
      await transaction.wait();
      transaction = await Stake.createStakeHolder(wei);
      await transaction.wait();
      return true;
    }catch(error){
      throw new Error(error.message);
   }
}

export const removeStake = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  try{
      var transaction =  await Stake.removeStakeHolder();
      await transaction.wait();
      return true;
     }catch(error){
       throw new Error(error.message);
     }
}

export const withdrawReward = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  try{
    var transaction = await Stake.withdrawReward();
    await transaction.wait();
    return true;
  }catch(error){
    throw new Error(error.message);
  }
}

export const rewardOf = async() => {
  try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
      const userAddress = await signer.getAddress();
      var reward = await Stake.calculateReward(userAddress);
      let ether = ethers.utils.formatEther(reward,{commify: true, pad: true});
      return ether;
  }catch(error){
    return 0;
  }
}

export const withdraw = async (amount)=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  let wei = ethers.utils.parseEther(amount.toString());
  //alert(wei.toString());
  try{
    var transaction = await Stake.withdraw(wei);
    await transaction.wait();
    return true;
  }catch(error){
    throw new Error(error.message);
  }
}

const timeout = async (delay:number)=>{
  return new Promise( res => setTimeout(res, delay));
}
