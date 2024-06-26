import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export default class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize: 12,
    category: 'general'

  }
  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {                               // capatalize function             
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("this is constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`
    // document.title = `${this.props.category} - NewsApp`

  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad47e20718e24a31969e098b268e6c12&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
        articles: parsedData.articles ,
        totalResults: parsedData.totalResults,
        loading : false
    })
  }
  
  async componentDidMount(){
    console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad47e20718e24a31969e098b268e6c12&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData)
    // console.log(data);
    // this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false

    // })
    this.updateNews();

  }

    handlePreviousClick = async()=> {
    console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad47e20718e24a31969e098b268e6c12&page=${this.state.page- 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData)
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles ,
    //     loading : false
    // })
      this.setState({page: this.state.page-1});
      this.updateNews();
  }

  handleNextClick = async()=>{
    console.log("Next")
    // if(!(this.state.page+1 > Math.ceil(this.totalResults/this.props.pageSize))){

    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ad47e20718e24a31969e098b268e6c12&page=${this.state.page+1}&pageSize=${this.props.pageSize }`
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData)
    //   this.setState({
    //       page: this.state.page + 1,
    //       articles: parsedData.articles ,
    //       loading : false
    //   })
    // }
    this.setState({page: this.state.page+1})
    this.updateNews();

  }

  render() {
     console.log("render")
    return (
      <div>
        <div className="container my-3"></div>
        <h2 className="text-center" style={{margin: '35px 0px'}}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) =>{
            return (<div className="col-md-3 " key={element.url}>
            {/* <NewsItem  title={element.title.slice(0,44)} description={element.description.slice(0,95)} imageUrl={element.urlToImage} newsUrl={element.url}/> */}
            <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>

          </div>)
        })}
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      </div>
    );
  }
}
