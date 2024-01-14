import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  width: 100%;
`;

const BannerOverview = () => {
  return (
    <Banner>
      <img srcSet="/images/banner.png 2x" alt="Banner" />
    </Banner>
  );
};

export default BannerOverview;
