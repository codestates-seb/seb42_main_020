import PostListStyle from '../../Style/PostListStyle';
import { RxDotsHorizontal } from 'react-icons/rx';
import { FiUserCheck } from 'react-icons/fi';

function PostList() {
  const isBlooean = true;
  const repeatTags = Array.from({ length: 20 }, (_, i) => (
    <PostListStyle key={i}>
      <li className="number">{i + 1}</li>
      <li className="subject">정신건강의학과</li>
      <li className="doctor">
        {isBlooean ? (
          <FiUserCheck size={25} color={'#173ea1'} />
        ) : (
          <RxDotsHorizontal size={25} color={'#ff6947'} />
        )}
      </li>
      <li className="area">경기도</li>
      <li className="title">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          quisquam?
        </span>
      </li>
      <li className="time">2023.03.09</li>
      <li className="type">
        {isBlooean ? (
          <span className="question">질문</span>
        ) : (
          <span className="review">리뷰</span>
        )}
      </li>
      <li className="nickname">개발새발자</li>
      <li className="like">{i + 193}</li>
    </PostListStyle>
  ));

  return repeatTags;
}

export default PostList;
