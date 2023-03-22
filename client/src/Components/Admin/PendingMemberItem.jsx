import {
  SItemListLayout,
  SListTitle,
  SItemList,
  SItemListSubTitle,
  SItemScrollSection,
} from '../../Style/AdminStyle';

const PendingMemberItem = ({ pendingMemberList }) => {
  return (
    <SItemListLayout>
      <SListTitle>승인 대기 의사 회원</SListTitle>
      <SItemListSubTitle>
        <span>Id</span>
        <span>성명</span>
        <span>병원명</span>
      </SItemListSubTitle>
      <SItemScrollSection>
        {pendingMemberList.pendingMemberResponses?.map((el) => (
          <SItemList key={el.memberId}>
            <span>{el.memberId}</span>
            <span>{el.name}</span>
            <span>{el.hospitalName}</span>
          </SItemList>
        ))}
      </SItemScrollSection>
    </SItemListLayout>
  );
};
export default PendingMemberItem;
