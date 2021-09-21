// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./types.sol";

contract Item {

  uint public priceInWei;
  uint public paidWei;
  uint public index;

  ItemManager parentContract;

  constructor(ItemManager _parentContract, uint _priceInWei, uint _index) {
    priceInWei = _priceInWei;
    index = _index;
    parentContract = _parentContract;
  }

  // send money between smart contracts  ??
  receive() external payable {
    require(priceInWei == msg.value, "Only full payment required");
    require(paidWei == 0, "Item is already paid!");

    paidWei += msg.value;

    // low-level function to transfer more gas ??
    // msg.value - full amount sent to our smart contract
    // !!!! listen to return value (bool if sucessful, 2 - retun value from function)
    (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
    require(success, "Trigger payment from parent contract failed, transaction cancelled");
  }

  fallback () external {
  }

}

contract ItemManager {

  struct S_Item {
    Item item;
    TypesLibrary.SupplyChainState state;
    string identifier;
  }

  mapping(uint => S_Item) public items;
  uint index;
  event SupplyChainStep(uint _index, TypesLibrary.SupplyChainState _step, address _address);

  function createItem(string memory _identifier, uint _priceInWei) public {
    Item item = new Item(this, _priceInWei, index);

    items[index].item = item;
    items[index].state = TypesLibrary.SupplyChainState.CREATED;
    items[index].identifier = _identifier;

    ++index;

    emit SupplyChainStep(item.index(), items[index - 1].state, address(item));
  }

  function triggerPayment(uint _index) public payable { // why not identifier ??
    Item item = items[_index].item;

    require(item.priceInWei() == msg.value, "Only full payment required");
    require(items[_index].state == TypesLibrary.SupplyChainState.CREATED, "Item is not available");

    items[_index].state = TypesLibrary.SupplyChainState.PAID;

    emit SupplyChainStep(item.index(), items[_index].state, address(item));
  }

  function triggerDelivery(uint _index) public {
    Item item = items[_index].item;

    require(items[_index].state == TypesLibrary.SupplyChainState.PAID, "Item must be paid first");

    items[_index].state = TypesLibrary.SupplyChainState.DELIVERED;

    emit SupplyChainStep(_index, items[_index].state, address(item));
  }

}
