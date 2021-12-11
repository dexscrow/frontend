import { useState,useEffect } from "react";
import {Contract,ethers} from "ethers";

async function requestAccount() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log("error");
      console.error(error);
  
      alert("Login to Metamask first");
    }
  }
  

  const Scrow = ()=>{
      useEffect(() => {
         requestAccount();
      }, [])
  };