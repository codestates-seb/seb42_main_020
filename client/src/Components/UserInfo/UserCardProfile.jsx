import { UserCardProfileStyle, SName } from '../../Style/UserCardProfileStyle';

function UserCardProfile() {
  return (
    <UserCardProfileStyle>
      <SName>
        <div className="block"></div>
        <h3 className="userid">개발새발자</h3>
      </SName>
    </UserCardProfileStyle>
  );
}

export default UserCardProfile;
