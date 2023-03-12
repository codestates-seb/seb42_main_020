import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
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

  const [isOpenNav, setIsOpenNav] = useState(false);

  console.log(setIsLogged); // 로그인 여부 ESLint 오류 발생 방지 콘솔
  console.log(setIsNoticed); // 답변 알림 미사용으로 인한 ESLint 오류 발생 방지 콘솔

  const handleClickNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  return (
    <>
      <SHeader>
        <SLayout>
          <div className="layout-div">
            <SLogo>
              <Link to="/">
                <img src="images/logo.png" alt="logo" />
                <span>다나아</span>
              </Link>
            </SLogo>
            <SNav onClick={handleClickNav}>커뮤니티</SNav>
          </div>
          <div>
            {!isLogged ? (
              <div>
                <SLogin>
                  <button>
                    <Link to="/login">Log in</Link>
                  </button>
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
                    content={<Link to="/myinfo">마이 페이지</Link>}
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
      {isOpenNav ? <Nav /> : null}
    </>
  );
}

export default Header;
