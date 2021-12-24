import React,{useEffect,useContext,useState} from 'react'
import AuthContext from '../../../contexts/auth';
import { trimText } from '../../../helpers/utils';
import { setMetamaskConnection } from '../../../helpers/scrow';
import useLogin from '../../../hooks/useLogin';

export default function Header({account}) {
    const [token,setAuthToken] = useContext(AuthContext);
    const [error,setError] = useState(null)
    const login = useLogin(account,localStorage.getItem("authToken"),setError);
   
    return (
        <>
        <div className="col col-12 header">
                     <div className="row">
                      <div className="col-5 col-xs-5">
                       <div className="logo"> <img src="/images/logo.svg" /></div>
                      </div>
                      <div className="col-7 col-xs-7 text-end">
                          {!account?
                          <>
                          <div className="col col-12">
                          <button className="btn-connect" onClick={()=>{
                              setMetamaskConnection();
                                login();
                              }}><img src="/images/wallet.png"/> &nbsp; Connect Wallet</button> 
                       </div>
                       
                       <div className="col col-12 mt-10">
                       <span>Make sure that <br/>Binance Smart Chain is selected</span>
                      </div>
                      </>
                       :
                           <div>{trimText(account)}</div>
                        }
                      </div>
                     </div>
                   </div>
        </>
    )
}
