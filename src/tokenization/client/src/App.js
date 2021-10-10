import React, { Component } from "react";

import MachaTokenContract from "./contracts/MachaToken.json";
import MachaTokenSaleContract from "./contracts/MachaTokenSale.json";
import KYCContract from "./contracts/KYCContract.json";

import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  state = { loaded: false };

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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded: true});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
      </div>
    );
  }
}

export default App;
