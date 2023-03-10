import { useState } from 'react';
import styled from 'styled-components';
import { Button, Popover, Avatar, Badge } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';

const SHeader = styled.header`
  font-family: 'TheJamsil5Bold';
  width: 100%;
  height: 80px;
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
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 45px;
    padding: 0 16px 0 0;
  }
  span {
    font-size: 22px;
    margin: 5px 0 0 0;
  }
`;

const SNav = styled.nav`
  padding: 16px 32px;
  a {
    text-decoration: none;
    padding: 16px;
    font-family: 'TheJamsil';
    font-weight: 600;
    font-size: 16px;
    color: var(--blue-600);
    :hover {
      color: var(--blue-500);
    }
  }
`;

const SLogin = styled.div`
  padding: 16px 16px;
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
    font-size: 25px;
    padding: 0 16px 0 0;
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
  padding: 0 16px;
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
              <a href={'/category'} target="_blank" rel="noopener noreferrer">
                커뮤니티
              </a>
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
