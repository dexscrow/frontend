import React from 'react'

export default function ConfirmAd() {
    return (
        <>
            <div className="modal fade" id="confirmPostModal" tabIndex="-1" aria-labelledby="confirmPostModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{background:"#ccc"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm to Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Type</span>
                 <h4 className="value">Buy</h4>
                </div>
                <div className="col col-4 col-xs-4">
                  <span className="label">Asset</span>
                  <h4 className="value">USDT</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Currency</span>
                    <h4 className="value">NGN</h4>
                </div>
              </div>

              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Pricing Type</span>
                 <h4 className="value">Floating</h4>
                </div>
                <div className="col col-4 col-xs-4">
                  <span className="label">Asset</span>
                  <h4 className="value">100%</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Rate</span>
                    <h4 className="value">411.31</h4>
                </div>
              </div>

              <div className="row mb-20">
                <div className="col col-4 col-xs-4">
                 <span className="label">Order Limit</span>
                 <h4 className="value">5,000.00 NGN - 750,000 NGN</h4>
                </div>
                <div className="col col-4 col-xs-4">
                  <span className="label">Total Trading Asset</span>
                  <h4 className="value">100 USDT</h4>
                </div>
                <div className="col col-4 col-xs-4">
                    <span className="label">Estimated Fee</span>
                    <h4 className="value">0.21</h4>
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
                    <h4 className="value">Bank Deposit</h4>
                    <h4 className="value">Paypal</h4>
                  </div>
                  <div className="col col-8 col-xs-8">
                      <span className="label"> Payment Time Limit</span>
                      <h4 className="value">15 min</h4>
                  </div>
              </div>

              <div className="row form-row mb-20">     
                <div className="col col-xs-12 text-end">
                <button className="btn-dex-small btn-dex-danger">Cancel</button>
                <button className="btn-dex-small btn-dex-default">Confirm</button>
                </div>
            </div> 

            </div>
          </div>
        </div>
    </div>
        </>
    )
}
