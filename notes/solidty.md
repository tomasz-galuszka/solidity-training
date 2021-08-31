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

# Address -> can transfer ether
- .balance: wei
- .transfer(amount: wei)
- .send() similar to transfer but return boolean false in case on exception
- .call.gas().value()() - transfer gas ??

# Functions
- when is payable it can receive money
- view functions -> read only

# Global objects
- message
  .sender
  .value
  .now - current timestamp