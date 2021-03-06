// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract SharedWallet {

  uint256 private balance;
  mapping(address => uint256) public addressAllowance;
  address public owner;

  event ParticipantAllowanceChanged(address indexed _owner, address indexed _participant, uint256 _oldAllowance, uint256 _newAllowance);
  event BalanceChanged(uint256 _oldBalance, uint256 _newBalance);

  constructor() {
    owner = payable(msg.sender);
  }

  modifier ownerOnly() {
    require(msg.sender == owner, "permission denied");
    _;
  }

  modifier participantOnly() {
    require(msg.sender != owner, "permission denied");
    _;
  }

  function viewBalance() public view returns(uint256) {
    return balance;
  }

  fallback() external payable {
    require(msg.data.length == 0, "unintentional call to fallback function, please check invocation you specified.");

    uint256 amount = msg.value;
    require(amount > 0);

    assert(balance + amount > balance);
    balance += amount;

    emit BalanceChanged(balance - amount, balance);
  }

  function addParticipant(address _participant, uint256 _maxAllowance) public ownerOnly {
    // check
    require(_maxAllowance > 0, "allowance should be greater than 0");
    require(_participant != owner, "participant cannot be the owner itself");

    // effect
    uint256 oldAllowance = addressAllowance[_participant];
    addressAllowance[_participant] = _maxAllowance;

    emit ParticipantAllowanceChanged(owner, _participant, oldAllowance, addressAllowance[_participant]);
  }

  function withdraw(uint256 _amount) public ownerOnly {
    require(_amount > 0, "amount must be greater than zero");
    require(_amount <= balance, "not enough funds in wallet");
    assert(balance - _amount >= 0);

    // effect
    balance -= _amount;

    // interact
    payable(owner).transfer(_amount);

    emit BalanceChanged(balance + _amount, balance);
  }

  function withdrawLimited(uint256 _amount) public participantOnly {
    uint256 maxAllowance = addressAllowance[msg.sender];

    // check
    require(_amount > 0, "amount must be greater than zero");
    require(maxAllowance > 0, "address not allowed to withdraw money");
    require(_amount <= maxAllowance, "amount must be less or equal than total allowance");
    require(_amount <= balance, "not enough funds in wallet");

    assert(balance - _amount >= 0);
    assert(maxAllowance - _amount >= 0);

    // effect
    balance -= _amount;
    addressAllowance[msg.sender] -= _amount;

    // interact
    payable(msg.sender).transfer(_amount);

    emit ParticipantAllowanceChanged(owner, msg.sender, maxAllowance, addressAllowance[msg.sender]);
    emit BalanceChanged(balance + _amount, balance);
  }

}
