// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract StartStopUpdateExample {

  address owner;
  bool paused;

  constructor() public { // called once, and only once during contract deployment
    owner = msg.sender; // owner is the message sender
  }

  function sendMoney() public payable {
  }

  function setPaused(bool _paused) public {
    require(msg.sender == owner, "Only the contract owner is permitter to trigger this operation");
    paused = _paused;
  }

  // only owner can do this
  function withdrawAllMoney(address payable _to) public {
    // if not working in solidity, instead it has require
    // if false will stop the current transaction and will trigger exception
    // transactions are atomic, so when require triggers exception transaction is rolled back =>  no effect in blockchain
    require(msg.sender == owner, "Only the contract owner is permitted to trigger this operation");
    require(!paused, "Contract has been paused by the owner");
    _to.transfer(address(this).balance);
  }

  // _to receives all funds from smart contract
  function destroy(address payable _to) public {
    require(msg.sender == owner, "Only the contract owner is permitted to trigger this operation");
    selfdestruct(_to);
  }

}