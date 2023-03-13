import {
  UserCardProfileStyle,
  SName,
  SPicture,
  SUserInfo,
  SActivity,
  SLogOut,
} from '../../Style/UserCardProfileStyle';
import { BsPencilSquare } from 'react-icons/bs';
import { BiCommentDetail, BiCommentCheck } from 'react-icons/bi';

function UserCardProfile() {
  return (
    <UserCardProfileStyle>
      <SName>
        <div className="block"></div>
        <h3 className="user-nick-name">개발새발자</h3>
      </SName>
      <SPicture>
        <div className="frame">
          <img src="/images/user-icon.png" alt="user_picture" />
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
        <SActivity>
          <div className="linetop"></div>
          <div className="user-activity">
            <div className="post">
              <span className="post-title">
                <BsPencilSquare size={25} />
                <span>게시글:</span>
              </span>
              <span>11 개</span>
            </div>
            <div className="comment">
              <span className="post-title">
                <BiCommentDetail size={25} />
                <span>댓글:</span>
              </span>
              <span>483 개</span>
            </div>
            <div className="adoptComment">
              <span className="post-title">
                <BiCommentCheck size={25} />
                <span>채택된 댓글:</span>
              </span>
              <span>18 개</span>
            </div>
          </div>
          <div className="linebottom"></div>
        </SActivity>
        <SLogOut>
          <button className="logout">Log Out</button>
        </SLogOut>
      </SUserInfo>
    </UserCardProfileStyle>
  );
}

export default UserCardProfile;
