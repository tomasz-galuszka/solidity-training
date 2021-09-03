// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./Owned.sol";

contract InheritanceModifierExample is Owned { // extends owned -> multiple inheritance also works

  mapping(address => uint) public tokenBalance;
  uint tokenPrice = 1 ether;

  constructor() {
    tokenBalance[owner] = 100;
  }

  function createNewToken() public onlyOwner {
    tokenBalance[owner]++;
  }

  function burnToken() public onlyOwner {
    tokenBalance[owner]--;
  }

  function purchaseToken() public payable {
    // check
    require(tokenBalance[owner] * tokenPrice / msg.value > 0, "not enough tokens");

    // effect
    tokenBalance[owner] -= msg.value / tokenPrice;
    tokenBalance[msg.sender] += msg.value / tokenPrice;
  }

  function sendToken(address _to, uint _amount) public {
    // check
    require(tokenBalance[msg.sender] >= _amount, "not enough tokens");
    assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
    assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);

    // effect
    tokenBalance[msg.sender] -= _amount;
    tokenBalance[_to] += _amount;

    // interact
  }

}
