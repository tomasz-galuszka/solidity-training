import React, { Component } from "react"
import { KYCSservice } from "../service/kyc.service"

export class KycComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      kycAddress: '0x123....',
    }
  }

  componentDidMount = async () => {
    this.service = await new KYCSservice(this.props.web3).initialize()
    this.setState(prevState => ({...prevState}))
  }

  handleAddKYC = async () => {
    await this.service.addAddress(this.props.address, this.state.kycAddress)
  }

  handleInputChange = (event) => {
    this.setState({kycAddress: event.target.value})
  }

  render() {
    return (
      <div className="kyc">
        <h2>KYC whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" onChange={this.handleInputChange} value={this.state.kycAddress}></input>
        <button type="button" onClick={this.handleAddKYC}>Add to whitelist</button>
      </div>
    )
  }
}