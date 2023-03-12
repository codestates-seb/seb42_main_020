import {
  UserCardProfileStyle,
  SName,
  SPicture,
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
    </UserCardProfileStyle>
  );
}

export default UserCardProfile;
