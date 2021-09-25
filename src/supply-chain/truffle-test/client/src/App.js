import React, { Component } from "react";
import ProductManagerContract from "./contracts/ProductManager.json";
import ItemContract from "./contracts/Item.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {

  web3 = null;
  accounts = [];
  productManagerContract = null;
  itemContract = null;
  state = { loaded: false, products: null, index: null, addProduct: {}};

  componentDidMount = async () => {
    try {
      this.web3 = await getWeb3();
      this.accounts = await this.web3.eth.getAccounts();

      const networkId = await this.web3.eth.net.getId();
      const deployedNetwork = ProductManagerContract.networks[networkId];

      this.productManagerContract = new this.web3.eth.Contract(
        ProductManagerContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.itemContract = new this.web3.eth.Contract(
        ItemContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({loaded: true});

    } catch (error) {
      // alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  handleCreate = async () => {
    console.log('Adding new product', this.state.addProduct);

    await this.productManagerContract.methods
      .create(this.state.addProduct.productId, Number(this.state.addProduct.productPrice))
      .send({from: this.accounts[0]});

    const products = await this.productManagerContract.products.call();
    const index = await this.productManagerContract.index.call();

    this.setState({ products: products, index: index });
  }

  addFormChangeHanlder = (event) => {
    const addProduct = this.state.addProduct;
    addProduct[event.target.name] = event.target.value

    this.setState(prevState => (
      {...prevState,
         addProduct: addProduct
      }
    ));
  }

  render() {
    if (!this.state.loaded) {
      return <div>Unable to connect to the blockchanin.</div>;
    }
    return (
      <div className="App">
        <h1>Supply Chain Manager</h1>
        <h2>Add product</h2>
        <table>
          Id: <input type="text" name="productId" onChange={this.addFormChangeHanlder}></input><br/>
          Price: <input type="number" name="productPrice" onChange={this.addFormChangeHanlder}></input><br/>
          <button onClick={() => this.handleCreate()}>Create</button>
        </table>
        <p>Index: {this.state.index}</p>
        <p>Products: {this.state.products}</p>
      </div>
    );
  }
}

export default App;
