const Token = artifacts.require('./MachaToken')
const BN = web3.utils.BN;

const chai = require('chai');
const chaiBN = require('chai-bn')(BN);
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiBN);
chai.use(chaiAsPromised);

const expect = chai.expect;


contract('MachaTokenTest', async(accounts) => {

  const  [deployerAccount, receipientAccount, anotherAccount] = accounts;
  let instance;
  let totalSupply;

  beforeEach(async () => {
    instance = await Token.deployed()
    totalSupply = await instance.totalSupply()
  })

  it('should all tokens be assigned to deployer account', async() => {
    const deployerBalance = instance.balanceOf(deployerAccount)

    expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply)
  })

  it ('should be possible to send tokens to receipient accounts', async() => {
    const givenAmountToTransfer = 20

    await instance.transfer(receipientAccount, givenAmountToTransfer)

    const deployerBalance = instance.balanceOf(deployerAccount)
    const receipientBalance = instance.balanceOf(receipientAccount)

    expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(givenAmountToTransfer)))
    expect(receipientBalance).to.eventually.be.a.bignumber.equal(new BN(givenAmountToTransfer))
  })

  it ('should be impossible to transfer more tokens than available', async() => {
    const givenAmountToTransfer = Number(totalSupply.toString()) + 1

    expect(instance.transfer(receipientAccount, givenAmountToTransfer)).to.eventually.be.rejected;

    const deployerBalance = instance.balanceOf(deployerAccount)
    const receipientBalance = instance.balanceOf(receipientAccount)

    expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply)
    expect(receipientBalance).to.eventually.be.a.bignumber.equal(new BN(0))
  })


})



