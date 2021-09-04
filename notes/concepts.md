# distributed ledger
  Rejestr transakcji rozproszony na nody.Z kazdego noda mozna dodawać nowe transakcje. Nody synchornizują się ze sobą cały czas.
# mining
  wykonanie matematycznego algorytmu, dodanie nowego bloku do sieci, który musi być zatwierdzony przez wiekszosc node, po zatwierdzeniu jest immutable
# proof of work
  difficulty up every 14 days (2016 blocks), network adjust it to take 10 minutes, 1sthash/current hash (hard to create but easy to validate)

# Accounts
EOA -> externally owned accounts (by user)
CA -> contract account (smart contract address)

# Smart contract
- can be only triggered from externally owned account
- cannot be triggered from another smart contract
- when triggered from external account can trigger another smart contract, but not async/only in single transaction
- storage is extremely expensive (~1MB 44k USD), couple solutions:
  - store data off-chain and store only a proof (hash) -> Notary
  - store data in another blockchain such as IPFS
  - store data in Event logs if not necessary 

# Public ledger
- all information is public (ether is stored in the blockchain)
- wallets only store a private key

# Solidity 
- view/pure functions - are free => only call to single node/ don't need mining
- write functions - costs gas => call to blockchain network
- receive ether
- cannot completely avoid receive ether in a smart contract (no payable functions, no external function etc), cases:
  1. self-destruct another SMC, and your SMC address set as beneficiary
  2. miner reward address is set to SMC
  3. send ETH to another SMC before it is deployed(it will already have ether when it will be deployed)
  ** try not to match blanace from storage variable with total balance from SMC --> can go wrong :(

# Deployment
- All functions have a calculated hash, when deployed into the blockchain, you need to send in the data filed the hash to actually interact with function.
- Client uses ABI array - to interact with smart contract (json file) 
- smart contract compiled to EVM bytecode and in this form seats in the blockchain
- example hash for a getter function:
  - bytes4(keccak256(fn_signature)), example: bytes4(keccak256("myString()"));

# Gas
- operational costs => amount of ops your contract uses to execute something
- depends on gas cost-> similar to water/electricity etc
- each low level instructions has static amount of gas assigned  (see ethereum yellow paper), sum of operation is total amount of gas you smart contract costs
- detached from Ether 
- more gwei per 1gas yu setup in real network the more yu pay => faster transaction is mined
- avoid loops, especially when unknow iterations => costs a lot of gas