// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

/*
  Usually smart contracts should work like a bank account => can send and receive money etc.
*/
contract FunctionExample {

  mapping (address => uint) public balanceReceived;
  address payable owner;

  // called once and only once during deployment
  constructor() {
    owner = payable(msg.sender);
  }

  // View function
  // does not modify anything
  // return some data
  // access to storage/class variables
  // cannot call modify state function
  function getOwner() public view returns(address) {
    return owner;
  }

  // Pure function
  // cannot call state and view function
  // access to function scope only
  function convertWeiToEther(uint _amountInWei) public pure returns(uint) {
    return _amountInWei / 1 ether;
  }

  function destroySmartContract() public {
    require(msg.sender == owner, "permission denied");
    selfdestruct(owner);
  }

  function receiveMoney() public payable {
    uint amount = msg.value;
    uint currentBalance = balanceReceived[msg.sender];
    uint newBalance = currentBalance + amount;

    // check invariant
    assert(newBalance >= currentBalance);

    // effect on state
    balanceReceived[msg.sender] += amount;
  }

  function withdrawMoney(address payable _to, uint _amount) public {
    uint currentBalance = balanceReceived[msg.sender];
    uint newBalance = currentBalance - _amount;

    // check
    require(_amount > 0, "amount must be greater than 0");
    require(_amount <= currentBalance, "not enough funds.");
    assert(newBalance >= 0 );

    // effect
    balanceReceived[msg.sender] -= _amount;

    // interact
    _to.transfer(_amount);
  }

  // fallback when no function matches it is called
  // external - fallback function
  // payable - receive money (optionally)
  fallback () external payable {
    require(msg.data.length == 0, "unintentional call to fallback function, check the function name u specified."); // prevent call by using wrong function name
    receiveMoney();
  }

  // receive - function to receive ether by calling contract for empty call data and any value
  receive() external payable {

  }
}
