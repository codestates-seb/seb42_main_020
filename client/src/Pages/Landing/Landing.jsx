import { useScrollFadeIn } from '../../util/useScrollFadeIn';
import GreetingInfo from '../../Components/Landing/GreetingInfo';
import ServiceInfo from '../../Components/Landing/ServiceInfo';
import { Link } from 'react-router-dom';
import {
  SOfferInfoLayout,
  SGradiant,
  SOfferSection,
  SOfferInfo,
  SOfferTitle,
  SOfferSub,
  SOfferBtn,
} from '../../Style/OfferInfoStyle';
const Landing = () => {
  // 클릭 시 스크롤 이동
  const scrollToDown = () => {
    const location = document.querySelector('.scrollpoint').offsetTop;
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
          <SOfferSection {...useScrollFadeIn('up', 1, 0)}>
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
          <SOfferSection {...useScrollFadeIn('up', 1, 0)}>
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
          <SOfferSection {...useScrollFadeIn('up', 1, 0)}>
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
