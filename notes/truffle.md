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
truffle console
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


#### Links

- https://www.trufflesuite.com/docs/truffle/overview
- https://www.trufflesuite.com/boxes