import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/posts').then((res) => setPosts(res.data));
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <PostListStyle key={post.number}>
            <li className="number">{post.number}</li>
            <li className="subject">{post.subject}</li>
            <li className="doctor">
              {post.doctor ? (
                <FiUserCheck size={25} color={'#173ea1'} />
              ) : (
                <RxDotsHorizontal size={25} color={'#ff6947'} />
              )}
            </li>
            <li className="area">{post.area}</li>
            <li className="title">
              <span>{post.title}</span>
            </li>
            <li className="time">{post.time}</li>
            <li className="type">
              {post.postType ? (
                <span className="question">{post.type}</span>
              ) : (
                <span className="review">{post.type}</span>
              )}
            </li>
            <li className="nickname">{post.nickname}</li>
            <li className="like">{post.like}</li>
          </PostListStyle>
        );
      })}
    </>
  );
}

export default PostList;
