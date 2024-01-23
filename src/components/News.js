import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title = `Metro News - ${props.category}`
    
   
  
  const updateNews = async()=>{
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6c7897e7b275405d9d90ff2fb8d1690f&page=${page}&pagesize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
  
  }, [])



  

  const handlePrevClick = () => {
    setpage(page-1)
        updateNews();
      }
    
  


  const handleNextClick = () => {
        setpage(page+1)
        updateNews();
      }


  const fetchMoreData = async() => {
    setpage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6c7897e7b275405d9d90ff2fb8d1690f&page=${page}&pagesize=${props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }


 
    return (
      <>
       
        <h2 className='text-center' style={{margin:"35px 0px"}}>Metro News - Top {props.category} Headlines</h2>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element,index)=>{
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
News.defaultProps = {
  country:"in",
  pageSize:6,
  category:"general"
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}


export default News
