// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract Ownable {
  address payable owner;

  constructor() {
    owner = payable(msg.sender);
  }

  modifier onlyOwner {
    require(isOwner(), "Unauthorized access");
    _;
  }

  function isOwner() public view returns(bool) {
    return msg.sender == owner;
  }

}
