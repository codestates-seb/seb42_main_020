import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { Popover, Avatar } from 'antd';
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
  SAdminNav,
} from '../../Style/HeaderStyle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, loggedUserInfo, adminState } from '../../atoms/atoms';
import { logout } from '../../util/Token';

function Header() {
  const [isLogged, setIsLogged] = useRecoilState(loginState); // 로그인 여부
  const userInfo = useRecoilValue(loggedUserInfo);
  const isAdmin = useRecoilValue(adminState);

  const [isOpenNav, setIsOpenNav] = useState(false);

  const handleClickNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  const handleClickLogout = () => {
    setIsLogged(!isLogged);
    logout();
  };

  return (
    <>
      <SHeader>
        <SLayout>
          <div className="layout-div">
            <SLogo>
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + '/images/logo.png'}
                  alt="logo"
                />
                <span>다나아</span>
              </Link>
            </SLogo>
            <SNav onClick={handleClickNav}>커뮤니티</SNav>
            {isAdmin ? (
              <SAdminNav>
                <Link to="/admin">Admin</Link>
              </SAdminNav>
            ) : (
              <></>
            )}
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
                    {/* <Badge dot /> */}
                    <BellOutlined />
                  </SNotification>
                  <Popover
                    title={`${userInfo?.name} 님, 안녕하세요`}
                    content={<Link to="/myinfo">마이 페이지</Link>}
                  >
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Popover>
                </SMyInfo>
                <SLogout>
                  <button onClick={handleClickLogout}>Log out</button>
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
