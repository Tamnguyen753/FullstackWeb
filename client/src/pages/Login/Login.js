import React, { useState } from "react";
import "./Login.css";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => { 
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Tài khoản và mật khẩu không được bỏ trống !');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      const token =response.data
      console.log(token);

      localStorage.setItem("access_token",JSON.stringify(token));
      alert('Đăng nhập thành công!')
      navigate('/');
    } catch (error) {
      console.error('Có lỗi khi call api')
      alert('Sai tài khoản hoặc mật khẩu ')
      return
      // setError('Tài khoản và mật khẩu không được bỏ trống !');
    }
  }
  
  return (
    <div
      className="login"
      style={{
        backgroundImage: "url(/picture.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="box-login">
        <div className="content">
          <div className="header-login">
            <h1>Masuk ke TIX ID</h1>
            <h2>NOMOR HANDPHONE</h2>
          </div>
          <div className="content-login">
            <input
              placeholder="Email"
              type="Email"
              style={{
                height: "32px",
                border: "none",
                borderBottom: "1px solid gray",
              }}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Password"
              style={{
                height: "32px",
                border: "none",
                borderBottom: "1px solid gray",
              }}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <Button type="primary" onClick={handleLogin}>Sign in</Button>
            <Link to="/register">
            <Button className="btn-signup">Sign up</Button>
            </Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
