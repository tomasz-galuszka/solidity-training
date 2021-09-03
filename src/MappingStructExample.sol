// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract MappingStructExample {

  struct Payment {
    uint amount;
    uint timestamp;
  }

  struct Balance {
    uint totalBalance;
    uint numPayments;
    mapping(uint => Payment) payments;
  }

  // by default initialized to default balance
  mapping(address => Balance) public balanceReceived;

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }

  // send money into smart contract address
  function sendMoney() public payable {
    Payment memory payment = Payment(msg.value, block.timestamp); // payment is a reference type, so need to specify where it will be stored
    uint paymentNumber = balanceReceived[msg.sender].numPayments;

    balanceReceived[msg.sender].totalBalance += payment.amount;
    balanceReceived[msg.sender].payments[paymentNumber] = payment;
    balanceReceived[msg.sender].numPayments++;
  }

  // transfer money you've sent to specific address
  function withdrawAllMoney(address payable _to) public {
    Balance storage balance = balanceReceived[msg.sender];
    uint totalBalance = balance.totalBalance;

    // check
    require(totalBalance != 0, "not enough balance");

    // effect on state
    balance.totalBalance = 0;

    // interaction
    _to.transfer(totalBalance);
  }

  // transfer specific amount of money
  function withdrawMoney(address payable _to, uint _amount) public {
    Balance storage balance = balanceReceived[msg.sender];
    uint totalBalance = balance.totalBalance;

    // check
    require(_amount != 0, "amount must be greater than zero");
    require(totalBalance != 0, "not enough funds");
    require(_amount <= totalBalance, "amount must be less or equal to balance");

    // effect on state
    balance.totalBalance -= _amount;

    // interaction
    _to.transfer(_amount);
  }

}