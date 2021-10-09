var MachaToken = artifacts.require('./MachaToken.sol');

module.exports = async (deployer) => {
  await deployer.deploy(MachaToken, 100000);
}