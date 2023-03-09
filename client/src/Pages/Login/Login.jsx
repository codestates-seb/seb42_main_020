import styled from 'styled-components';

const SMain = styled.main``;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SInfoSection = styled.div``;

const SFormSection = styled.div``;

const SInput = styled.input``;

const SSubmitBtn = styled.button``;

const SGoogleLoginBtn = styled.button``;

const SSignupInfo = styled.div`
  border: 1px soild black;
`;

const SSignupBtn = styled.button``;

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
