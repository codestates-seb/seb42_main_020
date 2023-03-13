import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';

function PostList({ data }) {
  return (
    <>
      {data.map((data) => {
        return (
          <PostListStyle key={data.number}>
            <li className="number">{data.number}</li>
            <li className="subject">{data.subject}</li>
            <li className="doctor">
              {data.doctor ? (
                <FiUserCheck size={25} color={'#173ea1'} />
              ) : (
                <RxDotsHorizontal size={25} color={'#ff6947'} />
              )}
            </li>
            <li className="area">{data.area}</li>
            <li className="title">
              <span>{data.title}</span>
            </li>
            <li className="time">{data.time}</li>
            <li className="type">
              {data.postType ? (
                <span className="question">{data.type}</span>
              ) : (
                <span className="review">{data.type}</span>
              )}
            </li>
            <li className="nickname">{data.nickname}</li>
            <li className="like">{data.like}</li>
          </PostListStyle>
        );
      })}
    </>
  );
}

export default PostList;
