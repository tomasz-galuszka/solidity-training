// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import './Crowdsale.sol';
import "./ERC20Mintable.sol";

/**
 * @title MintedCrowdsale
 * @dev Extension of Crowdsale contract whose tokens are minted in each purchase.
 * Token ownership should be transferred to MintedCrowdsale for minting.
 */
contract MintedCrowdsale is Crowdsale {

    constructor (uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {}

    /**
     * @dev Overrides delivery by minting tokens upon purchase.
     * @param beneficiary Token purchaser
     * @param tokenAmount Number of tokens to be minted
     */
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal override {
      // Potentially dangerous assumption about the type of the token.
      IERC20 baseToken = token();
      address baseTokenSmartContractAddress = address(baseToken);
      ERC20Mintable mintableToken = ERC20Mintable(baseTokenSmartContractAddress);

      // caller does not have the minter role
      bool mintResult = mintableToken.mint(beneficiary, tokenAmount);
      require(mintResult, "MintedCrowdsale: minting failed");
    }
}