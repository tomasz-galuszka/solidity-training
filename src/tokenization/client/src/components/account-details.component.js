import React, { Component } from "react"
import { MatchaTokenService } from "../service/matcha-token.service"

export class AccountDetailsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      address: '',
      balanceMoney: 0,
      balanceToken: 0,
    }
  }

  componentDidMount = async () => {
    this.service = await new MatchaTokenService(this.props.web3).initialize()
    this.setState(prevState => ({...prevState, address: this.props.address}), async() => {
      await this.getTokenBalance()
      await this.getMoneyBalance()
    })
    this.subscribeTransferEvents()
  }

  subscribeTransferEvents = () => {
    this.service.subscribeTokenTransferEvent(this.state.address, async() => {
      await this.getTokenBalance()
      await this.getMoneyBalance()
    })
  }

  getTokenBalance = async () => {
    const balanceToken = await this.service.getTokenBalance(this.state.address)
    this.setState({balanceToken})
  }

  getMoneyBalance = async () => {
    const balanceMoney = await this.service.getMoneyBalance(this.state.address)
    this.setState({balanceMoney})
  }

  render() {
    return (
      <div className="account-details">
        <h2>Account details</h2>
        <p>Your address: {this.state.address}</p>
        <p>Token balance [JMT]: {this.state.balanceToken}</p>
        <p>Money balance [ETH]: {this.state.balanceMoney}</p>
      </div>
    )
  }
}