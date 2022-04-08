import React from 'react';

export default function ConfirmAd({type,asset,prefferedMethod,selectedMethod,currency,price,factor,priceType,assetPrice,currencyRate,lowerLimit,upperLimit,deadline,totalAsset,createBuyAd,createSellAd}) {
    return (
        <>
        <div className="modal fade" id="confirmPostModal" tabIndex="-1" aria-labelledby="confirmPostModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm to Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Type</span>
                 <h4 className="value">{type}</h4>
                </div>
                <div className="col col-4 col-xs-4">
                  <span className="label">Asset</span>
                  <h4 className="value">{asset}</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Currency</span>
                    <h4 className="value">{currency.symbol}</h4>
                </div>
              </div>

              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Pricing Type</span>
                 <h4 className="value">{priceType}</h4>
                </div>
                 <div className="col col-4 col-xs-4">
                  <span className="label">Estimated Amount</span>
                  <h4 className="value">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(price) * Number(totalAsset)) } {currency.symbol}</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Rate</span>
                    <h4 className="value">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(assetPrice) * Number(currencyRate) * Number(factor / 100)) } {currency.symbol}</h4>
                </div>
              </div>

              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Order Limit</span>
                 <h4 className="value">{lowerLimit} {currency.symbol} - {upperLimit} {currency.symbol}</h4>
                </div>
                <div className="col col-4 col-xs-4">
                  <span className="label">Total Trading Asset</span>
                  <h4 className="value">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format((totalAsset))} USDT</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Estimated Fee</span>
                    <h4 className="value">{new Intl.NumberFormat('en-US', {style: 'decimal' ,minimumFractionDigits: 2, maximumFractionDigits: 2}).format(Number(price) * Number(totalAsset) * 0.01) } {currency.symbol} </h4>
                </div>
              </div>

              <div className="row form-row mb-20 pt-10 pb-20" style={{borderTop:"1px solid #ccc", borderBottom:"1px solid #ccc"}}>
                <div className="col col-12 col-xs-12">
                 <span className="label">Counterparty Condition</span>
                 <h4 className="value">Completed KYC</h4>
                </div>
              </div>

              <div className="row form-row mb-20">
                <div className="col col-4 col-xs-4">
                    <span className="label">Payment Method</span>
                    {
                      type==='buy'? <h4 className="value">{prefferedMethod}</h4>: <h4 className="value">{ selectedMethod.details? selectedMethod.paymentMethod.name: 'N/A' }</h4>
                    }
                  </div>
                  <div className="col col-8 col-xs-8">
                      <span className="label"> Payment Time Limit</span>
                      <h4 className="value">{deadline} min</h4>
                  </div>
              </div>
              <div className="row form-row mb-20">     
                <div className="col col-xs-12 text-end">
                <button className="btn-dex-small btn-dex-danger" data-bs-dismiss="modal" style={{color:'#fff'}}>Cancel</button> &nbsp;
                <button className="btn-dex-small btn-dex-default" type='submit' onClick={(e)=>{
                   e.preventDefault();
                   if(type==='buy'){
                     createBuyAd();
                    }else if(type==='sell'){
                      createSellAd();
                    }
                   }}>Create</button>
                </div>
            </div> 

            </div>
          </div>
        </div>
    </div>
        </>
    )
}
