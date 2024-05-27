import React, { useEffect } from 'react'
import { useState } from 'react';
import { styled } from 'styled-components';
import axios from "axios";
import likelion from "../assets/likelion.png"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`;

const ContentsWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;
    text-align: left;

`;

const Text = styled.div`
    margin-top: 8px;
    text-align: left;
`;

const Img = styled.img`
    align-self: center; 
    width: 100px;
    margin-right: 50px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = () => {
    const [userInfo, setUserInfo] = useState(0);
    
        useEffect(() => {
        axios
            .get('http://3.36.127.43:8080/imageSize')
            .then((res) => {
                setUserInfo(res.data);
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);


    return (
        <Wrapper> 
            <ContentsWrapper>
            <Img src = {likelion} alt="likelion logo"/>
            <TextContainer>
            <h2>likelion_12th_frontend</h2>
            <Text>멋쟁이사자처럼 12기 여러분 화이팅! 어른사자로 폭풍성장중..🦁</Text>
            <h4>게시물 {userInfo}개</h4>
            </TextContainer>
            </ContentsWrapper>
        </Wrapper>
    );
};

export default Header;