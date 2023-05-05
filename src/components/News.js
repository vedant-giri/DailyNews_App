import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import '../index.css'
import { useLocation } from 'react-router-dom';

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState();
  const [isMobile, setIsMobile] = useState(false);
  
  const location = useLocation();
  

  const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    setloading(true);
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9983e714bfe748b2a3479208e687459d&page=${page}&pageSize=${props.pageSize}`);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
   props.setProgress(100);
  }

  useEffect(() => {
    
    
    
    updateNews();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [page]);

 useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, [location]);

  
 const handleNextClick = async () => {
   if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
      setpage(page + 1);
      
     }
   }
  
  const totalPages=Math.ceil(totalResults/props.pageSize);
  
  const handleClick=(page)=>{
    setpage(page);
    
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handleClick(i)} className={page===i?'active':''} style={{margin:'5px 10px ' ,width:'40px'}}>
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

   const handlePrevClick = async () => {
     setpage(page - 1);
   }
    
   return (
     <div className="container my-3">
       <h1 className='text-center ' style={{marginTop:'70px ',marginBottom:'30px'}} >DailyNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
       {loading && <Spinner />}
       <div className="row">
         {!loading && articles.map((element) => {
           return <div className="col-md-4 " key={element.url}>
             <div className="d-flex justify-content-center mx-3 my-3" >
             <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
             </div>
             
           </div>
         })}
       </div>
       <div className="container d-flex justify-content-between " style={{marginTop:"10px"}}>
         <button type="button" onClick={handlePrevClick} disabled={page <= 1} className="btn btn-dark" > &larr; Previous</button>
         {isMobile ? <h4 className='my-2'>{page} of {totalPages}</h4>:<h5 id="page-numbers" className='pagination-container '>{renderPageNumbers()}</h5>}
         
         <button type="button" onClick={handleNextClick} className="btn btn-dark" >Next &rarr;</button>
       </div>
     </div>
    
   )
 }
 
 News.defaultProps = {
   country: "in",
   pageSize: "5",
   category: "general"
 }
 News.propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string
 }




       
      
       

    
    
















