import {Contract,ethers} from "ethers";
import staking from "../contracts/Staking.json";
import token from "../contracts/TestCoin.json";
const CONTRACT_ADDRESS = "0x75559A1761b8d4ca0bFF8f918Df37BB4aBe9Bb14";
const TOKEN_ADDRESS = "0x901CB9961D81Ba4911E6B340C82F41fb9372Dc3e";

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
      const userAddress = await signer.getAddress();
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
  const userAddress = await signer.getAddress();
  var stake = await Stake.createStake(1900000000000);
  alert(stake);
}

export const createStakeHolder = async (amount) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  const Token = new ethers.Contract(TOKEN_ADDRESS,token.abi,signer);
  const userAddress = await signer.getAddress();
  let wei = ethers.utils.parseEther(amount);
  await Token.approve(CONTRACT_ADDRESS,wei);
  var stake = await Stake.createStakeHolder(wei);
  alert(JSON.stringify(stake));
}

export const removeStake = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  const userAddress = await signer.getAddress();
  var stake = await Stake.removeStakeHolder();
  alert(stake);
}

export const withdrawReward = async() => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const Stake = new ethers.Contract(CONTRACT_ADDRESS,staking.abi,signer);
  const userAddress = await signer.getAddress();
  var stake = await Stake.withdrawReward();
  alert(stake);
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

export const gotHere = async ()=>{
  alert('here');
}
