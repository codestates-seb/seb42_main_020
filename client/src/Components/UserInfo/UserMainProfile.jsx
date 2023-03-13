import {
  UserMainProfileStyle,
  STitle,
  SInfo,
} from '../../Style/UserMainProfileStyle';
import { FiEdit } from 'react-icons/fi';
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
        <div className="info">ㅇㅇ</div>
        <div className="sns">sns 공유 </div>
      </SInfo>
    </UserMainProfileStyle>
  );
}

export default UserMainProfile;
