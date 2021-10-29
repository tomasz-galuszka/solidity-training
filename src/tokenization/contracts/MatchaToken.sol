// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./openzeppelin/ERC20Mintable.sol";

contract MatchaToken is ERC20Mintable {

  constructor(uint256 initialSupply) ERC20Mintable('JapanMatcha', 'JMT') {
    _mint(msg.sender, initialSupply);
  }

}