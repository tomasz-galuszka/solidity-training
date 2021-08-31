// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract WorkingWithVariables {

  uint256 public myUint;
  bool public myBool;
  uint8 public myUint8;
  address public myAddress;
  string public myString = "Hellow world";

  function setMyUint(uint _myUint) public {
    myUint = _myUint;
  }

  function setMyBool(bool _myBool) public {
    myBool = _myBool;
  }

  function incrementUint8() public {
    // unchecked {
    myUint8++;
    // }
  }

  function decrementUint8() public {
    // unchecked {
    myUint8--;
    // }
  }

  function setAddress(address _address) public {
    myAddress = _address;
  }

  function getAddressBalance() public view returns (uint) {
    return myAddress.balance;
  }

  function setMyString(string memory _myString) public {
    myString = _myString;
  }
}
