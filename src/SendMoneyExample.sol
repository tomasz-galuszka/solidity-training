// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract SendMoneyExample {

  uint public balanceReceived;
  uint public balanceWithdrew;

  function receiveMoney() public payable {
    balanceReceived += msg.value;
  }

  function withdrawMoney() public {
    address payable to = payable(msg.sender);
    uint balance = this.getBalance();

    to.transfer(balance);
    balanceWithdrew += balance;
  }

  function withdrawMoney(address payable _to) public {
    _to.transfer(this.getBalance());
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

}
