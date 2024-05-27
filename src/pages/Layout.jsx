import React from 'react';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';


const BackGround = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Layout = () => {
  return (
    <BackGround>
      <Wrapper>
        <Outlet/>
      </Wrapper>
    </BackGround>
  );
};

export default Layout;
