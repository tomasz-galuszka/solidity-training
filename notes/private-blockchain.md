### Create private network
##### Genesis block
````
{
  "config": {
    "chainId": 20, // network id
    "homesteadBlock": 0, //  when set to 0, means you will be using the Homestead release of Ethereum, starting from block 0
    "eip150Block": 0,
    "eip155Block": 0, // ethereum improvement proposal 155, starting from block 0
    "eip158Block": 0 // // ethereum improvement proposal 158, starting from block 0
  },
  "difficulty": "0x20000", // impacts mininig time, lower->faster, higher -> slower
  "gasLimit": "0x8000000", // limit amount of logic you can run on any block on that chain can support. Higher value -> more complex smart contracts can be.
  "alloc": {} // prealocate ether on certain accounts if necessary
}
````

#### Create
`````
## create genesis block
./geth init --datadir ./data ./genesis-block.json
## start blockchain and stop syncing using same chainId with other network
./geth --datadir /data --nodiscover
`````