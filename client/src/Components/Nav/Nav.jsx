import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
import LocationButton from './LocationButton';
import TypeButton from './TypeButton';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <SNavContainer>
      <SNavBlock>
        <SNavContents>
          {/* // 자세한 링크는 수정 예정 */}
          <Link to="/home">전체</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/home">질문</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/home">리뷰</Link>
        </SNavContents>
        <LocationButton />
        <TypeButton />
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
