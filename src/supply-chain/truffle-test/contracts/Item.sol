// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./ProductManager.sol";

contract Item {

  uint public priceInWei;
  uint public paidInWei;
  uint public index;

  ProductManager parentContract;

  constructor(ProductManager _parentContract, uint _priceInWei, uint _index) {
    parentContract = _parentContract;
    priceInWei = _priceInWei;
    index = _index;
  }

  receive() external payable {
    require(priceInWei == msg.value, "Item full payment required");
    require(paidInWei == 0, "Item is already paid");

    paidInWei += msg.value;

    // listen to return value (bool if successful, 2 - return value from function)
    (bool success, ) = address(parentContract)
      .call{value: msg.value}(abi.encodeWithSignature("buy(uint256)", index));

    require(success, "Buy from parent contract failed, transaction cancelled");
  }

  fallback () external {}

}