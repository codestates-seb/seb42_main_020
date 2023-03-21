import styled from 'styled-components';

// Admin.jsx
export const SMain = styled.main`
  width: 1920px;
  height: 1330px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

export const SLayout = styled.div`
  width: 1500px;
  height: 1100px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  box-shadow: 0 10px 3px 0 var(--gray-200);
  border-radius: 30px;
  padding: 50px;
`;

export const STitle = styled.h1`
  font-family: 'TheJamsil5Bold';
  font-size: 32px;
  color: var(--gray-800);
  margin-bottom: 10px;
`;

export const SContent = styled.div`
  height: 170px;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SSubTitle = styled.h2`
  font-family: 'TheJamsil5Bold';
  font-size: 25px;
  margin-bottom: 10px;
  color: var(--gray-800);
  margin-bottom: 13px;
`;

export const SSubText = styled.h3`
  font-size: 17px;
  margin-bottom: 13px;
`;

export const SInput = styled.input`
  width: 200px;
  height: 25px;
  margin: 10px 10px 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

export const SSubmitBtn = styled.button`
  width: 120px;
  height: 25px;
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 15px;
  font-weight: 500;
  font-size: 16px;
  margin: 10px 0 0 0px;
  cursor: pointer;
  :hover {
    background-color: var(--blue-300);
    border: 1px solid var(--blue-300);
  }
`;

export const SCallBtn = styled(SSubmitBtn)`
  width: 240px;
  padding: 20px 0 !important;
`;

export const SForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SItemListSection = styled.div`
  width: 800px;
`;

export const SContentSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SCallBtnSection = styled.div`
  display: flex;
  justify-content: center;
`;

// PendingReviewItem.jsx
// PendingMemberItem.jsx

export const SItemListLayout = styled.div`
  height: 400px;
  margin: 50px 0 50px 0;
`;

export const SListTitle = styled.h3`
  font-family: 'TheJamsil5Bold';
  font-size: 25px;
  color: var(--gray-800);
  margin: 20px 0;
`;

export const SItemList = styled.div`
  margin: 10px;
  span {
    font-size: 18px;
    padding: 7px;
  }
`;

export const SItemListSubTitle = styled.h3`
  margin: 10px;
  span {
    font-size: 18px;
    font-weight: 700;
    padding: 7px;
  }
`;

export const SItemScrollSection = styled.div`
  overflow-y: scroll;
  white-space: nowrap;
  height: 350px;
`;
