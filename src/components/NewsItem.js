import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {tittle,description,imageUrl,newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl?"https://cdn.pixabay.com/photo/2022/11/04/09/29/breaking-news-7569437_640.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{tittle}...</h5>
    <p className="card-text">{description}...</p>
    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
