import styled, { keyframes } from 'styled-components';

const beat = keyframes`	to { transform: scale(1.4); }`;

export const SQuestionDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 1000px;
  height: 100%;
  background-color: var(--blue-50);
  padding-top: 20px;
  * {
    font-weight: 500;
  }

  button {
    cursor: pointer;
    color: var(--gray-900);
    height: 30px;
    border: none;
    border-radius: 3px;
    font-weight: 600;
  }

  > div {
    box-shadow: 3px 2px 3px 2px var(--gray-200);
  }

  .normal-answer {
    border-top: 5px solid #00663b;
  }

  .expert-answer {
    border-top: 5px solid #178ca1;
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
    font-family: 'TheJamsil5Bold';
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
  font-family: 'TheJamsil5Bold';
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  padding-top: 15px;
  font-size: 17px;
  border-top: 1px solid var(--gray-200);

  > span:last-child {
    font-size: 13px;
    opacity: 0.7;
  }
`;

export const SQuestionTextBlock = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 30px;
  line-height: 30px;
  color: var(--gray-800);
`;

export const SQuestionButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  align-items: center;

  > button:first-child {
    display: flex;
    align-items: center;
    width: 10%;
    font-size: 20px;
    background-color: white;

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

    > button:first-child {
      width: 20%;
      background-color: var(--blue-200);
      &:hover {
        background-color: var(--mint-200);
      }
    }

    > button:last-child {
      width: 20%;
      margin-left: 20px;
      background-color: var(--peach-200);
      &:hover {
        background-color: var(--peach-400);
      }
    }
  }

  button {
    width: 15%;
    background-color: var(--blue-200);
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
    font-family: 'TheJamsil5Bold';
    font-size: 20px;
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
    font-family: 'TheJamsil5Bold';
    font-size: 20px;
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
    font-family: 'TheJamsil5Bold';
    font-size: 20px;
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
    font-family: 'TheJamsil5Bold';
    width: 100%;
    font-size: 18px;
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
