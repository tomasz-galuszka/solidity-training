// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract SimpleMappingExample {

  // similar to hashmap, with difference that it has default values
  mapping(uint => bool) public myMapping;
  mapping(address => bool) myAddressMapping;

  function setValue(uint _index) public {
    myMapping[_index] = true;
  }

  function setMyAddressToTrue() public {
    myAddressMapping[msg.sender] = true;
  }

}