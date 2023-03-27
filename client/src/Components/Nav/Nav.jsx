import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
import LocationButton from './LocationButton';
import TypeButton from './TypeButton';
import { Link } from 'react-router-dom';

const Nav = ({ isOpenNav, setIsOpenNav }) => {
  return (
    <SNavContainer>
      <SNavBlock>
        <SNavContents>
          <Link to="/home" onClick={() => setIsOpenNav(() => !isOpenNav)}>
            전체
          </Link>
        </SNavContents>
        <SNavContents>
          <Link
            to="/home/question"
            onClick={() => setIsOpenNav(() => !isOpenNav)}
          >
            질문
          </Link>
        </SNavContents>
        <SNavContents>
          <Link
            to="/home/review"
            onClick={() => setIsOpenNav(() => !isOpenNav)}
          >
            리뷰
          </Link>
        </SNavContents>
        <LocationButton isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
        <TypeButton isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
