// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "./types.sol";
import "./Ownable.sol";
import "./Item.sol";

contract ProductManager is Ownable {

  struct Product {
    string id;
    TypesLibrary.SupplyChainStatus status;
    Item item;
  }

  event SupplyChainStep(uint _index, TypesLibrary.SupplyChainStatus _status, address _address);
  mapping(uint => Product) public products;
  uint public index;

  function create(string memory _id, uint _priceInWei) public onlyOwner {
    require(_priceInWei > 0, "Price greater than zero required");

    Item item = new Item(this, _priceInWei, index);

    products[index].id = _id;
    products[index].status = TypesLibrary.SupplyChainStatus.CREATED;
    products[index].item = item;

    ++index;

    emit SupplyChainStep(item.index(), products[item.index()].status, address(item));
  }

  function buy(uint _index) public payable {
    require(products[_index].item.priceInWei() == msg.value, "Only full payment required");
    require(products[_index].status == TypesLibrary.SupplyChainStatus.CREATED, "Product is further in chain process");

    products[_index].status = TypesLibrary.SupplyChainStatus.PAID;

    emit SupplyChainStep(_index, products[_index].status, address(products[_index].item));
  }

  function deliver(uint _index) public onlyOwner {
    require(products[_index].status == TypesLibrary.SupplyChainStatus.PAID, "Product must be paid first");

    products[_index].status = TypesLibrary.SupplyChainStatus.DELIVERED;

    emit SupplyChainStep(_index, products[_index].status, address(products[_index].item));
  }

}
