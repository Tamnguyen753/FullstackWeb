import Typography from 'antd/es/typography/Typography'
import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
        <Typography
        style={{
          color: "#c82525",
        }}
      >
        Copyright © 2023 Web74
      </Typography>
    </div>
  )
}

export default Footer