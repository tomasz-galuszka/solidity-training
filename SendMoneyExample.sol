// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

/*
    Every smart contract is deployed with its own address in the ledger
    
*/
contract SendMoneyExample {
    
    uint public balanceReceived;
    uint public balanceWithdrawed;
    
    function receiveMoney() public payable { // payable -> compiler knows this function is going to rcv moeny
        balanceReceived += msg.value; // se output in console
    }
    
    function withdrawMoney() public { // without it money is locked in the smart contract :)
        address payable to = payable(msg.sender); // address of person who called this smart contract
        
        uint balance = this.getBalance();
        to.transfer(balance);
        
        balanceWithdrawed += balance;
    }
    
    function withdrawMoney(address payable _to) public {
        _to.transfer(this.getBalance());
    }
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
}
