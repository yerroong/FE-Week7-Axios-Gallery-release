import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const Photo = styled.img`
  width: 810px;
  height: 810px;
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
  //border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  //border: 2px solid red;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextWrapper = styled.div`
  //border: 2px solid black;
  display: block;
`;

const TextWrapper2 = styled.div`
 // border: 2px solid black;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const PostCommentWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  //border: 2px solid black;
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
  //border: 2px solid black;
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
  const [Comments, setComments] = useState("");
  const [commentNum, setCommentNum] = useState(0);
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
          navigate("*");  // 이미지가 없는경우
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("*");  // 오류가 발생하는경우
      });
  }, [postId, navigate]);

  const fetchComments = () => {
    axios
      .get(`http://3.36.127.43:8080/${postId}/comments`)
      .then((res) => {
        const sortedComments = res.data.reverse(); // 최신순으로 정렬
        setCommentList(sortedComments);
        setCommentNum(sortedComments.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleComments = event => {
    setComments(event.target.value);
  };

  const postComment = () => {
    if (Comments === "") {
      return;
    }
    axios
      .post(`http://3.36.127.43:8080/${postId}/comments`, {
        commentBody: Comments
      })
      .then(response => {
        console.log('Comment Created:', response.data);
        setComments("");
        fetchComments(); // 댓글 작성 후 다시 댓글 목록 가져오기
      })
      .catch(error => {
        console.error('Failed to post comment:', error);
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://3.36.127.43:8080/${postId}/comments/${commentId}`, {})
      .then(response => {
        console.log('Comment deleted successfully:', response.data);
        fetchComments();
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
          댓글 {commentNum}개
        </TextWrapper2>
      </Wrapper>
      <Photo src={Feed.imageURL} />
      <PostCommentWrapper>
        <CommentInput
          type="text"
          placeholder="댓글작성.."
          value={Comments}
          onChange={handleComments}
        />
        <PostButton onClick={postComment}>게시</PostButton>
      </PostCommentWrapper>
      <CommentList>
        {commentList.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentText>
              <Name>익명 </Name>
              {comment.commentBody}
            </CommentText>
            <DeleteButton onClick={() => deleteComment(comment.id)}>삭제</DeleteButton>
          </CommentItem>
        ))}
      </CommentList>
    </Container>
  );
};

export default Post;