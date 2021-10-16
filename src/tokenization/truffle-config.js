
require('dotenv').config({path: '.env'});
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 7545,
      host: 'localhost',
      network_id: '5777'
    },
    ganache_local: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          shareNonce: true,
          numberOfAddresses: 5,
          addressIndex: AccountIndex,
          providerOrUrl: "http://localhost:7545",
        }),
      network_id: '5777',
    },
  },
  compilers: {
    solc: {
      version: "0.8.9"
    }
  }
};
