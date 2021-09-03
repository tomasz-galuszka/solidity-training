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

# Public ledger
- all information is public (ether is stored in the blockchain)
- wallets only store a private key

# Solidity 
## view/pure functions - are free => only call to single node/ don't need mining
## write functions - costs gas => call to blockchain network
## receive ether
- cannot completely avoid receive ether in a smart contract (no payable functions, no external function etc), cases:
  1. self-destruct another SMC, and your SMC address set as beneficiary
  2. miner reward address is set to SMC
  3. send ETH to another SMC before it is deployed(it will already have ether when it will be deployed)
  ** try not to match blanace from storage variable with total balance from SMC --> can go wrong :(