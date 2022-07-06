import React, { useContext, useState, useEffect} from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link} from "react-router-dom";
import Header from "../Landing/components/header";
import Avatar from "../../assets/avatar.png";
import Nav from "../Landing/components/nav";
import Paginate from '../Landing/components/pagination';
import axios from "axios";
import Sidebar from "../Landing/components/sidebar";
import AccountContext from "../../contexts/account";
const token = localStorage.getItem("authToken");

const FILTERED_AD_URL = process.env.REACT_APP_SERVER_URL + "/buy/adverts";
const ASSETS_URL = process.env.REACT_APP_SERVER_URL + "/assets";
const CURRENCIES_URL = process.env.REACT_APP_SERVER_URL + "/countries";
const PAYMENT_METHOD_URL = process.env.REACT_APP_SERVER_URL + "/methods/payment/all";
const MY_PAYMENT_METHODS_URL = process.env.REACT_APP_SERVER_URL + "/methods/payment";

export default function BuyAd() {
  const [account, _] = useContext(AccountContext);
  const [ads, setAds] = useState([]);
  const [currency, setCurrency] = useState("");
  const [asset, setAsset] = useState("");
  const [cryptoAsset, setCryptoAsset] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [assets, setAssets] = useState([]);
  const [methods, setMethods] = useState([]);
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [pageCount, setPageCount] = useState(0);
	const [from,setFrom] = useState(0);
	const [limit,setLimit] = useState(20);

  const getRecords = async () => {
    try {
      setLoading(true);
      const filters = {
        currency,
        paymentMethod:method,
        asset
      };

      Object.keys(filters).forEach(
        (k) => !filters[k] && filters[k] !== undefined && delete filters[k]
      );
      const q = new URLSearchParams(filters).toString();
      const { data: response } = await axios.post(`${FILTERED_AD_URL}/?${q}`,{from,limit},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.error) {
        toast.error(response.error, {
          position: "middle-center",
        });
      }
      if (!response.success) {
        toast.error(response.message, {
          position: "middle-center",
        });
      } else {
        setAds(response.data.ads);
        setPageCount((response.data.count/limit))
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "middle-center",
      });
      setLoading(false);
    }
  };

  const fetchAssets = async () => {
    try {
      const { data: response } = await axios.get(ASSETS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.error) {
        toast.error(response.error, {
          position: "middle-center",
        });
      }
      if (!response.success) {
        toast.error(response.message, {
          position: "middle-center",
        });
      } else {
        setAssets(response.data);
        if(asset==="" && (localStorage.getItem("asset")!==null || localStorage.getItem("asset")!=='undefined')){
          setAsset(localStorage.getItem("asset"));
        }else{
          setAsset(response.data[0]._id);
        }
        setCryptoAsset(response.data[0]);
      }
    } catch (err) {
      toast.error(err.message, {
        position: "middle-center",
      });
    }
  };

  const fetchCurrencies = async () => {
    try {
      const { data: response } = await axios.get(CURRENCIES_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.error) {
        toast.error(response.error, {
          position: "middle-center",
        });
      }
      if (!response.success) {
        toast.error(response.message, {
          position: "middle-center",
        });
      } else {
        setCurrencies(response.data);
        if(currency==="" && (localStorage.getItem("currency")!==null || localStorage.getItem("currency")!=='undefined')){
          setCurrency(localStorage.getItem("currency"));
        }else{
          setCurrency(response.data[0]._id);
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: "middle-center",
      });
    }
  };

  const fetchMethods = async () => {
    try {
      const { data: response } = await axios.get(PAYMENT_METHOD_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) {
        toast.error(response.error, {
          position: "middle-center",
        });
      }

      if (!response.success) {
        toast.error(response.message, {
          position: "middle-center",
        });
      } else {
        setMethods(response.data);
        if(method==="" && (localStorage.getItem("method")!==null || localStorage.getItem("method")!=='undefined')){
          setMethod(localStorage.getItem("method"));
        }else{
          setMethod(response.data[0]._id);
        }
      }
     }catch (error) {
      toast.error(error.message, {
        position: "middle-center",
      });
    }
  };

  const fetchMyPaymentMethods = async () => {
    try {
      const { data: response } = await axios.get(MY_PAYMENT_METHODS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) {
        toast.error(response.error, {
          position: "middle-center",
        });
      }
      if (!response.success) {
        toast.error(response.message, {
          position: "middle-center",
        });
      } else {
        setPaymentMethods(response.data);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "middle-center",
      });
    }
  };

  useEffect(()=>{ 
    fetchAssets();
    fetchCurrencies();
    fetchMyPaymentMethods();
    fetchMethods();
  },[token])
  
  useEffect(()=>{ 
    getRecords();
  },[method,from])

  return (
    <>
      <div
        className="modal fade"
        id="confirmPublishModal"
        tabIndex="-1"
        aria-labelledby="confirmPublishModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content" style={{ background: "#ccc" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirm to take Ad offline
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-20">
                <div className="col col-12 col-xs-12">
                  Once taken offline, the Ad will not be able to take in orders
                  from users.
                </div>
              </div>

              <div className="row form-row mb-20">
                <div className="col col-xs-12 text-end">
                  <button
                    className="btn-dex-small btn-dex-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button className="btn-dex-small btn-dex-default">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster containerStyle={{ position: "absolute" }} />
      <div class="overlay" style={{ display: loading ? "block" : "none" }}>
        <div class="spinner"></div>
        <br />
        Loading...
      </div>
      <Sidebar account={account} />
      <div className="offcanvas-overly"></div>

      <div className="main-content">
        <Header account={account} />
        <main style={{ width: "100%" }}>
          <section className="sell-nfts-area mb-50 mt-120">
            <div className="container">
              <div className="row">
                <div className="row">
                  <div className="col col-6 col-xs-6 col-sm-6">
                    <h3 className="page-title">Sell Ads</h3>
                  </div>
                  <div className="col col-6 col-xs-6 col-sm-6 text-end">
                    <button
                      className="btn-dex btn-dex-default dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Ad Management
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/ad/create">
                          Create Ad
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/ad/list">
                          Ad list
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <form>
                <div className="row mt-30 mb-20">
                  <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                    <div class="btn-dex-group d-flex" data-grouptype="or">
                      <Link class="button" to="/ad/sell">
                        Buy
                      </Link>
                      <Link class="button active" to="/ad/buy">
                        Sell
                      </Link>
                    </div>
                  </div>

                  <div className="col col-6 col-xs-6 col-sm-2 mb-10"></div>

                  <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                    <select
                      className="form-control no-radius"
                      value={asset}
                      onChange={(e) => { 
                        setAsset(e.target.value) 
                        localStorage.setItem("asset",e.target.value);
                      }}
                    >
                      <option value="">All Assets</option>
                      {assets &&
                        assets.map((asset) => (
                          <>
                            <option value={asset._id}>{asset.symbol}</option>
                          </>
                        ))}
                    </select>
                  </div>

                  <div className="col col-6 col-xs-6 col-sm-2">
                    <select
                      className="form-control no-radius"
                      value={currency}
                      onChange={(e) => { 
                         setCurrency(e.target.value);
                         localStorage.setItem("currency",e.target.value);
                       }
                      }>
                      <option value="">All Currencies</option>
                      {currencies &&
                        currencies.map((currency) => (
                          <>
                            <option value={currency._id}>
                              {currency.symbol}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>

                  <div className="col col-6 col-xs-6 col-sm-2 mb-10">
                    <select
                      className="form-control no-radius"
                      value={method}
                      onChange={(e) =>{
                        setMethod(e.target.value);
                        localStorage.setItem("method",e.target.value);
                      }}>
                      <option value="">All Payment Methods</option>
                      {methods &&
                        methods.map((method) => (
                          <>
                            <option value={method._id}>
                              {method.name.toString()}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>

                  <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10">
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        getRecords();
                      }}>
                      Filter
                    </span>
                    &nbsp;&nbsp;
                    <span
                      onClick={(e) => {
                        setAsset("");
                        setCurrency("");
                        setMethod("");
                      }}>
                      Reset
                    </span>
                  </div>

                  <div className="col col-6 col-xs-6 col-sm-2 mb-10 pt-10"></div>
                </div>
              </form>

              <div className="row p-20">
                {ads ? (
                  ads.map((ad) => {
                    return (
                      <>
                        <div
                          className="trade-record-card pt-10 pb-10 mb-10"
                          key="{ad._id}"
                        >
                          <div className={`row`}>
                            <div
                              className={`col col-12 col-xs-12 col-sm-12 col-md-3 pt-10`}
                            >
                              <div className="row">
                                <div className="col col-2 col-xs-2">
                                  <img
                                    src={Avatar}
                                    style={{width:"30px", height:"auto"}}
                                  />
                                </div>
                                <div className="col col-10 col-xs-10 text-start">
                                  <div className="row">
                                    <div className="col col-12 col-xs-12 p-10">
                                      <span className="username">
                                        {ad.owner.username
                                          ? ad.owner.username
                                          : "annonymous"}
                                      </span>
                                    </div>
                                    <div className="col col-12 col-xs-12 p-10 d-flex mb-0 pb-0">
                                      <span className="label">Orders</span>{" "}
                                      &nbsp;
                                      <span className="value">
                                        {ad.owner.completedTrades}
                                      </span>
                                    </div>

                                    <div className="col col-12 col-xs-12 p-10 d-flex mt-0 pt-0">
                                      <span className="label">Completion</span>
                                      &nbsp;
                                      <span className="value">
                                        {isNaN(
                                          (ad.owner.completedTrades * 100) /
                                            (ad.owner.completedTrades +
                                              ad.owner.incompleteTrades)
                                        )
                                          ? "0"
                                          : new Intl.NumberFormat("en-US", {
                                              style: "decimal",
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            }).format(
                                              (ad.owner.completedTrades * 100) /
                                                (ad.owner.completedTrades +
                                                  ad.owner.incompleteTrades)
                                            )}{" "}
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col col-12 col-xs-12 col-sm-12 col-md-9 mb-20 pt-20">
                              <div className="row">
                                <div className="col-4 col-md-3 col-sm-4 col-xs-4">
                                  <span className="value number p-0">
                                    {new Intl.NumberFormat("en-US", {
                                      style: "decimal",
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(
                                      ad.currency.rateToDollar[
                                        "$numberDecimal"
                                      ] *
                                        ad.asset.rateToDollar[
                                          "$numberDecimal"
                                        ] *
                                        (ad.factor["$numberDecimal"] / 100)
                                    )}{" "}
                                    {ad.currency.symbol}
                                  </span>
                                  <br />
                                  <span className="label p-0">Price</span>
                                </div>

                                <div className="col-4 col-md-2 col-sm-4 col-xs-4">
                                  <span className="value number p-0">
                                    {ad.unit["$numberDecimal"]}{" "}
                                    {ad.asset.symbol}
                                  </span>
                                  <br />
                                  <span className="label p-0">Amount</span>
                                </div>
                             

                            <div className="col-4 col-md-3 col-sm-4 col-xs-4">
                              <span className="value number p-0">
                                {new Intl.NumberFormat("en-US", {
                                  style: "decimal",
                                }).format(ad.lowerLimit)}{" "}
                                -{" "}
                                {new Intl.NumberFormat("en-US", {
                                  style: "decimal",
                                }).format(ad.upperLimit)}{" "}
                                {ad.currency.symbol}
                              </span>
                              <br />
                              <span className="label p-0">Limit</span>
                            </div>

                            <div className="col-6 col-md-2 col-sm-6 col-xs-4">
                              <span className="value p-0">
                                {ad.paymentMethod?.name}
                              </span>
                              <br />
                              <span className="label p-0">Payment Method</span>
                            </div>

                            <div className="col-6 col-md-2 col-sm-6 col-xs-4 d-flex justify-content-end">
                              <Link
                                className="btn-dex-small btn-dex-primary"
                                type="button"
                                to={{
                                  pathname: "/ad/buyad/" + ad._id,
                                  state: { adId: ad._id },
                                }}
                              >
                                {ad.priceType === "sell" ? "Buy" : "Sell"}
                              </Link>
                            </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="trade-record-card pt-10 pb-20 mb-10">
                    <div className="row d-flex justify-content-center align-items-center">
                      <span className="text-center">No Advert Available</span>
                    </div>
                  </div>
                )}
                {
                    ads.length>0 && <div className="col col-12 col-xs-12 text-center mt-20"> 
                     <Paginate pageCount={pageCount} setFrom={setFrom} getRecords={getRecords} />
                   </div>	 
                 }

              </div>
            </div>
          </section>
        </main>
        <Nav />
      </div>
    </>
  );
}
