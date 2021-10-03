### Geth - run ethereum node and connect into the network
Written in GO lang
Need to be updated manually from time to time
File based database inside datadir
````
  keystore - private keys/accounts
  geth/chaindata -> ledger store/blocks store
  geth/lightchaindata -> same as above but when geth started in light mode
  all connected nodes will have exactly the same data
````
Example:
```
./geth --syncmode <MODE>
./geth --syncmode light // etc.
```
Client connection  via IPC:
```
./geth attach ipc://$(pwd)/data/geth.ipc

// list accounts
> personal.listAccounts

// create account
> personal.newAccount();
Passphrase:
Repeat passphrase:
"0xf414ca37298aa385ff57112b7ef348356479003a"

// start miner
miner.setEtherBase(personal.listAccounts[0])
miner.start(1) // 1 thread

// check miner account balance in ETH
web3.eth.getBalance(personal.listAccounts[0]) / 1000000000000000000
```
Data path:
```
/Users/<user>.g/Library/Ethereum/geth 
/Users/<user>.g/Library/Ethereum/keystore --> keeps account private keys needs to be backuped 
```
- Three ways of sync:
  - FULL -> full sync with blockchain from beginning and process all transactions from the begining
  - FAST -> only block headers and bodies, last 1024 transactions, download all blocks, takes few hours 
  - LIGHT -> only headers, takes the latests snapshots, less secure but very fast, few hundred  MB
Output:
  - ChainID: 1,2,3 - reserved for main/test networks
  - IPC endpoint opened                      url=/Users/tomasz.g/Library/Ethereum/geth.ipc (file based IPC protocol communication with the node)


### Links
- https://geth.ethereum.org/docs/rpc/server