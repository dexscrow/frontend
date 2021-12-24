import React from 'react'

export default function Progressbar() {
    return (
        <>
            <div className="col col-12">
                    <ol className="FormStepList">
                        <li className="FormStepList-item">
                          <span className="FormStepIcon is-passed">
                            <span className="FormStepIcon-circle">1</span>
                            <span className="FormStepIcon-title">Price</span>
                          </span>
                        </li>
                      
                        <li className="FormStepList-item">
                          <span className="FormStepIcon is-active">
                            <span className="FormStepIcon-circle">2</span>
                            <span className="FormStepIcon-title">Payment</span>
                          </span>
                        </li>
                      
                        <li className="FormStepList-item">
                          <span className="FormStepIcon FormStepIcon--last">
                            <span className="FormStepIcon-circle">3</span>
                            <span className="FormStepIcon-title">Instruction &amp; Submit</span>
                          </span>
                        </li>
                      </ol>
                   </div>
        </>
    )
}
