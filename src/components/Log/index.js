import React from 'react';
import PropTypes from 'prop-types';
import Order from '../Order';
import { OrderSide } from 'opensea-js/lib/types';
import { connectWallet } from '../../constants';

export default class Log extends React.Component {
  static propTypes = {
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string,
    itemtoFetch: PropTypes.string.isRequired
  };

  state = {
    orders: undefined,
    total: 0,
    side: undefined,
    onlyForMe: false,
    onlyByMe: false,
    onlyBundles: false,
    page: 1
  };

  componentDidMount() {
    this.fetchData();
    console.log(this.props);
  }

  async fetchData() {
    const { accountAddress } = this.props
    
    const { orders, count } = await this.props.seaport.api.getOrders( {
      maker: this.state.onlyByMe ? accountAddress : undefined,
      owner: this.state.onlyForMe ? accountAddress : undefined,
      side: this.state.side,
      bundled: false,
      //asset_contract_address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
      //asset_contract_address: '0x495f947276749Ce646f68AC8c248420045cb7b5e',
      
      //TEST
      asset_contract_address: '0x2FB5d7DDa4f1F20F974a0fdd547C38674E8D940c',
      //0x495f947276749Ce646f68AC8c248420045cb7b5e   -- Token
      //0x88B48F654c30e99bc2e4A1559b4Dcf1aD93FA656   -- Test
        
      //Token
      token_id: this.props.itemtoFetch,
      
      //'31673350562246474401696226698567993468440352420607247670176787853265168499108',

      //Pass
      //token_id: '31673350562246474401696226698567993468440352420607247670176787854364680126533',

      limit: 1
      // Possible query options:
      // 'asset_contract_address'
      // 'taker'
      // 'token_id'
      // 'token_ids'
      // 'sale_kind'
      
    }, this.state.page)

    this.setState({ orders, total: count });
    
  }

  render() {
    const { orders } = this.state
    
    return (
      <div className="container py-3" id="Log">

        {orders != null

          ? <React.Fragment>
              <div className="card-deck">
                {orders.map((order, i) => {
                  return <Order {...this.props} key={i} order={order}  />
                })}
              </div>
            </React.Fragment>

          : <div className="text-center">Loading...</div>
        }
      </div>
    );
  }
}
