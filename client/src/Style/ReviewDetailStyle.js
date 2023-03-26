import styled, { keyframes } from 'styled-components';

const beat = keyframes`	to { transform: scale(1.4); }`;

export const SReviewDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 1000px;
  height: 100%;
  background-color: var(--blue-50);

  * {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    height: 30px;
    border: none;
    border-radius: 3px;
  }
`;

export const SReviewDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 30px 15px;
  width: 40%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
  border-top: 3px solid var(--mint-600);
`;

export const SReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  > img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 15px;
  }
`;

export const SReviewUserInfo = styled.div`
  font-family: 'TheJamsil5Bold';

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
    font-family: 'TheJamsil5Bold';
    font-size: 20px;
  }
`;

export const SReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div:first-child {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

export const SReviewButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > button:first-child {
    display: flex;
    align-items: center;
    font-size: 20px;

    > svg {
      margin-right: 5px;
      color: var(--peach-600);
      font-size: 25px;
      &:hover {
        animation: ${beat} 0.5s infinite alternate;
        transform-origin: center;
      }
    }
  }

  > div {
    display: flex;
    width: 80%;
    justify-content: flex-end;

    > button {
      border: none;
      background-color: var(--peach-200);
      &:hover {
        background-color: var(--peach-400);
      }

      width: 25%;
      height: 30px;
    }
  }
  > button {
    font-size: 20px;
    border: none;
    background-color: white;
  }
`;

export const SReviewHeaderTitleBlock = styled.div`
  font-family: 'TheJamsil5Bold';
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 25px;
  margin-bottom: 15px;
  > svg {
    color: var(--blue-800);
  }
`;

export const SReviewInfoBlock = styled.div`
  font-family: 'TheJamsil5Bold';
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  padding-top: 15px;
  font-size: 20px;
  border-top: 1px solid var(--gray-200);

  > span:last-child {
    font-size: 13px;
    opacity: 0.7;
  }
`;
