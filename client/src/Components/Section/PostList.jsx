import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';

function PostList({ data }) {
  return (
    <>
      {data.map((ele) => {
        return (
          <PostListStyle key={ele.number}>
            <li className="number">{ele.number}</li>
            <li className="subject">{ele.subject}</li>
            <li className="doctor">
              {ele.doctor ? (
                <FiUserCheck size={25} color={'#173ea1'} />
              ) : (
                <RxDotsHorizontal size={25} color={'#ff6947'} />
              )}
            </li>
            <li className="area">{ele.area}</li>
            <li className="title">
              <span>{ele.title}</span>
            </li>
            <li className="time">{ele.time}</li>
            <li className="type">
              {ele.postType ? (
                <span className="question">{ele.type}</span>
              ) : (
                <span className="review">{ele.type}</span>
              )}
            </li>
            <li className="nickname">{ele.nickname}</li>
            <li className="like">{ele.like}</li>
          </PostListStyle>
        );
      })}
    </>
  );
}

export default PostList;
