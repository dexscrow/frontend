import React from 'react'

export default function PaymentModal() {
    return (
        <>
                   <div className="modal fade" id="paymentMethodModal" tabIndex="-1" aria-labelledby="epaymentMethodModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Select Payment Method</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 sub-title">
                                    Recommended
                                </div>
                                <div className="col-xs-12 col-sm-12">
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-sm-12 mt-20 mb-10 alphabet-list">
                                    All A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-6 col-sm-6 sub-title">
                                    All Payment Method
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <form>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">O</span>
                                            <input type="text" className="form-control" placeholder="Enter a payment method" aria-label="Username" aria-describedby="basic-addon1"/>
                                            </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row" style={{ minYheight: "200px", overflowY: "scroll" }}>
                                <div className="col-xs-6 col-sm-6">
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                </div>
                                <div className="col-xs-6 col-sm-6">
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                    <div className="col-xs-12 payment-method">Bank Payment</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
