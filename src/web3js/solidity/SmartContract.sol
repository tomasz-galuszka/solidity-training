// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract SmartContract {

  uint public myUint = 10;

  function setUitn(uint _myUint) public {
    myUint = _myUint;
  }

}
