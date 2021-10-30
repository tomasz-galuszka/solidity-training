const MatchaToken = artifacts.require('./MatchaToken')
const MatchaTokenSale = artifacts.require('./MatchaTokenSale')
const KYCContract = artifacts.require('./KYCContract')
require('dotenv').config({path: '../.env'});


module.exports = async (deployer) => {
  const totalSupply = 0
  const addresses = await web3.eth.getAccounts()

  await deployer.deploy(KYCContract);
  await deployer.deploy(MatchaToken, totalSupply)
  await deployer.deploy(MatchaTokenSale, 1, addresses[0], MatchaToken.address, KYCContract.address)

  // send tokens to the token sale contract
  const instance = await MatchaToken.deployed()
  await instance.transfer(MatchaTokenSale.address, totalSupply)

  // add minter role to contract from deployer
  await instance.addMinter(MatchaTokenSale.address)
}