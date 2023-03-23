import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function UserPostList({ posts }) {
  console.log(posts);
  return (
    <>
      {posts?.postResponseMyPageInfos?.map((item) => {
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
                to={`${process.env.PUBLIC_URL}/home/question/${item?.postId}`}
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <div>{item?.title}</div>
              </Link>
            </li>
            <li className="time" style={{ fontSize: '12px' }}>
              {item?.createdAt && item.createdAt.slice(5, 10)}
            </li>
            <li className="type">
              {item?.postType === 'question' ? (
                <span className="question">질문</span>
              ) : (
                <span className="review">리뷰</span>
              )}
            </li>
            <li className="nickname" style={{ fontSize: '12px' }}>
              {posts?.displayName}
            </li>
            <li className="like">{item?.totalLike}</li>
          </PostListStyle>
        );
      })}
    </>
  );
}

export default UserPostList;
