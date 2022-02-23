import React, { Component } from "react"
import { MatchaTokenSaleService } from "../service/matcha-token-sale.service"
import { MatchaTokenService } from "../service/matcha-token.service"

const Loader = () => (
  <span className="loader">Transaction in progress, please wait ...</span>
)

export class TokenSaleDetailsComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      balanceWallet: 0,
      balanceToken: 0,
      address: '0x15...',
      addressWallet: '0x16',
      showLoader: false,
    }
  }

  componentDidMount = async () => {
    console.log(this.props);
    this.service = await new MatchaTokenSaleService(this.props.web3).initialize()
    this.serviceToken = await new MatchaTokenService(this.props.web3).initialize()
    this.setState(prevState => ({...prevState, address: this.service.getAddress(), showLoader: this.props.txLoading}),
      async() => {
        await this.getWalletAddress()
        await this.getTokenTotalSupply()
        await this.getWalletBalance()
      }
    )
    this.subscribeTransferEvents(this.props.userAddress)
  }

  subscribeTransferEvents = (userAddress) => {
    this.serviceToken.subscribeTokenTransferEvent(userAddress, async() => {
      await this.getTokenTotalSupply()
      await this.getWalletBalance()
      this.setState({showLoader: false})
    })
  }

  getTokenTotalSupply = async () => {
    const balanceToken = await this.serviceToken.getTotalTokenSupply()
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
        { this.state.showLoader ? <Loader /> : null }
        <table>
          <tbody>
          <tr>
            <td className="title">Address</td>
            <td>{this.state.address}</td>
          </tr>
          <tr>
            <td className="title">Wallet address</td>
            <td>{this.state.addressWallet}</td>
          </tr>
          <tr>
            <td className="title">Token balance [JMT]</td>
            <td>{this.state.balanceToken}</td>
          </tr>
          <tr>
            <td className="title">Wallet money balance [ETH]</td>
            <td>{this.state.balanceWallet}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}