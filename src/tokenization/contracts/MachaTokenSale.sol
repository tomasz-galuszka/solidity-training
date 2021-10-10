// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./Crowdsale.sol";
import "./KYCContract.sol";

contract MachaTokenSale is Crowdsale {

  KYCContract kycContract;

  constructor(
    uint256 rate,
    address payable wallet,
    IERC20 token,
    KYCContract _kycContract
  ) Crowdsale(rate, wallet, token) {
    kycContract = _kycContract;
  }

  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
    super._preValidatePurchase(beneficiary, weiAmount);
    require(kycContract.isCompleted(beneficiary), "KYC verification failed");
  }

}