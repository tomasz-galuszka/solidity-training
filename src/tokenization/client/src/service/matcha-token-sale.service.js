import MatchaTokenSaleContract from "../contracts/MatchaTokenSale.json";

export class MatchaTokenSaleService {

  constructor(web3) {
    this.web3 = web3
  }

  initialize = async () => {
    this.accounts = await this.web3.eth.getAccounts()
    this.networkId = await this.web3.eth.net.getId()
    this.contractInstance = new this.web3.eth.Contract(
      MatchaTokenSaleContract.abi,
      MatchaTokenSaleContract.networks[this.networkId] && MatchaTokenSaleContract.networks[this.networkId].address
    )

    return this
  }

  getAddress = () => {
    return MatchaTokenSaleContract.networks[this.networkId].address
  }

  buyTokens = async(userAccount) => {
    await this.contractInstance.methods
      .buyTokens(userAccount)
      .send({
        from: userAccount,
        value: this.web3.utils.toWei("1", "wei")
      })
  }

  getWalletAddres = async () => {
    return await this.contractInstance.methods
      .wallet()
      .call() // read is free
  }

  getWalletMoneyBalance = async () => {
    console.log(`Getting token sale balance ...`)

    const walletAddress = await this.getWalletAddres()
    const balance = await this.web3.eth.getBalance(walletAddress)
    const result = this.web3.utils.fromWei(balance, "ether")

    console.log(`Getting token sale balance  = ${result}`)
    return result
  }

}