import React, { Component } from "react"
import { MatchaTokenSaleService } from "../service/matcha-token-sale.service"
import { MatchaTokenService } from "../service/matcha-token.service"

export class TokenSaleDetailsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      balanceWallet: 0,
      balanceToken: 0,
      address: '0x15...',
      addressWallet: '0x16'
    }
  }

  componentDidMount = async () => {
    this.service = await new MatchaTokenSaleService(this.props.web3).initialize()
    this.serviceToken = await new MatchaTokenService(this.props.web3).initialize()
    this.setState(prevState => ({...prevState, address: this.service.getAddress()}),
      async() => {
        await this.getWalletAddress()
        await this.getTokenBalance()
        await this.getWalletBalance()
      }
    )
    this.subscribeTransferEvents(this.props.userAddress)
  }

  subscribeTransferEvents = (userAddress) => {
    this.serviceToken.subscribeTokenTransferEvent(userAddress, async() => {
      await this.getTokenBalance()
      await this.getWalletBalance()
    })
  }

  getTokenBalance = async () => {
    const balanceToken = await this.serviceToken.getTokenBalance(this.service.getAddress())
    this.setState({balanceToken})
  }

  getWalletBalance = async () => {
    const balanceWallet = await this.service.getWalletMoneyBalance()
    this.setState({balanceWallet})
  }

  getWalletAddress = async () => {
    const addressWallet = await this.service.getWalletAddres()
    this.setState({addressWallet})
  }

  render() {
    return (
      <div className="account-details">
        <h2>Token sale details</h2>
        <p>Address: {this.state.address}</p>
        <p>Wallet address: {this.state.addressWallet}</p>
        <p>Token Balance [JMT]: {this.state.balanceToken}</p>
        <p>Wallet money balance [ETH]: {this.state.balanceWallet}</p>
      </div>
    )
  }
}