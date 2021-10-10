import React, { Component } from "react";

import MachaTokenContract from "./contracts/MachaToken.json";
import MachaTokenSaleContract from "./contracts/MachaTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { loaded: false, inputState: {
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

      this.setState({loaded: true});

    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const inputState = this.state.inputState;
    inputState[event.target.name] = event.target.value

    this.setState(prevState => (
      {...prevState,
        inputState: inputState
      }
    ));
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
      </div>
    );
  }
}

export default App;
