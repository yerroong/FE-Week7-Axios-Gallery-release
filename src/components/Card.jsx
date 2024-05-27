import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Photo = styled.img`
  width: 200px;
  height: 200px;
`;

const Wrapper = styled.div`
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center; // 사진을 가운데 정렬
`;

const TextContainer = styled.div`
  width: 200px;
  text-align: left; // 텍스트를 왼쪽 정렬
`;

const Name = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  overflow: hidden; // 초과된 부분 안보이게
  white-space: nowrap; // 줄바꿈 없게
  text-overflow: ellipsis; // ...으로 대체
`;

const TextWrapper = styled.p`
  text-decoration-color: gray;
  font-size: 10px;
  margin: 0;
  padding-top: 3px;
  overflow: hidden; // 초과된 부분 안보이게
  white-space: nowrap; // 줄바꿈 없게
  text-overflow: ellipsis; // ...으로 대체
`;

export default function Card({ img, name, id, text }) {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/Post/${id}`)}>
      <Photo src={img} />
      <TextContainer>
        <Name>{name}</Name>
        <TextWrapper>{text}</TextWrapper>
      </TextContainer>
    </Wrapper>
  );
}
