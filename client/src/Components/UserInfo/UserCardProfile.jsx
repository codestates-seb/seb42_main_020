import {
  UserCardProfileStyle,
  SName,
  SPicture,
  SUserInfo,
} from '../../Style/UserCardProfileStyle';

function UserCardProfile() {
  return (
    <UserCardProfileStyle>
      <SName>
        <div className="block"></div>
        <h3 className="user-nick-name">개발새발자</h3>
      </SName>
      <SPicture>
        <div className="frame">
          <img src="/images/Swear.png" alt="user_picture" />
        </div>
      </SPicture>
      <SUserInfo>
        <div className="usertype">Member</div>
        <div className="class">
          <strong>회원등급:</strong> 일반
        </div>
        <div className="sign-up">
          <strong>가입:</strong> 2023년 3월 13일
        </div>
      </SUserInfo>
    </UserCardProfileStyle>
  );
}

export default UserCardProfile;
