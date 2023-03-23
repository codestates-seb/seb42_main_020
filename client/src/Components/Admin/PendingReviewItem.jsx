import {
  SItemListLayout,
  SListTitle,
  SItemList,
  SItemListSubTitle,
  SItemScrollSection,
} from '../../Style/AdminStyle';
const PendingReviewItem = ({ pendingReviewList }) => {
  return (
    <SItemListLayout>
      <SListTitle>승인 대기 리뷰 게시물</SListTitle>
      <SItemListSubTitle>
        <span>Id</span>
        <span>병원명</span>
        <span>제목</span>
        <span>내용</span>
      </SItemListSubTitle>
      <SItemScrollSection>
        {pendingReviewList.pendingReviewResponses?.map((el) => (
          <SItemList key={el.postId}>
            <span>{el.postId}</span>
            <span>{el.hospitalName}</span>
            <span>{el.title}</span>
            <span>{el.content}</span>
          </SItemList>
        ))}
      </SItemScrollSection>
    </SItemListLayout>
  );
};
export default PendingReviewItem;
