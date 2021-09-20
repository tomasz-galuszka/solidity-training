const Web3 = require('web3');

const BLOCKCHAIN_ADDRESS = "http://localhost:7545";
const ADDRESS_1 = "0x9f16344A2a9376090910546a9e7218f14c765afc";
const ADDRESS_2 = "0x843D830d33b047766f2665eb9741dd781B30e54F";
const CONTRACT_ADDRESS = "0xcbB349eA1458855bf8f2123e247DEFDf5D2DD8fF";
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
    .then(amount => console.log(`Balance for ${address} =  ${amount} ETH`));
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




