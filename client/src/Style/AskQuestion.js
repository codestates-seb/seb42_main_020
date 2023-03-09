import styled from 'styled-components';

export const SAskQuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SAskQuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 50px;
  padding: 15px 20px;
  width: 45%;
  border-radius: 5px;

  > span {
    width: 100%;
    text-align: left;
    margin-bottom: 20px;
  }
`;

export const STitle = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const SAskTitle = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 2px solid #636e72;
  margin-bottom: 30px;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

export const SAskQuestionInfoBlock = styled.div`
  display: flex;
  width: 100%;

  div {
    width: 100%;
    margin: 15px 0px;
  }

  div:first-child {
    margin-right: 10px;
  }
  input {
    margin-top: 15px;
  }

  label {
    font-size: 20px;
  }
`;

export const SAskQuestionInfo = styled.input`
  box-sizing: border-box;
  width: 40%;
  height: 20px;
  border: none;
  border-bottom: 2px solid #636e72;
  margin-bottom: 30px;
  font-size: 15px;
`;

export const SButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 15px;

  button {
    font-weight: bold;
    color: #636e72;
    border: none;
    border-radius: 5px;
  }
`;

export const SSubmitButton = styled.button`
  background-color: var(--mint-400);
  width: 80px;
  height: 50px;
`;

export const SCancalButton = styled.button`
  background-color: var(--peach-400);
  width: 80px;
  height: 50px;
  margin-right: 20px;
`;
