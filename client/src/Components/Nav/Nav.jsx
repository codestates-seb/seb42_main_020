import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
import LocationButton from './LocationButton';
import TypeButton from './TypeButton';
import { Link } from 'react-router-dom';

const Nav = ({ isOpenNav, setIsOpenNav }) => {
  return (
    <SNavContainer>
      <SNavBlock>
        <Link to="/home" onClick={() => setIsOpenNav(() => !isOpenNav)}>
          <SNavContents>전체 </SNavContents>
        </Link>
        <Link
          to="/home/question"
          onClick={() => setIsOpenNav(() => !isOpenNav)}
        >
          <SNavContents>질문 </SNavContents>
        </Link>
        <Link to="/home/review" onClick={() => setIsOpenNav(() => !isOpenNav)}>
          <SNavContents>리뷰 </SNavContents>
        </Link>
        <LocationButton isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
        <TypeButton isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} />
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
