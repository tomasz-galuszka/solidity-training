const ProductManager = artifacts.require('./ProductManager.sol'); // gives back abi interface

// alawys deploy an empty smart contract
contract('ProductManager', accounts => {
  
  it('should be able to add a product', async () => {

    const productManagerInstance = await ProductManager.deployed(); // truffle contract instace instead of web3 instance
    const identifier = "xxx";
    const price = 500;

    const result = await productManagerInstance.create(identifier, price, {from: accounts[0]})
    const createdProduct = await productManagerInstance.products(0);

    expect(result.logs[0].args._index.toNumber()).to.equal(0);
    expect(result.logs[0].args._status.toNumber()).to.equal(0);
    expect(result.logs[0].args._address).to.have.lengthOf(42);
    expect(createdProduct.id).to.equal(identifier);
    // TODO: deploy item contract under the address and verify its attributes
    // expect(createdProduct.priceInWei.toNumber()).to.equal(price);
    // expect(createdProduct.paidInWei.toNumber()).to.equal(0);
  })


})
