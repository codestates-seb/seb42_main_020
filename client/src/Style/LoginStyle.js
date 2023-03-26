import styled from 'styled-components';

export const SMain = styled.main`
  width: 1920px;
  height: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

export const SLayout = styled.div`
  width: 500px;
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
    padding: 10px 0 0 0;
  }
  img {
    width: 50px;
  }
  h1 {
    font-family: 'TheJamsil5Bold';
    font-size: 32px;
  }
  p {
    font-weight: 500;
  }
`;

export const SFormSection = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  div {
    border-bottom: 1px solid var(--gray-300);
  }
  button {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const SInput = styled.input`
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

export const SSubmitBtn = styled.button`
  width: 100%;
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
`;

export const SGoogleLoginBtn = styled(SSubmitBtn)`
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  svg {
    font-size: 25px;
    margin: 0 5px 0 0;
  }
`;

export const SSignupInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
  button {
    font-weight: 500;
    font-size: 16px;
    :hover {
      background-color: var(--blue-200);
    }
  }
  p {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray-800);
  }
  div {
    width: 400px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const SSignupBtn = styled(SSubmitBtn)`
  width: 50%;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
`;

export const SModalLayout = styled.div`
  background-color: rgb(0 0 0 / 30%);
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

export const SModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  width: 50vw;
  height: 45vh;
  top: 25vh;
  right: 25vw;
  background-color: var(--white);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 30px;
`;

export const SModalInfoSection = styled.div`
  height: 20%;
  padding: 0 25px;
  margin: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  svg {
    margin-top: 16px;
    font-size: 1.5rem;
    cursor: pointer;
    :hover {
      background-color: var(--gray-200);
      border-radius: 5px;
    }
  }
`;

export const SModalBtnSection = styled.div`
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SModalInfo = styled.div`
  p {
    margin: 16px 0 0 0;
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

export const SModalSignupBtn = styled.button`
  width: 20rem;
  height: 10rem;
  font-family: TheJamsil;
  font-weight: 600;
  font-size: 22px !important;
  margin: 0 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 3px 3px 1px var(--gray-400);
  a {
    text-decoration: none;
    color: var(--gray-800);
  }
  :hover {
    background-color: var(--mint-100);
    border: inset;
  }
  cursor: pointer;
`;
