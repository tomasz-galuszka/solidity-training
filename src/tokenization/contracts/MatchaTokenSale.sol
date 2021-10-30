// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./openzeppelin/MintedCrowdsale.sol";
import "./KYCContract.sol";

contract MatchaTokenSale is MintedCrowdsale {

  KYCContract kycContract;

  constructor(
    uint256 rate, // number of token buyer gets per wei
    address payable wallet, // address for forwarding payable funds
    IERC20 token, // address of the token
    KYCContract _kycContract // the kyc check address
  ) MintedCrowdsale(rate, wallet, token) {
    kycContract = _kycContract;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kycContract.isCompleted(beneficiary), "KYC verification failed");
  }

}