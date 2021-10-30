const Token = artifacts.require('./MatchaToken')
require('dotenv').config({path: '../.env'})

const chai = require("./setup.chai.js")
const BN = web3.utils.BN;
const expect = chai.expect;

contract('MatchaTokenTest', async(accounts) => {

  const  [deployerAccount, receipientAccount] = accounts;
  let instance;
  let totalSupply;

  beforeEach(async () => {
    instance = await Token.new(process.env.INITIAL_TOKENS)
    totalSupply = await instance.totalSupply()
  })


  it('should all tokens be assigned to deployer account', async() => {
    const deployerBalance = instance.balanceOf(deployerAccount)

    return expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  // it ('should be possible to send tokens to receipient accounts', async() => {
  //   const givenAmountToTransfer = 20

  //   await instance.transfer(receipientAccount, givenAmountToTransfer)

  //   const deployerBalance = instance.balanceOf(deployerAccount)
  //   const receipientBalance = instance.balanceOf(receipientAccount)

  //   expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(givenAmountToTransfer)))
  //   return expect(receipientBalance).to.eventually.be.a.bignumber.equal(new BN(givenAmountToTransfer))
  // })

  // it ('should be impossible to transfer more tokens than available', async() => {
  //   const givenAmountToTransfer = Number(totalSupply.toString()) + 1

  //   try {
  //     // expect(instance.transfer(receipientAccount, givenAmountToTransfer)).to.eventually.be.rejected;
  //     await instance.transfer(receipientAccount, givenAmountToTransfer)
  //   } catch (error) {
  //     console.log('Promise rejected', error.reason);
  //   }

  //   const deployerBalance = instance.balanceOf(deployerAccount)
  //   const receipientBalance = instance.balanceOf(receipientAccount)

  //   expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply)
  //   return expect(receipientBalance).to.eventually.be.a.bignumber.equal(new BN(0))
  // })


})



