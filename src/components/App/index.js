import React from 'react';
import styled from 'styled-components';
import Log from '../Log'
import { OpenSeaPort, Network } from 'opensea-js';
import { web3Provider, onNetworkUpdate, OPENSEA_JS_URL, GITHUB_URL } from '../../constants';
import PropTypes from 'prop-types';

export default class App extends React.Component {

  state = {
    accountAddress: null,
  }

  constructor(props) {
    super(props)
    this.itemtoSell = props.itemtoSell
    this.onChangeAddress()
    onNetworkUpdate(this.onChangeAddress)
  }

  static propTypes = {
    itemtoSell: PropTypes.string.isRequired
  }

componentDidMount() {
  console.log(this.props);
}

  onChangeAddress = () => {
    this.seaport = new OpenSeaPort(web3Provider, {
      networkName: Network.rinkeby
    })
    //Testnet Change
    //this.seaport.api.apiBaseUrl = 'https://rinkeby-api.opensea.io/api/v1/'
    this.web3 = this.seaport.web3
    this.web3.eth.getAccounts((err, res) => {
      this.setState({
        accountAddress: res[0]
      })
    })
  }

  render() {
    return (
      <div>
        <main>
          <Log
            seaport={this.seaport}
            accountAddress={this.state.accountAddress}
            itemtoFetch =  {this.itemtoSell} />
        </main>
      </div>
    )
  }
}