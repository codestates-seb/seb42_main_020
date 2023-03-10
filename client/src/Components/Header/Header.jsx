import { useState } from 'react';
import { Button, Popover, Avatar, Badge } from 'antd';
import { UserOutlined, BellOutlined } from '@ant-design/icons';
import {
  SHeader,
  SLayout,
  SLogo,
  SNav,
  SLogin,
  SPrivateContent,
  SNotification,
  SMyInfo,
  SLogout,
} from '../../Style/HeaderStyle';

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
