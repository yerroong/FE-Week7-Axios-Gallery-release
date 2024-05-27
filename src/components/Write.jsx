import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const TextContainer = styled.div`
  padding-left: 20px;
  display: flex;
  justify-content: center;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 850px;
  margin-left: 30px;
`;

const CommentInput = styled.textarea`
  width: 680px;
  height: 30px;
  padding: 10px;
  font-size: 16px;
  background-color: white;
  border: none;
  resize: none;
  
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: white;
  color: blue;
  border: none;
  cursor: pointer;
`;

const DeleteButton =styled.button`
  width: 100px;
  height: 50px;
  background-color: white;
  color: grey;
  border: none;
  cursor: pointer;
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
  width: 760px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const Comment = styled.div`
  display: flex;  
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 5px;
  width: 100%;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-right: 10px;
  width: 10%;
`;

const CommentBody = styled.div`
  font-size: 16px;
  width: 75%;
`;

const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  margin-right: -30px;
  justify-content: flex-end; 
`;

const Text1 = styled.h1`
  font-size: 16px;
  margin: 0;
  margin-right:-700px;
  margin-top:-30px;
`;


const Comments = () => {
  const { cardId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (cardId) {
      axios.get(`http://3.36.127.43:8080/${cardId}/comments`)
        .then(res => {
          setComments(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [cardId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (cardId) {
      axios.post(`http://3.36.127.43:8080/${cardId}/comments`, { commentBody: newComment })
        .then(response => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://3.36.127.43:8080/${cardId}/comments/${id}`)
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <Text1>댓글: {comments.length}개</Text1>
      <TextContainer>
        <CommentInputContainer>
          <CommentInput
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글 작성...."
          />
          <SubmitButton onClick={handleCommentSubmit}>게시</SubmitButton>
        </CommentInputContainer>
      </TextContainer>
      <CommentsContainer>
        
        {comments.map((comment, index) => (
          <Comment key={index}>
            <CommentAuthor>익명</CommentAuthor>
            <CommentBody>{comment.commentBody}</CommentBody>
            <DeleteContainer>
              <DeleteButton onClick={() => handleDelete(comment.id)}>삭제</DeleteButton>
            </DeleteContainer>
          </Comment>
        ))}
      </CommentsContainer>
    </Wrapper>
  );
};

export default Comments;