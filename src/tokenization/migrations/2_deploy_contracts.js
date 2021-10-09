const MachaToken = artifacts.require('./MachaToken')
const MatchaTokenSale = artifacts.require('./MachaTokenSale')
require('dotenv').config({path: '../.env'});


module.exports = async (deployer) => {
  const totalSupply = process.env.INITIAL_TOKENS
  const addresses = await web3.eth.getAccounts()
  await deployer.deploy(MachaToken, totalSupply)
  await deployer.deploy(MatchaTokenSale, 1, addresses[0], MachaToken.address)

  // send money to the token sale contract
  const instance = await MachaToken.deployed()
  await instance.transfer(MatchaTokenSale.address, totalSupply)

}