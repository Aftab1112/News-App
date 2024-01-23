import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
      country:"in",
      pageSize:6,
      category:"general"
    }

    static propTypes = {
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }
    
  constructor(props){          
    super(props);
    this.state = {
      articles:[ ],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title = `Metro News - ${this.props.category}`
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c7897e7b275405d9d90ff2fb8d1690f&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})

  }

  async componentDidMount(){
  await this.updateNews()
  }

  handlePrevClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      () => {
        this.updateNews();
      }
    );
  };


  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      () => {
        this.updateNews();
      }
    );
  };


  render() {
    return (
      <div className="container my-3">
       
        <h2 className='text-center' style={{margin:"35px 0px"}}>Metro News - Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}
        

        <div className="row">
        {!this.state.loading && this.state.articles.map((element,index)=>{
          return <div className="col-md-4"  key={`${element.url}_${index}`}>
          <NewsItem tittle={element.title?element.title?.slice(0,45):""} description={element.description?element.description?.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name  }/>
        </div>
        })}
        </div>

        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
