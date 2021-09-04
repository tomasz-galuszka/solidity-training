// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/finance/PaymentSplitter.sol";

contract LibraryExample {

  mapping(address => uint) public tokenBalance;

  constructor() {
    tokenBalance[msg.sender] = 1;
  }

  function sendToken(address _to, uint _amount) public returns(bool) {
    tokenBalance[msg.sender] -= _amount;
    tokenBalance[_to] += _amount;

    return true;
  }

}
