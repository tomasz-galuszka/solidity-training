#### Installation
```
npm install -g truffle
```

#### Empty project 
```
truffle unbox <BOX-NAME>
```

#### Start console
Creates test blockchain as a deamon process with some test accounts
```
cd my-project/
truffle development // uses 1st account to deploy smart contracts
```

#### Migrate
Deploys `./contracts` using `./migrations` definitions into the test blockchain
```
truffle migrate  // from truffle console
```
#### Run Client
```
cd my-project/client/
npm run build
npm run start
```

#### Some commands
```
  // transfer eth from truffle console
  web3.eth.sendTransaction({to: "0x0581FC4143666A3D4E3A9038a17cE5C35fae415E", value: 500, from: accounts[1], gas: 300000});
```

#### Send some money from truffle console
````
web3.eth.sendTransaction({from: accounts[0], to: '0xef1189A72FBD6226908EF40B3C9Da31a51366f38', value: web3.utils.toWei('1', 'ether') });
````


#### Links

- https://www.trufflesuite.com/docs/truffle/overview
- https://www.trufflesuite.com/boxes