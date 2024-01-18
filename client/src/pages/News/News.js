

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Input, Button, Spin, Modal } from 'antd';
import axios from 'axios';
import NewsItem from '../../shared/components/News';
import ModalCreate from './ModalCreate';
import useBoolean from '../../hooks/useBoolean';
import ReactPaginate from 'react-paginate';
import { AppContext } from '../../App';


const NewsPage = styled.div`
  max-width: 1800px;
  max-height: 2500vh;
  margin: 0 auto;
  padding-bottom: 100px;
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
  .pagination {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 10px 0;
    li {
      margin-right: 8px;
    }
    .pagination__link {
      padding: 8px;
      border: 1px solid #ddd;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
    .pagination__link--disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    .pagination__link--active {
      background-color: #1890ff;
      color: #fff;
    }
`;

const ButtonCreateNews = () => {

  const { value: isOpen, setTrue, setFalse } = useBoolean();
  return (
    <>
      <Button type="primary" onClick={setTrue}>
        Create
      </Button>
      <Modal
        title="New News"
        visible={isOpen}
        onCancel={setFalse}
        footer={false}
      >
        <ModalCreate />
      </Modal>
    </>
  );
};
const useUserContext = () => {
  const { user } = useContext(AppContext)
  return user;
};
const News = () => {

  const user1 = useUserContext();
  const filterNews = ['anime', 'action', 'horror', 'thriller', 'novel', 'cartoon'];
  const { Search } = Input;

  const [activeButton, setActiveButton] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 3;
  const pagesVisited = pageNumber * newsPerPage;

  const pageCount = Math.ceil(filteredNewsData.length / newsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/news");
        const listNew = Object.values(response.data);
        setNewsData(listNew);
        setFilteredNewsData(listNew);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <div className="header">
        <h1>TIX ID News</h1>
        <p>Những tin tức mới nhất về thế giới điện ảnh dành cho bạn!</p>
        {user1 && user1.username === "admin" ? <ButtonCreateNews /> : null}
        <Search
          placeholder="Tìm kiếm bài viết"
          allowClear
          onSearch={handleSearch}
        />
        {filterNews.map((topic) => (
          <Button
            key={topic}
            className="filterButton"
            type={activeButton === topic ? "primary" : "default"}
            onClick={() => handleFilter(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
      <div className="content">
        {loading ? (
          <Spin size="large" />
        ) : (
          filteredNewsData
            .slice(pagesVisited, pagesVisited + newsPerPage)
            .map((news) => <NewsItem key={news._id} news={news} />)
        )}
      </div>
      <span>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </span>
    </NewsPage>
  );
};

export default News;
