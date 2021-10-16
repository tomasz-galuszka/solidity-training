import React, { Component } from "react";

import MachaTokenContract from "./contracts/MachaToken.json";
import MachaTokenSaleContract from "./contracts/MachaTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { loaded: false,
    userAddress: 0,
    userTokenBalance: 0,
    userMoneyBalance: 0,
    tokenSaleAddress: '',
    tokenSaleTokenBalance: 0,
    tokenSaleMoneyBalance: 0,
    inputState: {
      kycAddress: '0x123....'
    }
};

  componentDidMount = async () => {
    try {

      this.web3 = await getWeb3();
      this.accounts = await this.web3.eth.getAccounts();
      this.networkId = await this.web3.eth.net.getId();

      this.instanceMachaTokenContract = new this.web3.eth.Contract(
        MachaTokenContract.abi,
        MachaTokenContract.networks[this.networkId] && MachaTokenContract.networks[this.networkId].address
      );
      this.instanceMachaTokenSaleContract = new this.web3.eth.Contract(
        MachaTokenSaleContract.abi,
        MachaTokenSaleContract.networks[this.networkId] && MachaTokenSaleContract.networks[this.networkId].address
      );
      this.instanceKYCContract = new this.web3.eth.Contract(
        KYCContract.abi,
        KYCContract.networks[this.networkId] && KYCContract.networks[this.networkId].address
      );

      this.listenTokenTransferEvent()
      this.setState({
        loaded: true,
        tokenSaleAddress: MachaTokenSaleContract.networks[this.networkId].address,
        userAddress: this.accounts[0],
      }, async() => {
          await this.getUserTokenBalance()
          await this.getUserMoneyBalance()
          await this.getTokenSaleTokenBalance()
          await this.getTokenSaleMoneyBalance()
      });

    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };

  getUserTokenBalance = async () => {
    const result = await this.instanceMachaTokenContract.methods
      .balanceOf(this.accounts[0])
      .call(); // read is free

    this.setState({userTokenBalance: result});
  }

  getUserMoneyBalance = async () => {
    let result = await this.web3.eth.getBalance(this.accounts[0]);

    this.setState({userMoneyBalance: this.web3.utils.fromWei(result, "ether")});
  }

  getTokenSaleTokenBalance = async () => {
    const result = await this.instanceMachaTokenContract.methods
      .balanceOf(MachaTokenSaleContract.networks[this.networkId].address)
      .call(); // read is free

    this.setState({tokenSaleTokenBalance: result});
  }

  getTokenSaleMoneyBalance = async () => {
    const walletAddress = await this.instanceMachaTokenSaleContract.methods
      .wallet()
      .call(); // read is free
    let result = await this.web3.eth.getBalance(walletAddress);
    this.setState({tokenSaleMoneyBalance: this.web3.utils.fromWei(result, "ether")});
  }

  listenTokenTransferEvent = () => {
    this.instanceMachaTokenContract.events
      .Transfer({to: this.accounts[0]})
      .on('data', async() => {
        await this.getUserTokenBalance()
        await this.getUserMoneyBalance()
        await this.getTokenSaleTokenBalance()
        await this.getTokenSaleMoneyBalance()
      })
  }

  handleInputChange = (event) => {
    const inputState = this.state.inputState;
    inputState[event.target.name] = event.target.value

    this.setState(prevState => (
      {...prevState,
        inputState: inputState
      }
    ));
  }

  handleBuyTokens = async() => {
    await this.instanceMachaTokenSaleContract.methods
      .buyTokens(this.accounts[0])
      .send({
        from: this.accounts[0],
        value: this.web3.utils.toWei("1", "wei")
      })
  }

  handleAddKYC = async () => {
    await this.instanceKYCContract.methods
      .setCompleted(this.state.inputState.kycAddress)
      .send({
        from: this.accounts[0]
      });
    console.log(`KYC for ${this.state.inputState.kycAddress} is completed`)
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Matcha open sale !</h1>
        <p>Get your matcha today</p>
        <h2>KYC whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" onChange={this.handleInputChange} value={this.state.inputState.kycAddress}></input>
        <button type="button" onClick={this.handleAddKYC}>Add to whitelist</button>
        <h2>Buy tokens</h2>
        <p>Token sale address: {this.state.tokenSaleAddress}</p>
        <p>Token sale balance [ETH]: {this.state.tokenSaleMoneyBalance}</p>
        <p>Token sale balance [JMCH]: {this.state.tokenSaleTokenBalance}</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy single</button>
        <h2>Account details</h2>
        <p>Your address: {this.state.userAddress}</p>
        <p>Your balance [ETH]: {this.state.userMoneyBalance}</p>
        <p>Your balance [JMCH]: {this.state.userTokenBalance}</p>
      </div>
    );
  }
}

export default App;
