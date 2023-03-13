import styled from 'styled-components';

export const SReviewDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1000px;
  background-color: var(--blue-50);
`;

export const SReviewDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 30px 15px;
  width: 40%;
  background-color: white;
  border-radius: 3px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
`;

export const SReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  margin-bottom: 15px;

  // 추후에 img로 수정 예정
  > span {
    width: 10%;
    margin-right: 10px;
  }
`;

export const SReviewUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  > span:first-child {
    margin-bottom: 8px;
    font-size: 20px;
  }

  > span:last-child {
    text-align: right;
    font-size: 13px;
    opacity: 0.6;
  }
`;

export const SReviewHospitalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-top: 1px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);

  > span:first-child {
    font-size: 23px;
  }
`;

export const SReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > p {
    font-size: 18px;
    margin-bottom: 50px;
  }
`;

export const SReviewButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    display: flex;
    width: 80%;
    justify-content: flex-end;

    > button {
      border: none;
      background-color: var(--peach-400);
      width: 25%;
      height: 30px;
    }

    > button:last-child {
      margin-left: 20px;
    }
  }
`;
