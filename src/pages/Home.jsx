import React, { useEffect, useState } from "react";
import { styled } from 'styled-components';
import Header from '../components/Header';
import Card from '../components/Card'
import axios from "axios";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; // 카드 간의 간격을 줄임
  justify-content: center; // 카드들을 중앙에 배치
`;
const Home = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios
        .get("http://3.36.127.43:8080/imageAll")
        .then((res) => {
        setCards(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }, []);

  return (
        <> 
            <Header></Header>
            <CardContainer>
            {cards.map((card) => (
            <Card
                key={card.id}
                id={card.id}
                img={card.imageURL}
                name={card.imageName}
                text={card.imageText}
              />
            ))}
            </CardContainer>            
          
        </>
    );
};

export default Home;