import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Avatar, Badge } from 'antd';
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
              <Link to="/">커뮤니티</Link>
            </SNav>
          </div>
          <div>
            {!isLogged ? (
              <div>
                <SLogin>
                  <button>Log in</button>
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
                  <button>Log out</button>
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
