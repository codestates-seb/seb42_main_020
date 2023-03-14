import styled, { keyframes } from 'styled-components';

export const SBackgroundLayout = styled.div`
  width: 100vw;
  height: 900px;
  background-image: url('images/landing-title.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  * {
    font-family: 'TheJamsil';
    text-decoration: none;
  }
`;

export const SGradiant = styled.div`
  width: 100vw;
  height: 180px;
  background: linear-gradient(180deg, var(--white), rgb(255 255 255 / 9%));
  position: absolute;
`;

export const STextInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 150px;
  color: var(--gray-900);
  h1 {
    font-size: 65px;
    font-weight: 500;
    padding-bottom: 40px;
  }
  h2 {
    font-size: 30px;
    font-weight: 500;
  }
`;

export const SBtnSection = styled.div`
  position: relative;
  top: -100px;
  a {
    margin: 10px;
    padding: 10px 30px;
    font-weight: 500;
    color: var(--white);
    background-color: rgba(0, 12, 30, 0.8);
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 12, 30, 0.5);
    }
  }
`;

export const motion = keyframes`
  0% {
    top:0px;
  }
  to {
    top:100px;
    height:90px
  } 
`;

export const SNavigateBtnSection = styled.div`
  height: 100px;
  font-size: 55px;
  cursor: pointer;
  svg {
    color: var(--gray-900);
    animation: ${motion} 0.5s linear 0s infinite alternate;
  }
`;