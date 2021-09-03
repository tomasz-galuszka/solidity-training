// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract Owned {

  address public owner;

  constructor() {
    owner = payable(msg.sender);
  }

  modifier onlyOwner() { // is extended
    require(msg.sender == owner, "permission denied");
    _; // function body is copied here
  }

}