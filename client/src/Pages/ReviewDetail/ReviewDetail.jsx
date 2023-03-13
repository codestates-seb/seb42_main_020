import { useState } from 'react';
import {
  SReviewDetailContainer,
  SReviewDetailBlock,
  SReviewHeader,
  SReviewUserInfo,
  SReviewHospitalInfo,
  SReviewContent,
  SReviewButtonBlock,
} from '../../Style/ReviewDetailStyle';

const ReviewDetail = () => {
  // 좋아요 상태관리
  const [like, setLike] = useState(false);

  // 버튼 클릭시 좋아요 넣기
  const likeHandler = () => {
    setLike((prev) => !prev);
  };

  return (
    <SReviewDetailContainer>
      <SReviewDetailBlock>
        <SReviewHeader className="review-header">
          <span>사진</span>
          <SReviewUserInfo className="review-info">
            <span>유저닉네임</span>
            <span>2023-03-11 12:30</span>
          </SReviewUserInfo>
        </SReviewHeader>
        <SReviewHospitalInfo className="hopital-info">
          <span>승민병원</span>
          <span>⭐⭐⭐⭐⭐ (5.0) 점</span>
        </SReviewHospitalInfo>
        <SReviewContent className="contents">
          <p>리뷰내용입니다. 어쩌구 저쩌구 그래서 정말 좋았어요~</p>
          <SReviewButtonBlock className="review-footer">
            <button onClick={likeHandler}>{like ? '❤️ 99' : '🖤'}</button>
            <div className="review-button">
              <button>삭 제</button>
              <button>신 고</button>
            </div>
          </SReviewButtonBlock>
        </SReviewContent>
      </SReviewDetailBlock>
    </SReviewDetailContainer>
  );
};

export default ReviewDetail;
