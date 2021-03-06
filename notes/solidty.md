# Units
1e18 = 1 * 10
1eth = 1e18wei

# Types:
unit8 = 2^8 // 0-255
unit256 = 2^256
no null - always default values
public - auto generate getter function
any reference types(aka string) - you need to define memory storage (// memory -> store in memory not in storage variable)
strings are expensive in terms of gas, try avoid

# Constructor
- public or internal only
- called only once during contract deployment

# Input validation
- use require (return remaining gas)

# Internal state validation (invariants)
- use assert

# Mappings
- key value structure
- key can be any built in type
- value can be any type, also another mapping
- all values are initialized by default
- mapping doesn't have length, need to be stored as a separate variable

# Struct
- custom types, like classes
- values initialized to default values
- less gas consumption comparing to two contracts in the same file

# Arrays
- fixed or dynamic length
- length and push functions
- mappings preferred than arrays, because of gas consumption

# Enums
- internally mapped to uint8 or uint16 based on enum size

# Address -> can transfer ether
- .balance: wei
- .transfer(amount: wei)
- .send() similar to transfer but return boolean false in case on exception
- .call.gas().value()() - transfer gas ??

# Smart contract
- every smart contract is deployed with its own address in the ledger
- function withdrawMoney() public {// without it money is locked in the smart contract :)
- address payable to = payable(msg.sender); // address of person who called this smart contract

# Functions
- when is payable it can receive money
- view functions -> read only (old: constant)
- pure function -> not reading or modifying state (old: constant)
- fallback
  - can only be external
  - when payable it can receive ether
  - called by default when no function name provided/or not found, for example calldata 0x10
- receive
  - for empty call data and any value must be external and payable - smart contract receive money in msg.value
- visibility:
  - public
    - outside from smart contract
    - within smart contract
    - any contract extending this smart contract
  - private
    - within smart contract only
  - external
    - other contracts
    - externally
  - internal
    - within smart contract
    - derived contracts
- write function cannot return values on real blockchain (only Javascript VM)

# Events
 - use instead for "return" from transactions
 - used externally to trigger functionality
 - used as a cheap data storage  comparing to strings
 - up to 3 parameters
 - external apps can listen to events via RPC Ethereum interface/client (but not in smart contract itself)
 - events are inheritable
 - generally are cheap

# Global objects
- message
  .sender
  .value
  .now - current timestamp

# Modifiers
- nice way for validation / check step

# Exceptions
- require, assert, revert
- cascade
  - in high level functions, and also when occurred when sending money into another smart contract the whole transaction is reverted
- not cascade
  - low level functions (address.send, address.call, address.delegatecall, address.staticcall)
- no catching mechanism in solidity
- revert, require accept string as a message
- gas consumption:
  - assert consume all gas
  - require/revert return remaining gas (wasn't used)
  - revert -> like require with false but needs if condition, preferred way is to just use require instead

# Inheritance
  - is
  - multilevel
    - the last one is the one which will be finally used (if the same fn name)
    - super keyword supported
  - finally, deployed is only the single contract

# ABI - Application Binary interface
- describes function in a smart contract
- 