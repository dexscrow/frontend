import { useState } from "react";
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

  if(!window.ethereum) throw new Error("install metamask");

  await window.ethereum.request({method:"eth_requestAccounts"});

}

export const disconnectWallet = async ()=>{
  await await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {}
      }
    ]
  });
}