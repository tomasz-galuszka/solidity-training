const Web3 = require('web3');

const BLOCKCHAIN_ADDRESS = "http://localhost:7545";
const ADDRESS_1 = "0x52A9d91ec30119F170690b7bD333188fE7838C0B";
const ADDRESS_2 = "0xB9D5296c01993F282929879442322E58c77DD7A2";
const CONTRACT_ADDRESS = "0x3471F438892d0B4520E8e5670e0e795b5e8D6A96";
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "myUint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_myUint",
        "type": "uint256"
      }
    ],
    "name": "setUitn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_ADDRESS));
const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const getBalance = (address) => {
  web3.eth.getBalance(address)
    .then(amount => web3.utils.fromWei(amount, 'ether'))
    .then(amount => {
      console.log(`Balance for ${address} =  ${amount} ETH`);
    });
}

const sendEther = (from, to, amount) => {
  web3.eth.sendTransaction({
    from: from,
    to: to,
    value: web3.utils.toWei(amount, "ether")
  }).then(receipt => {
    getBalance(from);
    getBalance(to);
  });
}

sendEther(ADDRESS_1, ADDRESS_2, "2");

// interaction with smart contract - low level
web3.eth.call({
  from: ADDRESS_2,
  to: CONTRACT_ADDRESS,
  data: web3.utils.sha3('myUint()').substr(0, 10) // hex encoded keyccak256 hash function signature
}).then(console.log);

// interaction with smart contract - high level
myContract.methods.myUint()
  .call()
  .then(console.log);
myContract.methods.setUitn(20)
  .send({
    from: ADDRESS_1
  })
  .then(result => {
    console.log(result);
    myContract.methods.myUint()
     .call()
     .then(console.log);
  });




