import React, {useContext} from 'react'
import Header from "../Landing/components/header";
import Sidebar from "../Landing/components/sidebar";
import Nav from "../Landing/components/nav";
import AccountContext from "../../contexts/account";


export default function Wallet() {
    const [account,setAccount] = useContext(AccountContext)
    return (
            
    <><div className="container-fluid body">
            <div className="row flex-nowrap">
                <Sidebar account={account}/>
                <div className="col py-3 main">
                    <div className="row p-20">
                        <Header account={account} />
                    </div>
                    <div className="row">
                        <div className="col col-12">
                            <h3 className="page-title">Wallet & Account</h3>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col col-12 col-xs-12">
                            <ul className="d-flex inner-nav" style={{ listStyle: "none", padding: "10px" }}>
                                <li className="active">Balance & Rating</li>
                                <li>Transactions History </li>
                                <li>Ad Lists</li>
                                <li>Fiat Payment Methods </li>
                            </ul>
                        </div>
                    </div>

                    <form>
                        <div className="row">
                            <div className="col col-xs-6 col-sm-2">
                                <label>Asset</label>
                                <select className="form-control no-radius">
                                    <option value="all">All Asset</option>
                                    <option value="btc">BTC</option>
                                    <option value="usdt">USDT</option>
                                </select>
                            </div>

                            <div className="col col-xs-6 col-sm-2">
                                <label>Order Type</label>
                                <select className="form-control no-radius">
                                    <option value="all">Buy/Sell</option>
                                    <option value="buy">Buy</option>
                                    <option value="sell">Sell</option>
                                </select>
                            </div>

                            <div className="col col-xs-6 col-sm-2">
                                <label>Status</label>
                                <select className="form-control no-radius">
                                    <option value="unpaid">Unpaid</option>
                                    <option value="paid">Paid</option>
                                    <option value="completed">Completed</option>
                                    <option value="canceled">Canceled</option>
                                    <option value="disputed">Disputed</option>
                                </select>
                            </div>

                            <div className="col col-xs-6 col-sm-3">
                                <div className="col col-12"><label>Date</label> </div>
                                <div className="col col-12 d-flex"><input type="date" value="" /><input type="date" value="" /></div>
                            </div>

                            <div className="col col-xs-6 col-sm-2">
                                <br />
                                Reset Filter
                            </div>
                        </div>
                    </form>


                    <div className="row">
                        <div className="trade-record-card pt-10 pb-20">
                            <div className="row">
                                <div className="col col-6 col-xs-6 col-sm-2">
                                    <b>Buy</b> | 2021-12-17 15:11:52
                                    <b><u>#4747474748383</u></b><br />
                                    <span className="label">Asset</span><br />
                                    <span className="value"> USDT</span>
                                </div>
                                <div className="col col-6 col-xs-6 col-sm-2"><br /><br />
                                    <span className="label">Fiat Amount</span><br />
                                    <span className="value">55,152.56 NGN</span>
                                </div>
                                <div className="col col-6 col-xs-6 col-sm-2"><br /><br />
                                    <span className="label">Price</span><br />
                                    <span className="value">572.45 NGN</span>
                                </div>
                                <div className="col col-6 col-xs-6 col-sm-2"><br /><br />
                                    <span className="label">Crypto Amount</span><br />
                                    <span className="value">96.05 USDT</span>
                                </div>
                                <div className="col col-6 col-xs-6  col-sm-2"><br /><br />
                                    <span className="label">Counterparty</span><br />
                                    <span className="value">Bigfash</span>
                                </div>
                                <div className="col  col-6 col-xs-3 col-sm-2"><br /><br />
                                    <span className="label">Status</span><br />
                                    <span className="value">Completed</span><br /><br />

                                    <span className="label">Action</span><br />
                                    <span className="value">View</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>
        <Nav/>
        </>
    )
}
