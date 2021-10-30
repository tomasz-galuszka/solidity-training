const Token = artifacts.require('./MatchaToken')
const TokenSale = artifacts.require('./MatchaTokenSale')
const KYC = artifacts.require('./KYCContract')
require('dotenv').config({path: '../.env'})

const chai = require("./setup.chai.js")
const BN = web3.utils.BN;
const expect = chai.expect;

contract('MatchaTokenSaleTest', async(accounts) => {

  const [deployerAccount, receipientAccount] = accounts;
  let instance;

  beforeEach(async () => {
    instance = await Token.deployed()
    instanceSale = await TokenSale.deployed()
    instanceKYC = await KYC.deployed()
  })

  it('should not have any tokens on deployer account', async() => {
    const deployerBalance = instance.balanceOf(deployerAccount)

    return expect(deployerBalance).to.eventually.be.a.bignumber.equal(new BN(0))
  })

  it('should all token be on the token sale smart contract by default', async() => {
    const tokenSaleBalance = await instance.balanceOf(instanceSale.address)

    return expect(tokenSaleBalance).to.be.a.bignumber.equal(new BN(0))
    
  })

  it('should be possible to buy tokens', async() => {
    const amountInWei = web3.utils.toWei('1', 'wei')
    await instanceKYC.setCompleted(receipientAccount)
    console.log("kyc completed")

    const deployerWeiBalanceBefore = await web3.eth.getBalance(deployerAccount)
    const receipientWeiBalanceBefore = await web3.eth.getBalance(receipientAccount)
    const tokenSaleWeiBalanceBefore = await web3.eth.getBalance(instanceSale.address)

    const receipeintTokenBalanceBefore = await instance.balanceOf(receipientAccount)
    const tokenSaleTokenBalanceBefore = await instance.balanceOf(instanceSale.address)

    const totalSupplyBefore = await instance.totalSupply()
    
    try {
      const result = await instanceSale.sendTransaction({from: receipientAccount, value: amountInWei})
      result.logs.forEach(log => {
        console.log(log.event)
        console.log(log.args)
      })
    } catch( error) {
      console.log(error)
    }

    const deployerWeiBalanceAfter = await web3.eth.getBalance(deployerAccount)
    const receipientWeiBalanceAfter = await web3.eth.getBalance(receipientAccount)
    const tokenSaleWeiBalanceAfter = await web3.eth.getBalance(instanceSale.address)

    const receipientTokenBalanceAfter = await instance.balanceOf(receipientAccount)
    const tokenSaleTokenBalanceAfter = await instance.balanceOf(instanceSale.address)

    const totalSupplyAfter = await instance.totalSupply()

    console.log(`deployer_WeiBalanceBefore: ${deployerWeiBalanceBefore}`)
    console.log(`deployer_WeiBalanceAfter: ${deployerWeiBalanceAfter}`)
    console.log('------')
    console.log(`receipeint_TokenBalanceBefore: ${receipeintTokenBalanceBefore}`)
    console.log(`receipient_TokenBalanceAfter: ${receipientTokenBalanceAfter}`)
    console.log(`receipient_WeiBalanceBefore: ${receipientWeiBalanceBefore}`)
    console.log(`receipient_WeiBalanceAfter: ${receipientWeiBalanceAfter}`)
    console.log('------')
    console.log(`tokenSale_TokenBalanceBefore: ${tokenSaleTokenBalanceBefore}`)
    console.log(`tokenSale_TokenBalanceAfter: ${tokenSaleTokenBalanceAfter}`)
    console.log(`tokenSale_WeiBalanceBefore: ${tokenSaleWeiBalanceBefore}`)
    console.log(`tokenSale_WeiBalanceAfter: ${tokenSaleWeiBalanceAfter}`)


    expect(tokenSaleTokenBalanceBefore).to.be.a.bignumber.equal(new BN(0))
    expect(tokenSaleTokenBalanceAfter).to.be.a.bignumber.equal(new BN(0))
    expect(totalSupplyBefore).to.be.a.bignumber.equal(new BN(0))
    
    expect(receipeintTokenBalanceBefore).to.be.a.bignumber.equal(new BN(0))
    expect(receipientTokenBalanceAfter).to.be.a.bignumber.equal(new BN(1))
    expect(deployerWeiBalanceAfter).to.be.a.bignumber.equal(new BN(deployerWeiBalanceBefore).add(new BN(1)))
    expect(totalSupplyAfter).to.be.a.bignumber.equal(new BN(1))
    

    // return expect(receipientWeiBalanceAfter).to.be.a.bignumber.equal(new BN(receipientWeiBalanceBefore).sub(new BN(1)))
  })


})



