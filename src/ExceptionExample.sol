// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract ExceptionExample {

  mapping(address => uint64) public balanceReceived;

  function receiveMoney() payable public {
    assert(balanceReceived[msg.sender] + uint64(msg.value) >= balanceReceived[msg.sender]); // validate invariant
    balanceReceived[msg.sender] += uint64(msg.value);
  }

  function withdrawMoney(address payable _to, uint64 _amount) public {
    // check
    assert(balanceReceived[msg.sender] - _amount <= balanceReceived[msg.sender]); // validate invariant

    // effect
    balanceReceived[msg.sender] -= _amount;

    // interact
    _to.transfer(_amount);
  }

}
