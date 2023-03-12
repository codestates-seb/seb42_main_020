import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { BsChevronCompactDown } from 'react-icons/bs';

const SBackgroundLayout = styled.div`
  width: 1920px;
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

const SGradiant = styled.div`
  width: 1920px;
  height: 180px;
  background: linear-gradient(180deg, var(--white), rgb(255 255 255 / 9%));
  position: absolute;
`;

const STextInfoSection = styled.div`
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

const SBtnSection = styled.div`
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
      background-color: rgba(0, 12, 30, 0.5);
    }
  }
`;

const motion = keyframes`
  0% {
    top:0px;
  }
  to {
    top:100px;
    height:90px
  } 
`;

const SNavigateBtnSection = styled.div`
  height: 100px;
  font-size: 55px;
  svg {
    color: var(--gray-900);
    animation: ${motion} 0.5s linear 0s infinite alternate;
  }
`;

const Landing = () => {
  return (
    <>
      <SBackgroundLayout>
        <SGradiant />
        <STextInfoSection>
          <h1>건강 고민은 다나아에서</h1>
          <h2>
            건강 고민, 다나아 커뮤니티에 남기고 의학 전문가의 답변을 받아보세요!
          </h2>
        </STextInfoSection>
        <SBtnSection>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </SBtnSection>
        <SNavigateBtnSection>
          <BsChevronCompactDown />
        </SNavigateBtnSection>
      </SBackgroundLayout>
    </>
  );
};

export default Landing;
