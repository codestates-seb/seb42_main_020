import styled from 'styled-components';

export const SModalLayout = styled.div`
  background-color: rgb(0 0 0 / 30%);
  position: fixed;
  top: 0;
  right: 0;
  width: 100% !important;
  height: 100%;
`;

export const SModal = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  position: fixed;
  width: 900px;
  height: 400px;
  top: 200px;
  left: 510px;
  background-color: var(--white);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 30px;
  position: relative;
  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 23px;
    color: var(--gray-800);
    text-align: right;
    cursor: pointer;
  }
`;

export const STitle = styled.h1`
  font-family: 'TheJamsil5Bold';
  font-size: 32px;
  color: var(--gray-800);
  margin: 30px 0;
  text-align: center;
`;

export const SFormSection = styled.div`
  width: 895px;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const SInputSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-300);
`;

export const SInput = styled.input`
  width: 335px;
  height: 45px;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

export const SSubmitBtn = styled.button`
  width: 200px;
  height: 40px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: var(--black);
  }
  :hover {
    background-color: var(--blue-300);
    border: 1px solid var(--blue-300);
  }
`;

export const Success = styled.div``;
