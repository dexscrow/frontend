import {Contract,ethers} from "ethers";

export const Scrow = async ()=>{
  if(!window.ethereum){
    throw new Error("No Wallet Found, install Metamask");
  }
  await window.ethereum.send("eth_requestAccounts");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const networkId = await provider.prepareRequest({method:"net_version"});
  const Advert = new Contract();
  const Trade = new Contract();

  return {Advert,Trade};
}