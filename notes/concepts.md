# distributed ledger
  Rejestr transakcji rozproszony na nody.Z kazdego noda mozna dodawać nowe transakcje. Nody synchornizują się ze sobą cały czas.
# mining
  wykonanie matematycznego algorytmu, dodanie nowego bloku do sieci, który musi być zatwierdzony przez wiekszosc node, po zatwierdzeniu jest immutable
# proof of work
  difficulty up every 14 days (2016 blocks), network adjust it to take 10 minutes, 1sthash/current hash (hard to create but easy to validate)

# Accounts
EOA -> externally owned accounts (by user)
CA -> contract account (smart contract address)

# Address -> can transfer ether
- .balance: wei
- .transfer(amount: wei)
- .send() similar to transfer but return boolean false in case on exception
- .call.gas().value()() - transfer gas ??

# Smart contract
- can be only triggered from externally owned account
- cannot be triggered from another smart contract
- when triggered from external account can trigger another smart contract, but not async/only in single transaction

# Public ledger
- all information is public (ether is stored in the blockchain)


