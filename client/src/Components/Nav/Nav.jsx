import { SNavContainer, SNavBlock, SNavContents } from '../../Style/NavStyle';
// import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <SNavContainer>
      <SNavBlock>
        <SNavContents>
          <a href="/all">전체</a>
        </SNavContents>
        <SNavContents>
          <a href="/questions">질문</a>
        </SNavContents>
        <SNavContents>
          <a href="/reviews">리뷰</a>
        </SNavContents>
        <SNavContents>
          <a href="/locations">지역별</a>
        </SNavContents>
        <SNavContents>
          <a href="/post">진료 과목</a>
        </SNavContents>
      </SNavBlock>
    </SNavContainer>
  );
};

export default Nav;
