import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css";
import { Button } from 'antd/es/radio';


const NotFound = () => (
  <div className="not-found">
    <img
      src="https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg"
      alt="not-found"
    />
    <Link to="/" className="link-home">
      <Button type='primary' size='large' >Go Home</Button>
    </Link>
  </div>
);

export default NotFound;
