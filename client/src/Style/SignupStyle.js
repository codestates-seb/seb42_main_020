import styled from 'styled-components';

export const SMain = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

export const SLayout = styled.div`
  width: 450px;
  height: 800px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  box-shadow: 0 10px 3px 0 var(--gray-200);
  border-radius: 30px;
`;

export const SInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--gray-800);
  padding: 20px 0;
  img,
  h1,
  p {
    padding: 15px 0 0 0;
  }
  img {
    width: 50px;
  }
  h1 {
    font-family: 'TheJamsil5Bold';
    font-size: 32px;
  }
  p {
    font-family: 'TheJamsil';
    font-weight: 500;
  }
`;

export const SFormSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 0 10px 0px;
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 1rem;
  }
`;

export const SInput = styled.input`
  width: 98%;
  height: 2.5rem;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

export const STermSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0 10px 0;
`;

export const STerm = styled.div`
  padding: 10px 0;
  border-top: 1px solid var(--gray-300);
  div {
    padding: 5px 0;
  }
`;

export const SSubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
`;

export const SLoginInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 16px;
  }
  p {
    font-family: 'TheJamsil';
    font-weight: 400;
    font-size: 16px;
    color: var(--gray-800);
  }
`;

export const SLoginBtn = styled.button`
  width: 50%;
  height: 32px;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-200);
  border-radius: 3px;
  a {
    text-decoration: none;
    color: var(--black);
  }
  :hover {
    background-color: var(--blue-200);
  }
  cursor: pointer;
`;
