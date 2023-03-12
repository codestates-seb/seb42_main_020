import styled from 'styled-components';

export const SQuestionDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1000px;
  background-color: gray;
  padding-top: 20px;
`;

export const SQuestionDetailBlock = styled.div`
  background-color: white;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 3px;
`;

export const SQuestionHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;

  h1 {
    font-size: 30px;
    margin-bottom: 15px;
  }
`;

export const SQuestionInfoBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 15px;
`;

export const SQuestionTextBlock = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 15px;
`;

export const SQuestionButtonBlock = styled.div`
  display: felx;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px;

  button:last-child {
    margin-left: 20px;
  }
`;

export const SPostAnswerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  height: 60px;
  padding: 15px;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 3px;

  > span {
    width: 15%;
  }

  > div {
    width: 60%;
  }

  > button {
    width: 15%;
    height: 30px;
    border: none;
    background-color: var(--blue-200);
    border-radius: 3px;
    color: #636e72;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  span {
    font-size: 13px;
    opacity: 0.7;
  }
`;

export const SAnswerBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: white;
  padding: 15px;
  border-top: 5px solid var(--mint-500);
  border-radius: 3px;

  > h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
`;

export const SAnswerInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
`;

export const SAnswerUserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span:first-child {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 15px;
  }

  > span:last-child {
    width: 100%;
    font-size: 13px;
    opacity: 0.6;
    text-align: left;
  }
`;

export const SAnswerButtonBlock = styled.div`
  display: felx;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px;

  button:last-child {
    margin-left: 20px;
  }
`;
