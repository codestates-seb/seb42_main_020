import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
  return (
    <>
      {posts?.data?.map((item) => {
        return (
          <PostListStyle key={item?.postId}>
            <li className="number">{item?.postId}</li>
            <li className="subject">{item?.medicalTagTitle}</li>
            <li className="doctor">
              {item?.doctor ? (
                <FiUserCheck size={25} color={'#173ea1'} />
              ) : (
                <RxDotsHorizontal size={25} color={'#ff6947'} />
              )}
            </li>
            <li className="area" style={{ fontSize: '14px' }}>
              {item?.regionName}
            </li>
            <li className="title">
              <Link
                to={`question/${item?.postId}`}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <div>{item?.title}</div>
              </Link>
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
