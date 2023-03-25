import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function PostList({ posts }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDoctorComment = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const comments = response.data.comments;
      const isDoctorComment = Boolean(
        comments.filter((isDoctor) => isDoctor.writerResponse.doctor === true)
          .length
      );
      return isDoctorComment;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //fetchData() 함수가 useEffect() 훅의 의존성 배열에 있는 posts 값이 변경될 때마다 실행
      //posts?.data 값이 undefined일 경우에는 map() 메서드를 적용할 수 없기에 if (!posts?.data) return;를 넣어준다.
      if (!posts?.data) return;

      const result = await Promise.all(
        posts?.data?.map((item) => {
          return loadDoctorComment(item.postId).then((isDoctorComment) => ({
            ...item,
            isDoctorComment,
          }));
        })
      );
      setData(result);
    };

    fetchData();
  }, [posts]);

  return (
    <>
      {data.map((item) => {
        return (
          <PostListStyle key={item?.postId}>
            <li className="number">{item?.postId}</li>
            <li className="subject">{item?.medicalTagTitle}</li>
            <li className="doctor">
              {loading ? (
                <span>Loading...</span>
              ) : item.isDoctorComment ? (
                <FiUserCheck size={25} color={'#173ea1'} />
              ) : (
                <RxDotsHorizontal size={25} color={'#ff6947'} />
              )}
            </li>
            <li className="area" style={{ fontSize: '14px' }}>
              {item?.regionName}
            </li>
            <li className="title">
              {item.postType === 'question' ? (
                <Link
                  to={`question/${item?.postId}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <div>{item?.title}</div>
                </Link>
              ) : (
                <Link
                  to={`review/${item?.postId}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <div>{item?.title}</div>
                </Link>
              )}
            </li>
            <li className="time" style={{ fontSize: '14px' }}>
              {item?.createdAt && item.createdAt.slice(0, 10)}
            </li>
            <li className="type">
              {item?.postType === 'question' ? (
                <span className="question">질문</span>
              ) : (
                <span className="review">리뷰</span>
              )}
            </li>
            <li className="nickname">{item?.displayName}</li>
            <li className="like">{item?.totalLike}</li>
          </PostListStyle>
        );
      })}
    </>
  );
}

export default PostList;
