// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./Crowdsale.sol";

contract MachaTokenSale is Crowdsale {

  constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {
  }

}