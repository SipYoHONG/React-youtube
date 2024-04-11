import React from "react";
import { useNavigate } from 'react-router-dom';
import { formatAgo } from "../util/date";
import './VideoCard.css';

export default function VideoCard({ video }) {
    const navigate = useNavigate();
    const {title, thumbnails, channelTitle, publishedAt} = video.snippet;
    if (typeof(video.id) !== 'string' && video.id.kind === 'youtube#channel' )
        return;
    const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

    return (
        <li className="cardListItem" onClick={() => { navigate(`/videos/watch/${videoId}`) }}>
            <div className="cardContainer">
                <div className="cardImage">
                    <img src={thumbnails.medium.url} alt={title} />
                </div>
                <div className="cardContent">
                    <p className="cardTitle">{title}</p>
                    <p className="cardChannel">{channelTitle}</p>
                    <p className="cardPublished">{formatAgo(publishedAt, 'ko')}</p>
                </div>
            </div>
        </li>
    );
}