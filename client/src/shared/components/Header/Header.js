import React from "react";
import styled from "styled-components";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";

//css
const HeaderComponent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 80px;
  padding: 8px 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  .header__menu {
    width: fit-content;
    height: 40px;
    display: flex;
    gap: 48px;
    align-items: center;
    list-style: none;
    &-item {
      a {
        text-decoration: none;
      }
      cursor: pointer;
    }
  }
  .header__logo {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent>
        <div className="header__logo" onClick={() => navigate("/")}>
          <img src="/images/header_logo.png" alt="" />
        </div>
        <ul className="header__menu">
          <li className="header__menu-item">
            <a href="#">Home</a>
          </li>
          <li className="header__menu-item">
            <a href="#">Ticket</a>
          </li>
          <li className="header__menu-item">
            <a href="#" className="header__menu-item__link">
              News
            </a>
          </li>
          <li className="header__menu-item" header-notification>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
            >
              <path
                d="M9.72094 4.00302L8.25493 4.00002C4.9109 3.99202 2.00787 6.70904 1.98487 10.0001V13.7901C1.98487 14.5801 1.88487 15.3511 1.45387 16.0081L1.16687 16.4461C0.729864 17.1101 1.19987 18.0001 1.98487 18.0001H16.015C16.8 18.0001 17.269 17.1101 16.833 16.4461L16.546 16.0081C16.116 15.3511 16.015 14.5791 16.015 13.7891V10.0011C15.975 6.70904 13.065 4.01102 9.72094 4.00302V4.00302Z"
                stroke="#333333"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9998 18.0001C11.9998 18.7958 11.6837 19.5588 11.1211 20.1215C10.5585 20.6841 9.79544 21.0001 8.99978 21.0001C8.20413 21.0001 7.44106 20.6841 6.87844 20.1215C6.31583 19.5588 5.99976 18.7958 5.99976 18.0001"
                stroke="#333333"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.00002 1C9.53045 1 10.0392 1.21072 10.4142 1.58579C10.7893 1.96087 11 2.46958 11 3.00002V4.00003H7V3.00002C7 2.46958 7.21072 1.96087 7.58579 1.58579C7.96087 1.21072 8.46958 1 9.00002 1Z"
                stroke="#333333"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li className="header__menu-item header-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle
                cx="20"
                cy="20"
                r="20"
                fill="url(#paint0_linear_842_2220)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_842_2220"
                  x1="2.98023e-07"
                  y1="20"
                  x2="40"
                  y2="20"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F2C46F" />
                  <stop offset="1" stop-color="#C6943F" />
                </linearGradient>
              </defs>
            </svg>
          </li>
        </ul>
      </HeaderComponent>
      <Admin />
    </>
  );
};

export default Header;
