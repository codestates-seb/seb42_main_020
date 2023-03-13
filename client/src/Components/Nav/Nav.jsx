import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <SNavContainer>
      <SNavBlock>
        <SNavContents>
          {/* // 자세한 링크는 수정 예정 */}
          <Link to="/">전체</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/askquestion">질문</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/review">리뷰</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/locations">지역별</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/type">진료 과목</Link>
        </SNavContents>
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
