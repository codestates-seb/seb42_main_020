import { Link } from 'react-router-dom';
import { BsChevronCompactDown } from 'react-icons/bs';
import {
  SBackgroundLayout,
  SGradiant,
  STextInfoSection,
  SBtnSection,
  SNavigateBtnSection,
} from '../../Style/GreetingInfo';

const GreetingInfo = () => {
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
          <Link to="/home">커뮤니티</Link>
        </SBtnSection>
        <SNavigateBtnSection>
          <BsChevronCompactDown />
        </SNavigateBtnSection>
      </SBackgroundLayout>
    </>
  );
};

export default GreetingInfo;
