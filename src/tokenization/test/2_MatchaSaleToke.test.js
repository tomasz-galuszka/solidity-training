const Token = artifacts.require('./MachaToken')
const TokenSale = artifacts.require('./MachaTokenSale')
require('dotenv').config({path: '../.env'})

const chai = require("./setup.chai.js")
const BN = web3.utils.BN;
const expect = chai.expect;

contract('MachaTokenSaleTest', async(accounts) => {

  const  [deployerAccount, receipientAccount] = accounts;
  let instance;

  beforeEach(async () => {
    instance = await Token.deployed()
  })

  it('should not have any tokens on deployer account', async() => {
    const deployerBalance = instance.balanceOf(deployerAccount)

    return expect(deployerBalance).to.eventually.be.a.bignumber.equal(new BN(0))
  })


})



