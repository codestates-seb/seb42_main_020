import styled from 'styled-components';

export const SHeader = styled.header`
  font-family: 'TheJamsil5Bold';
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
`;

export const SLayout = styled.div`
  .layout-div {
    display: flex;
    flex-direction: row;
  }
  width: 80%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SLogo = styled.div`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--gray-900);
  }
  img {
    width: 45px;
    padding: 0 16px 0 0;
  }
  span {
    font-size: 22px;
    margin: 5px 0 0 0;
  }
`;

export const SNav = styled.nav`
  padding: 16px 32px !important;
  text-decoration: none;
  padding: 16px;
  font-family: 'TheJamsil';
  font-weight: 600;
  font-size: 16px;
  color: var(--blue-600);
  cursor: pointer;
  :hover {
    color: var(--blue-400);
  }
`;

export const SLogin = styled.div`
  padding: 16px 16px;
  button {
    width: 100px;
    height: 40px;
    border: 2px solid var(--gray-200);
    border-radius: 10px;
    background-color: var(--white);
    box-shadow: 0 2px 3px 0 var(--gray-200);
    cursor: pointer;
    a {
      text-decoration: none;
      color: var(--gray-700);
      font-size: 15px;
      font-weight: 600;
    }
    :hover {
      background-color: var(--mint-100);
    }
  }
`;

export const SPrivateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SNotification = styled.div`
  svg {
    font-size: 25px;
    padding: 0 16px 0 0;
  }
  sup {
    top: -10px !important;
    left: 20px;
  }
`;

export const SMyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SLogout = styled.div`
  padding: 0 16px;
  button {
    width: 100px;
    height: 40px;
    border: 2px solid var(--gray-200);
    border-radius: 10px;
    background-color: var(--white);
    color: var(--gray-700);
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 2px 3px 0 var(--gray-200);
    cursor: pointer;
    :hover {
      background-color: var(--mint-100);
    }
  }
`;
