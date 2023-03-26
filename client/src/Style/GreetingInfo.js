import styled, { keyframes } from 'styled-components';

const landingTitle = `${process.env.PUBLIC_URL}/images/landing-title.jpg`;

export const SBackgroundLayout = styled.div`
  width: 100vw;
  height: 900px;
  background-image: url(${landingTitle});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  * {
    text-decoration: none;
  }
  @media only screen and (max-width: 500px) {
    background-image: url(${landingTitle});
    background-size: contain;
    height: 290px;
  }
`;

export const SGradiant = styled.div`
  width: 100vw;
  height: 180px;
  background: linear-gradient(180deg, var(--white), rgb(255 255 255 / 9%));
  position: absolute;
  @media only screen and (max-width: 500px) {
    display: none;
  }
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
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 50px;
    color: var(--gray-900);
    margin: 0 0 0 0;
    h1 {
      font-size: 35px;
      font-weight: 500;
      padding-bottom: 25px;
    }
    h2 {
      font-size: 15px;
      font-weight: 500;
      padding-bottom: 40px;
    }
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
  @media only screen and (max-width: 500px) {
    top: -90px;
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
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;
