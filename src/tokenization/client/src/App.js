import React, { Component } from "react";

import MachaTokenContract from "./contracts/MachaToken.json";
import MachaTokenSaleContract from "./contracts/MachaTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { loaded: false, tokenSaleAddress: '0x123..',userTokenBalance: 0, inputState: {
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
      }, this.getUserTokenBalance);

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

  listenTokenTransferEvent = () => {
    this.instanceMachaTokenContract.events
      .Transfer({to: this.accounts[0]})
      .on('data', this.getUserTokenBalance)
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
        <h1>Macha open sale !</h1>
        <p>Get your macha today</p>
        <h2>KYC whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" onChange={this.handleInputChange} value={this.state.inputState.kycAddress}></input>
        <button type="button" onClick={this.handleAddKYC}>Add to whitelist</button>
        <h2>Bouy tokents</h2>
        <p>Token sale address: {this.state.tokenSaleAddress}</p>
        <p>You have : {this.state.userTokenBalance} JMCH</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy</button>
      </div>
    );
  }
}

export default App;
