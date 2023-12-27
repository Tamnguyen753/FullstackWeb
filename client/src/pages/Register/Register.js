import React, { useState } from "react";
import "./Register.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()
  const [error,setError] = useState('');
  const handleRegister = async () => {
    if (!email || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/register', {
        email,
        password,
      });
      console.log(response.data);
      alert('Đăng ký thành công !')
      navigate('/login');

    } catch (error) {
      console.error('Có lỗi khi call api')
      setError('Đăng ký không thành công. Vui lòng thử lại.');
    }
  }
  return (
    <div
      className="login"
      style={{
        backgroundImage: "url(/picture2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="box-login">
        <div className="content">
          <div className="header-login">
            <h1>Daftar TIX ID</h1>
            <h2>NAMA LENGKAP</h2>
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
            <div>
              <h2>NOMOR HANDPHONE</h2>
              <input
                type="password"
                placeholder="Password"
                style={{
                  height: "32px",
                  border: "none",
                  borderBottom: "1px solid gray",
                  width: "300px",
                }}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
              <Button type="primary" className="btn-signup" onClick={handleRegister}>
                Register
              </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
