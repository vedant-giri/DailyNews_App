/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../index.css'

export default function NewsItem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card news-card" style={{ width: " 16rem" }}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
          {source}
        </span>
        <img src={!imageUrl ? "https://images.indianexpress.com/2023/03/sensex11-1.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}.</small></p>
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary">Show more</a>
        </div>

      </div>
    </div>
  )
}
