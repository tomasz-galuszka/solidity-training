const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

const address_1 = "0x52A9d91ec30119F170690b7bD333188fE7838C0B";
const address_2 = "0xB9D5296c01993F282929879442322E58c77DD7A2";

const getBalance = (address) => {
  web3.eth.getBalance(address)
    .then(amount => web3.utils.fromWei(amount, 'ether'))
    .then(amount => {
      console.log(`Balance for ${address} =  ${amount} ETH`);
    });
}

web3.eth.sendTransaction({
  from: address_1,
  to: address_2,
  value: web3.utils.toWei("1", "ether")
}).then(receipt => {
  console.log(receipt);
  getBalance(address_1);
  getBalance(address_2);
});



