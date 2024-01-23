import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


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
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c7897e7b275405d9d90ff2fb8d1690f&page=${this.state.page}&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    
    let parsedData = await data.json()
    this.props.setProgress(70)
    console.log(parsedData)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100)
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

  fetchMoreData = async() => {
    this.setState({page:this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6c7897e7b275405d9d90ff2fb8d1690f&page=${this.state.page}&pagesize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState(
      {articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      })
  }


  render() {
    return (
      <>
       
        <h2 className='text-center' style={{margin:"35px 0px"}}>Metro News - Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element,index)=>{
          return <div className="col-md-4"  key={`${element.url}_${index}`}>
          <NewsItem tittle={element.title?element.title?.slice(0,45):""} description={element.description?element.description?.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt} source={element.source.name  }/>
        </div>
        })}
        </div>
        </div>

        </InfiniteScroll>

       

      </>
    )
  }
}

export default News
