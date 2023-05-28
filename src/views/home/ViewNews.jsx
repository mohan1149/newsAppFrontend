import React, { useEffect } from 'react';
import { useParams } from 'react-router';
const ViewNews = () => {
    const params = useParams();
    const news = JSON.parse(params.news);
    useEffect(()=>{
        window.scrollTo({top:10,})
    });
    return (
        <div className="w3-container" id="viewNews">
            <div className="w3-card">
                <div className="w3-margin w3-padding-16">
                    <img src={news.urlToImage} width="100%" style={{ aspectRatio: 5 / 2 }} alt="" />
                    <h4>{news.title}</h4>
                    <p>{news.description}</p>
                    <a href={news.url} target="_blank">More Details</a>
                    <h6 className="w3-opacity">Author - {news.author}</h6>
                    <h6 className="w3-opacity">Source - {news.source}</h6>
                    <h6 className="w3-opacity">Category - {news.category}</h6>
                    <h6 className="w3-opacity">Published At - {news.publishedAt}</h6>
                    <h6 className="w3-opacity">DateSource - {news.data_source}</h6>
                </div>
            </div>
        </div>
    );
}

export default ViewNews;