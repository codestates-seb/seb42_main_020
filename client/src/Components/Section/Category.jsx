import PostCategoryStyle from '../../Style/PostCategoryStyle';

function Category({ topicName }) {
  return (
    <PostCategoryStyle>
      <li className="number">No.</li>
      <li className="subject">진료과목</li>
      {topicName !== '리뷰' ? <li className="doctor">전문의 답변</li> : null}
      <li className="area">지역</li>
      <li className="title">Title</li>
      <li className="time">작성일</li>
      <li className="type">유형</li>
      <li className="nickname">닉네임</li>
      <li className="like">추천</li>
    </PostCategoryStyle>
  );
}

export default Category;
