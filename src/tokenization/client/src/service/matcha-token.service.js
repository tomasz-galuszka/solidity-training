import MatchaTokenContract from "../contracts/MatchaToken.json";

export class MatchaTokenService {

  constructor(web3) {
    this.web3 = web3
  }

  initialize = async () => {
    this.accounts = await this.web3.eth.getAccounts()
    this.networkId = await this.web3.eth.net.getId()
    this.contractInstance = new this.web3.eth.Contract(
      MatchaTokenContract.abi,
      MatchaTokenContract.networks[this.networkId] && MatchaTokenContract.networks[this.networkId].address
    )
    return this
  }

  getMoneyBalance = async (userAccount) => {
    console.log(`Getting money balance for ${userAccount} ...`)

    const balance = await this.web3.eth.getBalance(userAccount)
    const result = this.web3.utils.fromWei(balance, "ether")

    console.log(`Getting money balance for ${userAccount} = ${result}`)
    return result
  }

  getTokenBalance = async (userAccount) => {
    console.log(`Getting token balance for ${userAccount} ...`)

    const result = await this.contractInstance.methods
      .balanceOf(userAccount)
      .call()

    console.log(`Getting token balance for ${userAccount} = ${result}`)
    return result // read is free
  }

  subscribeTokenTransferEvent = (userAccount, onTransfer) => {
    this.contractInstance.events
      .Transfer({to: userAccount})
      .on('data', async() => await onTransfer())
  }

}