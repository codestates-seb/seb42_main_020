import { useState } from 'react';
import styled from 'styled-components';
import { Button, Popover, Avatar, Badge, Menu } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const SHeader = styled.header`
  @font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2')
      format('woff2');
  }
  font-family: 'TheJamsil5Bold';
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px 0 var(--gray-200);
`;

const SLayout = styled.div`
  .layout-div {
    display: flex;
    flex-direction: row;
  }
  width: 80%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 3rem;
    padding: 0 1rem 0 0;
  }
  span {
    font-size: 1.4rem;
    margin: 5px 0 0 0;
  }
`;

const SNav = styled.nav`
  padding: 0 2rem;
  ul > a {
    padding: 1rem;
    font-family: 'TheJamsil';
    font-weight: 500;
    font-size: 1rem;
  }
`;

const SLogin = styled.div`
  padding: 1rem 1rem;
  button {
    background-color: var(--blue-600);
    color: var(--white);
  }
`;

const SPrivateContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SNotification = styled.div`
  svg {
    font-size: 1.5rem;
    padding: 0 1rem 0 0;
  }
  sup {
    top: -10px !important;
    left: 20px;
  }
`;

const SMyInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SLogout = styled.div`
  padding: 0 1rem;
  button {
    background-color: var(--blue-600);
    color: var(--white);
  }
`;

function Header() {
  const [isLogged, setIsLogged] = useState(false); // 로그인 여부
  const [isNoticed, setIsNoticed] = useState(true); // 답변 알림 유무

  console.log(setIsNoticed);

  const modeHandler = () => {
    setIsLogged(!isLogged);
  };

  return (
    <>
      <SHeader>
        <SLayout>
          <div className="layout-div">
            <SLogo>
              <img src="images/logo.png" alt="logo" />
              <span>다나아</span>
            </SLogo>
            <SNav>
              <Menu selectedKeys={'alipay'} mode="horizontal">
                <a href={'/category'} target="_blank" rel="noopener noreferrer">
                  커뮤니티
                </a>
              </Menu>
            </SNav>
          </div>
          <div>
            {!isLogged ? (
              <div>
                <SLogin>
                  <Button type="primary" size="middle">
                    Log in
                  </Button>
                </SLogin>
              </div>
            ) : (
              <SPrivateContent>
                <SMyInfo>
                  <SNotification>
                    {!isNoticed ? null : <Badge dot />}
                    <BellOutlined />
                  </SNotification>
                  <Popover
                    title="김원필 님, 안녕하세요"
                    content={<a href="/myinfo">마이 페이지</a>}
                  >
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Popover>
                </SMyInfo>
                <SLogout>
                  <Button type="primary" size="middle">
                    Log out
                  </Button>
                </SLogout>
              </SPrivateContent>
            )}
          </div>
        </SLayout>
      </SHeader>
      <button onClick={modeHandler}>❤️</button>
    </>
  );
}

export default Header;
