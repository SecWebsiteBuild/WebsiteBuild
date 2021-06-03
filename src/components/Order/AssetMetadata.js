import React from 'react'

export default class AssetMetadata extends React.Component {
  render() {
    const { asset } = this.props

    return (
      <React.Fragment>   
        <div className="card-body h-25">
          <h5 className="card-title">{asset.name}</h5>
          <p className="card-text text-truncate">
            <a target="_blank" rel="noopener noreferrer" href={asset.openseaLink} className="card-link">{asset.assetContract.name} #{asset.tokenId}</a>
          </p>
        </div>
      </React.Fragment>
    )
  }
}