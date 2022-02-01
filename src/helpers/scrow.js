import {Contract,ethers} from "ethers";
import advert from "../contracts/Advert.json";
import trade from "../contracts/Trade.json";

export const getBlockchain = async ()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = provider.prepareRequest({method:"net_version"});
  const Advert = new Contract(advert.networks[networkId].address,advert.abi,signer);
  const Trade = new Contract(trade.networks[networkId].address,trade.abi,signer);

  return {Advert,Trade};
}


export const setMetamaskConnection = async ()=>{
  if(!window.ethereum) alert("install metamask");
  const provider = window.ethereum;
  if(!provider) throw new Error("install metamask");
  const account = await provider.request({method:"eth_requestAccounts"});
  const networkId = await provider.request({method:"net_version"})
  if(networkId !== "56" && networkId !== "0x38"){
  //if(networkId !== "97"){
    throw new Error("please select binance smart chain network");
  }
  localStorage.setItem("account",account);
  localStorage.setItem("wallet","metamask");
  window.location.reload();
}


export const setBinanceWalletConnection = async ()=>{
  if(!window.BinanceChain) alert("install metamask");
  const provider = window.BinanceChain;
  if(!provider) throw new Error("install binance chain");
  const account = await provider.request({method:"eth_accounts"});
  const networkId = await provider.request({method:"net_version"});
  //if(networkId !== "56" && networkId !== "0x38"){
  if(networkId!==97){
    throw new Error("please select binance smart chain network")
  }
  localStorage.setItem("account",account);
  localStorage.setItem("wallet","binance");
  window.location.reload();
}

export const disconnectWallet = async ()=>{
   const wallet = localStorage.getItem("wallet")
   if(wallet!==null && wallet=="binance"){
    await window.BinanceChain.request({
      method: "eth_accounts",
      params: [
        {
          eth_accounts: {}
        }
      ]
     });
    } else if(wallet!==null && wallet=="metamask"){
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [
          {
            eth_accounts: {}
          }
        ]
       });
    }
  localStorage.removeItem("authToken")
  localStorage.removeItem("account");
  localStorage.removeItem("wallet");
  window.location.reload();
}