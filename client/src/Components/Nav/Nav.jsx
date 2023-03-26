import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
import LocationButton from './LocationButton';
import TypeButton from './TypeButton';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <SNavContainer>
      <SNavBlock>
        <SNavContents>
          <Link to="/home">전체</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/home/question">질문</Link>
        </SNavContents>
        <SNavContents>
          <Link to="/home/review">리뷰</Link>
        </SNavContents>
        <LocationButton />
        <TypeButton />
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
