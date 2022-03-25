import {Contract,ethers} from "ethers";
import staking from "../contracts/Staking.json";
import token from "../contracts/TestCoin.json";
const CONTRACT_ADDRESS = "0x426c7d4B76a1a8e556d2D8cc19b7F994A8a76378";
const TOKEN_ADDRESS = "0x3BE068Bcc82460d866EE6816aC986630964371B7";

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
     await Token.approve(CONTRACT_ADDRESS,wei).then(async(tx) => {
       await timeout(15000);
       await Stake.createStake(wei);
       await timeout(15000);
       return true;
     });
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
      await Token.approve(CONTRACT_ADDRESS,wei).then(async(tx) => {
      await timeout(15000);
      await Stake.createStakeHolder(wei);
      await timeout(15000);
      return true;
     });
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
      await Stake.removeStakeHolder();
      await timeout(15000);
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
    await Stake.withdrawReward();
    await timeout(15000);
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
    await Stake.withdraw(wei);
    return true;
  }catch(error){
    throw new Error(error.message);
  }
}

const timeout = async (delay:number)=>{
  return new Promise( res => setTimeout(res, delay));
}
