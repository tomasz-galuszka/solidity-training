import getWeb3 from "../getWeb3"
import KYCContract from "../contracts/KYCContract.json"

export class KYCSservice {

  constructor(web3) {
    this.web3 = web3
  }

  initialize = async () => {
    this.accounts = await this.web3.eth.getAccounts()
    this.networkId = await this.web3.eth.net.getId()
    this.contractInstance = new this.web3.eth.Contract(
      KYCContract.abi,
      KYCContract.networks[this.networkId] && KYCContract.networks[this.networkId].address
    )
    return this
  }

  addAddress = async (userAccount, address) => {
    console.log(`KYC for ${address} adding from user account ${userAccount} ...`)

    await this.contractInstance.methods
      .setCompleted(address)
      .send({ from: userAccount})

    console.log(`KYC for ${address} is completed`)
  }
  
}