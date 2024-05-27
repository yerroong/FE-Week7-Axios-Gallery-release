import React from "react";
import { styled } from 'styled-components';
import { useNavigate } from "react-router-dom";
import ZZZ from "../assets/ZZZ.jpg"

const Container = styled.div`
    //border: 2px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; // 수직 중앙 정렬
    height: 100vh; // 화면 전체 높이 사용
`
const Text = styled.div`
  font-size : 20px;
  font-weight : bold; 
  margin-bottom: 10px;
`
const Photo= styled.img`
  margin:10px;
  width: 800px;
`;

const NotFound = () => {
  const navigate = useNavigate();

    return (
        <> 
        <Container>
            <Text>멋쟁이 사자가 당신을 기다리고 있습니다</Text>
            <Photo src={ZZZ}/>
            <p>Zzzzz</p>
            <button className="btn" onClick={() => navigate("/")}> 뒤돌아서 도망가기! </button>
        </Container>

        </>
    );
};

export default NotFound;