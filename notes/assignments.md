Assignment Instructions

In this assignment you are required to change our Fixed Supply token to a Mintable token, so that there is no upper limit to the Total Supply. Essentially, it should be possible to integrate the following logic in Solidity 0.6, although openzeppelin removed the functionality in openzeppelin v3: https://docs.openzeppelin.com/contracts/2.x/crowdsales#minted-crowdsale



Preparation:

1. Download the attached zip file and extract the containing the project folder

2. open the terminal/PowerShell in the root and type in "npm install"

3. cd into the client directory and "npm install" as well



For the assignment follow these steps:

1. Bring the ERC20Mintable Token from OpenZeppelin 2.5 to Solidity 0.6:

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20Mintable.sol

That means also to bring over the MinterRole from OpenZeppelin 2.5 to Solidity 0.6. Follow the Import Statements for this.

2. Bring the MintedCrowdsale over to Solidity 0.6:

https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/crowdsale/emission/MintedCrowdsale.sol

3. Adapt the Migrations from your Truffle File so that the Crowdsale Smart Contract becomes the MinterRole

4. Remove the InitialSupply, because Tokens are minted on the fly

5. Add the Current Total Supply to the Website

6. Deploy the Smart Contracts using Infura to the Ropsten or Görli Test-Net

7. Post your TokenSale Address to the Facebook Group - I'd be delighted to test it :)

8. (optional) Upload your Website to GitHub Pages so that Smart Contract interaction is possible via the Website https://pages.github.com/



After this, enjoy your certificate and add me on LinkedIn so I can endorse your for Blockchain Development Knowledge!

Resources for this lecture