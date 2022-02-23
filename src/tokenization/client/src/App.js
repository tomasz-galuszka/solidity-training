import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import { KycComponent } from './components/kyc.component'
import { AccountDetailsComponent } from './components/account-details.component'
import { TokenSaleDetailsComponent } from './components/token-sale-details.component'
import { TokenBuyComponent } from './components/token-buy.component'

class App extends Component {

  state = { loaded: false, txLoading: false}

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3()
      this.userAddress = (await this.web3.eth.getAccounts())[0]
      this.setState({loaded: true, txLoading: false})
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,)
      console.error(error)
    }
  }

  handleClick = () => {
    this.setState({loaded: true, txLoading: true})
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="matcha-token-sale-app">
        <h1>Matcha token (JMT) open sale !</h1>
        <span className="subtitle">(Ropsten test)</span>
        <KycComponent web3={this.web3} address={this.userAddress} />
        <TokenBuyComponent web3={this.web3} address={this.userAddress} parentClickHandler={this.handleClick} />
        <TokenSaleDetailsComponent web3={this.web3} userAddress={this.userAddress} txLoading={this.state.txLoading} />
        <AccountDetailsComponent web3={this.web3} address={this.userAddress} />
      </div>
    );
  }
}

export default App
