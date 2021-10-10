const Token = artifacts.require('./MachaToken')
const TokenSale = artifacts.require('./MachaTokenSale')
const KYC = artifacts.require('./KYCContract')
require('dotenv').config({path: '../.env'})

const chai = require("./setup.chai.js")
const BN = web3.utils.BN;
const expect = chai.expect;

contract('MachaTokenSaleTest', async(accounts) => {

  const  [deployerAccount, receipientAccount] = accounts;
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
    const totalSupply = await instance.totalSupply()
    const tokenSaleBalance = await instance.balanceOf(instanceSale.address)

    return expect(tokenSaleBalance).to.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS))
    
  })

  it('should be possible to buy tokens', async() => {
    const amountInWei = web3.utils.toWei('1', 'wei')
    await instanceKYC.setCompleted(receipientAccount)

    const deployerWeiBalanceBefore = await web3.eth.getBalance(deployerAccount)
    const receipientWeiBalanceBefore = await web3.eth.getBalance(receipientAccount)
    const tokenSaleWeiBalanceBefore = await web3.eth.getBalance(instanceSale.address)

    const receipeintTokenBalanceBefore = await instance.balanceOf(receipientAccount)
    const tokenSaleTokenBalanceBefore = await instance.balanceOf(instanceSale.address)
    
    await instanceSale.sendTransaction({from: receipientAccount, value: amountInWei})

    const deployerWeiBalanceAfter = await web3.eth.getBalance(deployerAccount)
    const receipientWeiBalanceAfter = await web3.eth.getBalance(receipientAccount)
    const tokenSaleWeiBalanceAfter = await web3.eth.getBalance(instanceSale.address)

    const receipientTokenBalanceAfter = await instance.balanceOf(receipientAccount)
    const tokenSaleTokenBalanceAfter = await instance.balanceOf(instanceSale.address)

    console.log(`deployerWeiBalanceBefore: ${deployerWeiBalanceBefore}`)
    console.log(`receipientWeiBalanceBefore: ${receipientWeiBalanceBefore}`)
    console.log(`tokenSaleWeiBalanceBefore: ${tokenSaleWeiBalanceBefore}`)

    console.log(`receipeintTokenBalanceBefore: ${receipeintTokenBalanceBefore}`)
    console.log(`tokenSaleTokenBalanceBefore: ${tokenSaleTokenBalanceBefore}`)
    
    console.log(`deployerWeiBalanceAfter: ${deployerWeiBalanceAfter}`)
    console.log(`receipientWeiBalanceAfter: ${receipientWeiBalanceAfter}`)
    console.log(`tokenSaleWeiBalanceAfter: ${tokenSaleWeiBalanceAfter}`)

    console.log(`receipientTokenBalanceAfter: ${receipientTokenBalanceAfter}`)
    console.log(`tokenSaleTokenBalanceAfter: ${tokenSaleTokenBalanceAfter}`)


    expect(tokenSaleTokenBalanceAfter).to.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS).sub(new BN(1)))
    expect(receipientTokenBalanceAfter).to.be.a.bignumber.equal(new BN(1))
    return expect(deployerWeiBalanceAfter).to.be.a.bignumber.equal(new BN(deployerWeiBalanceBefore).add(new BN(1)))
    // gas fee ??
    // return expect(receipientWeiBalanceAfter).to.be.a.bignumber.equal(new BN(receipientWeiBalanceBefore).sub(new BN(1)))
  })


})



