import React from 'react'

export default function Progressbar({step}) {
    return (
        <>
            <div className="col col-12">
                    <ol className="FormStepList">
                        <li className="FormStepList-item">
                          <span className={`FormStepIcon ${step == 1 ? "is-active":""} ${step > 1 ?"is-passed":""}`}>
                            <span className="FormStepIcon-circle">1</span>
                            <span className="FormStepIcon-title">Price</span>
                          </span>
                        </li>
                      
                        <li className="FormStepList-item">
                          <span className={`FormStepIcon ${step == 2 ? "is-active" : ""} ${step >2 ? "is-passed": ""}`}>
                            <span className="FormStepIcon-circle">2</span>
                            <span className="FormStepIcon-title">Payment</span>
                          </span>
                        </li>
                      
                        <li className="FormStepList-item">
                          <span className={`FormStepIcon ${step == 3 ? "is-active":""} FormStepIcon--last`}>
                            <span className="FormStepIcon-circle">3</span>
                            <span className="FormStepIcon-title">Instruction &amp; Submit</span>
                          </span>
                        </li>
                      </ol>
                   </div>
        </>
    )
}
