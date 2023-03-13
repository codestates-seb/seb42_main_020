import {
  UserMainProfileStyle,
  STitle,
  SInfo,
  SMyPost,
} from '../../Style/UserMainProfileStyle';
import { FiEdit } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { RiKakaoTalkFill } from 'react-icons/ri';

function UserMainProfile() {
  return (
    <UserMainProfileStyle>
      <STitle>
        <h2 className="title">User Information</h2>
        <button className="edit-profile">
          <FiEdit size={25} color="#00663b" />
          <span>Edit Profile</span>
        </button>
      </STitle>
      <SInfo>
        <ul className="info">
          <li className="user-id">
            <span className="type">User ID</span>
            <span className="value">abcd1234@naver.com</span>
          </li>
          <li className="nickname">
            <span className="type">Nickname</span>
            <span className="value">개발새발자</span>
          </li>
          <li className="name">
            <span className="type">Name</span>
            <span className="value">홍길동</span>
          </li>
          <li className="area">
            <span className="type">Area</span>
            <span className="value">인천</span>
          </li>
        </ul>
        <ul className="sns">
          <li className="google">
            <FcGoogle size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="kakao">
            <BsFacebook size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="facebook">
            <BsTwitter size={25} />
            <span className="sns-value">None</span>
          </li>
          <li className="twiter">
            <RiKakaoTalkFill size={25} />
            <span className="sns-value">None</span>
          </li>
        </ul>
      </SInfo>
      <SMyPost>
        <div className="my-post">
          <h3>나의 게시글</h3>
          <button className="create-post">글쓰기</button>
        </div>
        <div className="line"></div>
      </SMyPost>
    </UserMainProfileStyle>
  );
}

export default UserMainProfile;
