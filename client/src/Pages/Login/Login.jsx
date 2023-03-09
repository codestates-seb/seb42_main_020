import styled from 'styled-components';

const SMain = styled.main`
  @font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2')
      format('woff2');
  }
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--blue-50);
`;

const SLayout = styled.div`
  /* border: 1px solid black; */
  width: 25vw;
  height: 70vh;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  box-shadow: 0 10px 3px 0 var(--gray-200);
  border-radius: 30px;
`;

const SInfoSection = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--gray-800);
  padding: 20px 0;
  img,
  h1,
  p {
    padding: 10px 0 0 0;
  }
  img {
    width: 3rem;
  }
  h1 {
    font-family: 'TheJamsil5Bold';
    font-size: 2rem;
  }
  p {
    font-family: 'TheJamsil';
    font-weight: 500;
  }
`;

const SFormSection = styled.div`
  /* border: 1px solid black; */
  width: 80%;
  display: flex;
  flex-direction: column;
  div {
    border-bottom: 1px solid var(--gray-300);
  }
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 1rem;
  }
`;

const SInput = styled.input`
  height: 2.5rem;
  margin: 10px 0;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 var(--gray-200);
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const SSubmitBtn = styled.button`
  width: 100%;
  height: 2.8rem;
  margin: 20px 0;
  background-color: var(--blue-200);
  border: 1px solid var(--blue-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
  border-radius: 3px;
  cursor: pointer;
`;

const SGoogleLoginBtn = styled(SSubmitBtn)`
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
`;

const SSignupInfo = styled.div`
  /* border: 1px solid black; */
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  button {
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 1rem;
  }
`;

const SSignupBtn = styled(SSubmitBtn)`
  width: 50%;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
`;

function Login() {
  return (
    <SMain>
      <SLayout>
        <SInfoSection>
          <img src="images/logo.png" alt="logo" />
          <h1>로그인</h1>
          <p>로그인으로 다나아의 다양한 서비스를 경험해 보세요</p>
        </SInfoSection>
        <SFormSection>
          <SInput placeholder="이메일" />
          <SInput placeholder="비밀번호" />
          <div>
            {/* <Link to="/index.html"> */}
            <SSubmitBtn>로그인</SSubmitBtn>
            {/* </Link> */}
          </div>
          <SGoogleLoginBtn>
            <span>구글로 시작하기</span>
          </SGoogleLoginBtn>
        </SFormSection>
        <SSignupInfo>
          <p>다나아 시작하기</p>
          <SSignupBtn>회원 가입</SSignupBtn>
        </SSignupInfo>
      </SLayout>
    </SMain>
  );
}

export default Login;
