import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

const Photo = styled.img`
  width: 580px;
  height: 580px;
`;

const Postname = styled.div`
  margin-left: 3px;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-self: flex-start;
`;

const Posttext = styled.div`
  margin-left: 3px;
  font-size: 14px;
  font-weight: 550;
  display: flex;
  align-self: flex-start;
`;

const Container = styled.div`
  padding: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const TextWrapper = styled.div`
  display: block;
`;

const TextWrapper2 = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const CommentWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentInput = styled.input`
  border: none;
  width: 80%;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const PostButton = styled.button`
  color: #4299b1;
  border: none;
  font-weight: bold;
  font-size: 15px;
  background-color: #ffffff;
  cursor: pointer;

  &:active {
    color: #2b6b7f;
  }
`;

const DeleteButton = styled.button`
  color: #9ea8aa;
  border: none;
  font-size: 15px;
  background-color: #ffffff;
  cursor: pointer;

  &:active {
    color: #69797a;
  }
`;

const CommentList = styled.div`
  margin-top: 10px;
  width: 100%;
  padding-top: 10px;
`;

const CommentItem = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CommentText = styled.div`
 display:flex;
`;

const Name = styled.div`
  font-weight: bold;
  margin-right:20px;
`;

const Post = () => {
  const { postId } = useParams();
  const [Feed, setFeed] = useState([]);
  const [Comment, setComment] = useState("");
  const [commentN, setCommentN] = useState(0);
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`http://3.36.127.43:8080/imageAll`)
      .then((res) => {
        const image = res.data.find(item => item.id === postId);
        if (image) {
          setFeed(image);
        } else {
          navigate("*");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("*");
      });
  }, [postId, navigate]);

  const retrieveComments = () => {
    axios
      .get(`http://3.36.127.43:8080/${postId}/comments`)
      .then((res) => {
        const sortedComments = res.data.reverse();
        setCommentList(sortedComments);
        setCommentN(sortedComments.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveComments();
  }, [postId]);

  const handleChange = event => {
    setComment(event.target.value);
  };

  const publishComment = () => {
    if (Comment === "") {
      return;
    }
    axios
      .post(`http://3.36.127.43:8080/${postId}/comments`, {
        commentBody: Comment
      })
      .then(response => {
        console.log('Comment Created:', response.data);
        setComment("");
        retrieveComments();
      })
      .catch(error => {
        console.error('Failed to post comment:', error);
      });
  };

  const eraseComment = (commentId) => {
    axios
      .delete(`http://3.36.127.43:8080/${postId}/comments/${commentId}`, {})
      .then(response => {
        console.log('Comment deleted successfully:', response.data);
        retrieveComments();
      })
      .catch(error => {
        console.log('Failed to delete comment:', error);
      });
  };

  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          <Postname>{Feed.imageName}</Postname>
          <Posttext>{Feed.imageText}</Posttext>
        </TextWrapper>
        <TextWrapper2>
          댓글 {commentN}개
        </TextWrapper2>
      </Wrapper>
      <Photo src={Feed.imageURL} />
      <CommentWrapper>
        <CommentInput
          type="text"
          placeholder="댓글작성.."
          value={Comment}
          onChange={handleChange}
        />
        <PostButton onClick={publishComment}>게시</PostButton>
      </CommentWrapper>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentText>
              <Name>익명 </Name>
              {comment.commentBody}
            </CommentText>
            <DeleteButton onClick={() => eraseComment(comment.id)}>삭제</DeleteButton>
          </CommentItem>
        ))}
      </CommentList>
    </Container>
  );
};

export default Post;
