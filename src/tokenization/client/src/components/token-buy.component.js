import React, { Component } from "react"
import { MatchaTokenSaleService } from "../service/matcha-token-sale.service"

export class TokenBuyComponent extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    this.service = await new MatchaTokenSaleService(this.props.web3).initialize()
  }

  handleBuyTokens = async() => {
    this.service.buyTokens(this.props.address)
  }

  render() {
    return (
      <div className="token-buy">
        <p>
          <button type="button" onClick={this.handleBuyTokens}>Buy single</button>
        </p>
      </div>
    )
  }
}