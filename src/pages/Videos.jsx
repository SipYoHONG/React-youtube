import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard"

// const keywordUri = `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=25&part=snippet&q=`;
// const popularUri = `https://youtube.googleapis.com/youtube/v3/channels?id=UCx-KWLTKlB83hDI6UKECtJQ&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`;

export default function Videos() {
    const { keyword } = useParams();

    const {isLoading, error, data:videos} = useQuery({
        queryKey: ["videos", keyword],
        queryFn: async () => {
    //      const uri = keyword ? keywordUri + keyword : popularUri;
            const res = await axios.get(`/data/${keyword ? "search" : "popular"}.json`);  // << text용으로 mock data를 쓸려면 이런식으로
                // .get(uri) // 실전용으로~                                                    
            return res.data.items;
        },
            staleTime: 1000 * 60 * 1,       // 1분, ms 단위로 지정할 수 있음
    });
    // useEffect(() => {
    //     axios.get(`/data/${keyword ? 'search' : 'popular'}.json`)
    //     .then(res => {
    //         setVideos(res.data.items);
    //         console.log(videos);
    //     });
    // }, [keyword]);

    return (
        <>
            {/* <div> Videos {keyword ? `${keyword}로 검색` : 'Hot Trend'} </div> */}
            {isLoading && <p><HourglassTopIcon />Loading...</p>}
            {error && <p><WarningAmberIcon />Something is wrong!!</p>}
            {videos &&(
            <ul>
                {videos.map(video => (
                <VideoCard key={video.id} video={video} />
                ))}
            </ul>
          )}
        </>
    );
}