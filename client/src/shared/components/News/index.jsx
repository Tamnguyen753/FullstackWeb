import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ViewPost = styled.div`
  .link{
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s linear;
    display: flex;
    width: 500px;
    height: 100&;
    margin: 20px;
  
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Image = styled.img`
width: 100%;
height: 240px;
object-fit: cover;
margin: 10px;
padding: 10px; 
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Date = styled.p`
font-size: 14px;
font-weight: 400;
color: #5a637a;
`;
const Span = styled.span`
display: inline-block;
padding: 8px 12px;
border: 1px solid black;
color: black;
font-size: 12px;
font-weight: 400;
margin-bottom: 14px;
margin-top: 10px;
`
const NewsItem = ({ news }) => {
  const { title, img, createAt, content,type ,_id } = news;
  const [timeDiff, setTimeDiff] = useState(0);
  useEffect(() => {
    const currentTime = moment();
    const newsTime = moment(createAt);
    const diffInMinutes = currentTime.diff(newsTime, 'minutes');
    setTimeDiff(diffInMinutes);
  }, [createAt]);
  return (
    <ViewPost>
      <Link className='link' to={`/news/${_id}`}>
      <ImageContainer>
        <Image src={img} alt={title} />
      </ImageContainer>
      <InfoContainer>
        <div>
          <Span>{ timeDiff <1000 ? "Spotligh" : "News" }</Span>
          <Title>{title}</Title>
          <Date>{moment(createAt).format('MMMM Do YYYY, h:mm:ss a')} | MOVIE MINDX</Date>
        </div>
      </InfoContainer>
      </Link>
    </ViewPost>
  );
};

export default NewsItem;
