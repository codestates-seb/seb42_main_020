import styled from 'styled-components';

export const SAskQuestionContainer = styled.div`
  font-family: 'TheJamsil5Bold';
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 1000vh;
  background-color: var(--blue-200);

  .modal_wrapper {
    position: fixed;
    bottom: 60px;
    right: 100px;
  }
`;

export const SAskQuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 50px;
  padding: 15px 20px 40px 20px;
  width: 45%;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 1px 3px 0 var(--gray-400);

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

export const SHospitalInfoBlock = styled.div`
  display: flex;
  width: 100%;
  > div:first-child {
    margin-right: 15px;
  }
`;

export const SHospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  > span {
    margin-bottom: 15px;
  }

  > div:first-child {
    margin-bottom: 15px;
  }

  .input_info {
    font-size: 13px;
    opacity: 0.6;
    margin-left: 15px;
    font-style: italic;
  }
`;

export const SStarRateBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

export const SValidFail = styled.span`
  color: red;
  margin-top: 8px;
  font-size: 13px;
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

export const SOpenModal = styled.div`
  width: 500px;
  height: 500px;
  background-color: red;
`;
