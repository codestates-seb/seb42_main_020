import GreetingInfo from '../../Components/Landing/GreetingInfo';
import ServiceInfo from '../../Components/Landing/ServiceInfo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SOfferInfoLayout = styled.div`
  width: 100vw;
  background-color: var(--gray-700);
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const SGradiant = styled.div`
  width: 100vw;
  height: 150px;
  background: linear-gradient(360deg, var(--gray-900), rgb(255 255 255 / 0%));
`;

const SOfferSection = styled.div``;

const SOfferInfo = styled.div`
  width: 230px;
  height: 225px;
  margin: 90px 80px 0px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SOfferTitle = styled.h1`
  line-height: 40px;
  color: var(--white);
  font-weight: 600;
  font-size: 30px;
  margin: 0 0 20px 0;
`;

const SOfferSub = styled.h2`
  line-height: 30px;
  color: var(--gray-200);
  font-weight: 500;
  font-size: 18px;
`;

const SOfferBtn = styled.div`
  margin: 30px 0 0 0;
  a {
    padding: 10px 30px;
    font-weight: 500;
    text-decoration: none;
    color: var(--white);
    background-color: rgba(0, 12, 30, 0.8);
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 12, 30, 0.5);
    }
  }
`;

const Landing = () => {
  // 클릭 시 스크롤 이동
  const scrollToDown = () => {
    let location = document.querySelector('.scrollpoint').offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };
  return (
    <>
      <GreetingInfo scrollToDown={scrollToDown} />
      <div className="scrollpoint">
        <ServiceInfo />
      </div>
      <SOfferInfoLayout>
        <div>
          <SOfferSection>
            <SOfferInfo>
              <SOfferTitle>질문하기</SOfferTitle>
              <SOfferSub>
                같은 고민을 가진 사람들과
                <br /> 댓글로 소통하고 정보를
                <br /> 나누세요
              </SOfferSub>
              <SOfferBtn>
                <Link to="/">질문하기</Link>
              </SOfferBtn>
            </SOfferInfo>
          </SOfferSection>
          <SOfferSection>
            <SOfferInfo>
              <SOfferTitle>리뷰 작성하기</SOfferTitle>
              <SOfferSub>
                다나아의 클린 리뷰 시스템을 통해 방문 인증된 리뷰를
                <br /> 찾아보세요
              </SOfferSub>
              <SOfferBtn>
                <Link to="/">리뷰 쓰기</Link>
              </SOfferBtn>
            </SOfferInfo>
          </SOfferSection>
          <SOfferSection>
            <SOfferInfo>
              <SOfferTitle>의료인 회원가입</SOfferTitle>
              <SOfferSub>
                지역 고객들과 직접 소통하며 의료 지식을 나눠 주세요.
                <br /> 지금 바로 병원 관리를
                <br /> 시작해 보세요.
              </SOfferSub>
              <SOfferBtn>
                <Link to="/">회원가입</Link>
              </SOfferBtn>
            </SOfferInfo>
          </SOfferSection>
        </div>
        <SGradiant />
      </SOfferInfoLayout>
    </>
  );
};

export default Landing;
