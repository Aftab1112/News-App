import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {tittle,description,imageUrl,newsUrl,author,date,source} = this.props
    return (
      <div className='my-3'>
        <div className="card">
          <span className='position-absolute top-0 translate-middle badge rounded-pill bg-primary' style={{left:"90%",zIndex:"1"}}>{source}</span>
  <img src={!imageUrl?"https://cdn.pixabay.com/photo/2022/11/04/09/29/breaking-news-7569437_640.jpg":imageUrl} className="card-img-top" alt=""/>
  <div className="card-body">
    <h5 className="card-title">{tittle}...</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toUTCString()} </small></p>
    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
