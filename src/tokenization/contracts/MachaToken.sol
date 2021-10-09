// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MachaToken is ERC20 {

  constructor(uint256 initialSupply) ERC20('JapanMacha', 'JMCH') {
    _mint(msg.sender, initialSupply);
  }

}