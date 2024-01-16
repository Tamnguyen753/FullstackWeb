import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
  /* Thêm các quy tắc CSS của bạn ở đây */
`;

const ModalCreate = () => {
  const [title, setTitle] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleModalCreate = async () => {
    if (!title || !img || !content || !type) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }
    try {
        const res = await axios.post('http://localhost:8000/news', {
            title,img,content,type
        })
        alert('Tạo thành công')
        navigate('/news');
    } catch (error) {
        
    }
  };

  return (
    <ModalStyle className='modal-create'>
      <div className='form-item'>
        <span>Tiêu đề</span>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='form-item'>
        <span>Link Ảnh</span>
        <Input value={img} onChange={(e) => setImg(e.target.value)} />
      </div>
      <div className='form-item'>
        <span>Nội dung</span>
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className='form-item'>
        <span>Loại</span>
        <Input value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <Button type='primary' size='large' onClick={handleModalCreate}>
        Gửi
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </ModalStyle>
  );
};

export default ModalCreate;
