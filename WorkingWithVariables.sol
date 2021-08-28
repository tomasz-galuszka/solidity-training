// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract WorkingWithVariables {
    
    /*
        no null - always default values
        public - auto generate getter function 
        any reference types(aka string) - you need to define memory storage
    */
    uint256 public myUint;
    bool public myBool;
    uint8 public myUint8; // 0-255
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
    
    function getAddressBalance() public view returns(uint) { // view functions -> read only
        return myAddress.balance; // in wei 1e18
    }
    
    function setMyString(string memory _myString) public { // memory -> store in memory not in storage variable
        myString = _myString; // strings are expensive in terms of gas, try avoid
    }
}
