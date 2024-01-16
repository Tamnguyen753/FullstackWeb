
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button, Spin, Modal } from 'antd';
import axios from 'axios';
import NewsItem from '../../shared/components/News';
import ModalCreate from './ModalCreate';
import useBoolean from '../../hooks/useBoolean';

const NewsPage = styled.div`
max-width: 1440px;
max-height: 2500vh;
margin: 0 auto;
padding-bottom: 50px;
  .header { 
    display: block; 
        h1 { 
          font-size: 24px; 
          margin-bottom: 8px; 
        } 
        p { 
          font-size: 16px; 
          margin-bottom: 16px; 
        } 
        .Search { 
          width: 450px; 
          height: 45px; 
          margin-left: 10px; 
          margin-bottom: 16px; 
        } 
        .filterButton { 
          margin-right: 8px; 
          margin-bottom: 8px; 
        }
      } 
  .content { 
    width: 1000px; 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 15px; 
  } 
  `

  const ButtonCreateNews = () => {
    const { value: isOpen, setTrue, setFalse } = useBoolean();
    return (
      <>
        <Button type='primary' onClick={setTrue}>
          Create
        </Button>
        <Modal title='New News' open={isOpen} onCancel={setFalse} footer={false}>
          <ModalCreate />
        </Modal>
      </>
    );
  };


const News = () => {
  const filerNews = ['anime', 'action', 'horror', 'thriller', 'novel', 'cartoon']
  const { Search } = Input;

  const [activeButton, setActiveButton] = useState('');
  const [newsData, setNewsData] = useState([]);
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/news');
        const listNew = Object.values(response.data);
        setNewsData(listNew);
        setFilteredNewsData(listNew);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleFilter = (topic) => {
    setActiveButton(topic);
    if (topic) {
      const filteredData = newsData.filter((news) => news.type === topic);
      setFilteredNewsData(filteredData);
    } else {
      setFilteredNewsData(newsData);
    }
  };

  const handleSearch = (value) => {
    const filteredData = newsData.filter((news) =>
      news.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredNewsData(filteredData);
  };

  return (
    <NewsPage>
      <div className='header'>
        <h1>TIX ID News</h1>
        <p>Những tin tức mới nhất về thế giới điện ảnh dành cho bạn!</p>
        <ButtonCreateNews />
        <Search
          placeholder='Tìm kiếm bài viết'
          allowClear
          onSearch={handleSearch}
        />
        {filerNews.map((topic) => (
          <Button
            key={topic}
            className='filterButton'
            type={activeButton === topic ? 'primary' : 'default'}
            onClick={() => handleFilter(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
      <div className='content'>
        {loading ? (
          <Spin size="large" />
        ) : (
          filteredNewsData.map((news) => (
            <NewsItem key={news._id} news={news} />
          ))
        )}
      </div>
    </NewsPage>
  );
};

export default News;