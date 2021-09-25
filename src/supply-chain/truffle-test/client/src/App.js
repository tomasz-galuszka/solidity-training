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
  state = { loaded: false, products: [], index: null, addProduct: {}};

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

      const index = await this.productManagerContract.methods
        .index()
        .call();
      this.setState({index: index });

      this.subscribeSupplyChainStep();

    } catch (error) {
      console.error(error);
    }
  }

  handleCreate = async () => {
    console.log('Adding new product', this.state.addProduct);

    const result = await this.productManagerContract.methods
      .create(this.state.addProduct.productId, Number(this.state.addProduct.productPrice))
      .send({from: this.accounts[0]});

    const addedProductIndex = result.events.SupplyChainStep.returnValues._index;
    const addedProductAddress = result.events.SupplyChainStep.returnValues._address;
    const addedProductStatus = result.events.SupplyChainStep.returnValues._status;

    this.setState(prevState => (
      {
        ...prevState,
        index: Number(addedProductIndex) + 1,
        products: [...this.state.products, {
          index: addedProductIndex,
          address: addedProductAddress,
          status: addedProductStatus,
        }]
      }
    ));

    console.log(this.state.products);
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

  subscribeSupplyChainStep = () => {
    const self = this;
    this.productManagerContract.events
      .SupplyChainStep()
      .on("data", async (payload) => {
        const itemIndex = Number(payload.returnValues._index);
        const itemStatus = Number(payload.returnValues._status);
        
      if (itemStatus == 0) {
        console.log('Create result', payload);

      } else if (itemStatus == 1) {
        console.log(`Item with index ${itemIndex} has been purchased and changed status to ${itemStatus}`)
        console.log('Starting delivery process...')

        const result = await self.productManagerContract.methods
          .deliver(itemIndex)
          .send({from: self.accounts[0]})

        console.log('Delivery response', result);
      } else if (itemStatus == 2) {
        console.log('Delivery result', payload);
      }

      })
  }

  render() {
    if (!this.state.loaded) {
      return <div>Unable to connect to the blockchanin.</div>;
    }
    return (
      <div className="App">
        <h1>Supply Chain Manager</h1>
        <h2>Add product</h2>
        Id: <input type="text" name="productId" onChange={this.addFormChangeHanlder}></input>
        Price in wei: <input type="number" name="productPrice" onChange={this.addFormChangeHanlder}></input>
        <button onClick={() => this.handleCreate()}>Create</button>
        <p>Total products: {this.state.index}</p>
      </div>
    );
  }
}

export default App;