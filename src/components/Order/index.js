import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import AssetMetadata from './AssetMetadata'
import styled from 'styled-components';
import { connectWallet } from '../../constants';
import { OrderSide } from 'opensea-js/lib/types';
import './btn.css';

const Card = styled.div.attrs({ className: "card mx-2 mb-4" })`
  min-width: 275px;
  max-width: 275px;
  img {
    height: 120px;
    max-width: 100%;
  }
  img.small {
    max-width: 50%;
    height: 60px;
  }
`

export default class Order extends React.Component {

  state = {
    errorMessage: null,
    creatingOrder: false
  }

  static propTypes = {
    currentAccount: PropTypes.object,
    order: PropTypes.shape({
      makerAccount: PropTypes.object.isRequired
    }).isRequired,
    seaport: PropTypes.object.isRequired,
    accountAddress: PropTypes.string
  }

  onError(error) {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    this.setState({ errorMessage: error.message })
    setTimeout(() => this.setState({errorMessage: null}), 3000)
    throw error
  }

  async fulfillOrder() {
    const { order, accountAddress } = this.props
    if (!accountAddress) {
      await connectWallet()
    }
    try {
      this.setState({ creatingOrder: true })
      await this.props.seaport.fulfillOrder({ order, accountAddress })
    } catch(error) {
      this.onError(error)
    } finally {
      this.setState({ creatingOrder: false })
    }
  }

  renderBuyButton(canAccept = true) {
    const { creatingOrder } = this.state
    const { accountAddress, order } = this.props
    const buyAsset = async () => {
      if (accountAddress && !canAccept) {
        this.setState({
          errorMessage: "You already own this asset!"
        })
        return
      }
      this.fulfillOrder()
    }
    return (
      <button disabled={creatingOrder} onClick={buyAsset}  className="btn btn-primary w-100">Purchase</button>
    )
  }


  render() {
    const { errorMessage } = this.state
    const { order, accountAddress } = this.props
    const { makerAccount, listingTime, asset, assetBundle } = order

    const owner = asset
      ? asset.owner
      : assetBundle.assets[0].owner

    const ts = listingTime.toNumber() * 1000
    const timeLabel = moment(ts).local().fromNow()
    const isOwner = accountAddress && accountAddress.toLowerCase() === owner.address.toLowerCase()

    return (
      <Card>
        
        <AssetMetadata asset={asset} />
 
        <ul className="list-group list-group-flush">

          { errorMessage
            ? <div className="alert alert-warning mb-0" role="alert">
                {errorMessage}
              </div>
            : <li className="list-group-item">
                {order.side === OrderSide.Buy
                  ? this.renderAcceptOfferButton(isOwner)
                  : null
                }
                {order.side === OrderSide.Sell
                  ? this.renderBuyButton(!isOwner)
                  : null
                }
              </li>
          }
        </ul>
      </Card>
    )
  }
}

