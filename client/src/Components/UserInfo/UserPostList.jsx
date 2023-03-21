import UserPostListStyle from '../../Style/UserPostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';

function UserPostList({ posts }) {
  console.log(posts);
  return (
    <>
      {posts?.postResponseMyPageInfos?.map((item) => {
        return (
          <UserPostListStyle key={item?.postId}>
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
              <span>{item?.title}</span>
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
          </UserPostListStyle>
        );
      })}
    </>
  );
}

export default UserPostList;
