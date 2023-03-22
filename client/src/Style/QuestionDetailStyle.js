import styled, { keyframes } from 'styled-components';

const beat = keyframes`	to { transform: scale(1.4); }`;

export const SQuestionDetailContainer = styled.div`
  font-family: 'TheJamsil5Bold';
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1000px;
  background-color: var(--blue-50);
  padding-top: 20px;

  button {
    font-family: 'TheJamsil5Bold';
    cursor: pointer;
    color: black;
    height: 30px;
    border: none;
    border-radius: 3px;
  }

  > div {
    box-shadow: 3px 2px 3px 2px var(--gray-200);
  }

  .normal-answer {
    border-top: 5px solid var(--blue-600);
  }

  .expert-answer {
    border-top: 5px solid var(--mint-400);
  }
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
    margin-left: 10px;
  }
`;

export const SQuestionHeaderTitleBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  margin-bottom: 15px;
  > svg {
    color: var(--blue-800);
  }
`;

export const SQuestionInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--gray-200);

  > span:last-child {
    font-size: 13px;
    opacity: 0.7;
  }
`;

export const SQuestionTextBlock = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 15px;
`;

export const SQuestionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 15px;

  button {
    width: 15%;
    background-color: var(--blue-200);
  }

  button:first-child {
    background-color: var(--blue-200);
    &:hover {
      background-color: var(--mint-200);
    }
  }

  button:last-child {
    margin-left: 20px;
    background-color: var(--peach-200);
    &:hover {
      background-color: var(--peach-400);
    }
  }
`;

export const SQuestionLikeButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0px;

  button {
    background-color: white;
  }
  button:first-child {
    display: flex;
    align-items: center;
    width: 10%;
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

  button:last-child {
    width: 15%;
    background-color: var(--peach-200);
    &:hover {
      background-color: var(--peach-400);
    }
  }
`;

export const SAnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-left: 8px;
  }

  button {
    width: 15%;
  }

  button:first-child {
    background-color: var(--mint-400);
  }

  button:last-child {
    margin-left: 20px;
    background-color: var(--blue-200);

    &:hover {
      background-color: var(--mint-200);
    }
  }
`;

export const SAnswerHeaderTitleBlock = styled.div`
  display: flex;
  align-items: center;

  > svg {
    color: var(--blue-800);
    font-size: 20px;
  }
  > div {
    width: 80%;
    text-align: right;
  }
`;

export const SAnswerProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
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
    background-color: var(--blue-200);
    &:hover {
      background-color: var(--mint-200);
    }
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
  margin-bottom: 20px;
  border-radius: 3px;

  > h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  > span {
    font-size: 20px;
    color: var(--peach-600);
    padding-bottom: 15px;
    margin-bottom: 15px;
    font-style: italic;
    border-bottom: 3px solid var(--peach-200);
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;

  > button {
    display: flex;
    align-items: center;
    background-color: white;
    width: 10%;
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
    width: 80%;
    display: flex;
    justify-content: flex-end;

    > button {
      width: 17%;
      background-color: var(--blue-200);

      &:hover {
        background-color: var(--mint-200);
      }
    }

    > button:last-child {
      margin: 0px 10px;
      background-color: var(--peach-200);
      &:hover {
        background-color: var(--peach-400);
      }
    }
  }
`;
