import React ,{useContext,useState} from 'react'
import Sidebar from '../Landing/components/sidebar'
import Header from '../Landing/components/header'
import AccountContext from '../../contexts/account'
import PaymentModal from './components/paymentModal'
import Progressbar from './components/progressbar'
import BuyTab from './components/buyTab'
import SellTab from './components/sellTab'
import ConfirmAd from './components/confirmAd'

export default function CreateAd() {
    const [account,_] = useContext(AccountContext);
    const [asset,setAsset] = useState("");
    const [type,setType] = useState("buy");

    
    return (
        <>
        <PaymentModal />
        <div className="modal fade" id="addedPaymentMethodModal" aria-labelledby="addedPaymentMethodModalLabel" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Select Payment Method</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col col-12 col-xs-12 text-end">
                                <a href="" className="btn-dex btn-dex-default p-10">+ Add New</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card payment-method-card">
                                <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <span className="btn-dex-small btn-dex-primary"> Bank Transfer</span>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end">
                                        X
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 label dim text-end">
                                        NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Ola  Fashade
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK ACCOUNT NUMBER
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        0043320734
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Access Bank
                    </div>
                                </div>
                            </div>

                            <div className="card payment-method-card">
                                <div className="row">
                                    <div className="col col-6 col-xs-6 text-start">
                                        <span className="btn-dex-small btn-dex-primary"> Bank Transfer</span>
                                    </div>
                                    <div className="col col-6 col-xs-6 text-end">
                                        X
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 label dim text-end">
                                        NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Ola  Fashade
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK ACCOUNT NUMBER
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        0043320734
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-6 col-xs-6 dim text-end label">
                                        BANK NAME
                                    </div>
                                    <div className="col col-6 col-xs-6 value">
                                        Access Bank
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <ConfirmAd />
        <div className="container-fluid body">
                <div className="row flex-nowrap">
                    {account && <Sidebar />}
                    <div className="col py-3 main">
                        <div className="row p-20">
                            <Header account={account} />
                            <div className="col col-12">
                                <h3 className="page-title">Create Ad</h3>
                            </div>
                            <Progressbar />
                            <div className="col col-12">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation" style={{ width: "50%" }}>
                                        <button className="nav-link active" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="true" onClick={()=>setType("buy")}>I WANT TO BUY</button>
                                    </li>
                                    <li className="nav-item" role="presentation" style={{ width: "50%" }}>
                                        <button className="nav-link" id="sell-tab" data-bs-toggle="tab" data-bs-target="#sell" type="button" role="tab" aria-controls="sell" aria-selected="false" onClick={()=>setType("sell")}>I WANT TO SELL</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <BuyTab />
                                    <SellTab />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
