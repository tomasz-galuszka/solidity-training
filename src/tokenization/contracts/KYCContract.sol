// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./openzeppelin/Owned.sol";

contract KYCContract is Owned {

  mapping(address => bool) allowed;

  function setCompleted(address _address) public onlyOwner {
    allowed[_address] = true;
  }

  function setRevoked(address _address) public onlyOwner {
    allowed[_address] = false;
  }

  function isCompleted(address _address) public view returns(bool) {
    return allowed[_address];
  }

}