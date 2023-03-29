import styled from 'styled-components';

export const UserCardProfileStyle = styled.aside`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  border-radius: 5px;
  box-shadow: var(--big-box);
`;

export const SName = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  .block {
    display: inline-block;
    width: 10px;
    height: 100%;
    margin-right: 20px;
  }
  .doctor {
    background: #178ca1;
  }
  .member {
    background: #00663b;
  }
  .user-nick-name {
    font-family: 'TheJamsil5Bold';
    display: inline-block;
    font-size: 20px;
  }
`;

export const SPicture = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 0px 20px;

  .frame {
    width: 200px;
    height: 200px;
    border: 1px solid #e6e6e6;
    padding: 5px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

export const SUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  strong {
    font-family: 'TheJamsil5Bold';
  }
  .usertype {
    font-size: 18px;
    font-weight: 18px;
    padding: 8px 20px;
    border-radius: 3px;
    color: #ffffff;
  }

  .doctor {
    background: #178ca1;
  }
  .member {
    background: #00663b;
  }
  .class {
    font-size: 20px;
    margin-top: 15px;
  }
  .sign-up {
    margin-top: 15px;
  }
`;

export const SActivity = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 90%;
  .linetop,
  .linebottom {
    border-bottom: 2px solid #f0f0f0;
    width: 100%;
  }
  .linetop {
    margin-bottom: 15px;
  }
  .linebottom {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .user-activity {
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: space-around;
  }
  .post,
  .comment,
  .adoptComment {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-title {
    font-family: 'TheJamsil5Bold';
    display: flex;
    align-items: center;
  }
  .post-title > span {
    margin-left: 10px;
  }
  .adoptComment {
    margin-bottom: 0;
  }
`;

export const SLogOut = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;

  button {
    color: #fff;
    padding: 7px 0px;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    width: 100%;
  }
  .logout {
    font-size: 25px;
    padding: 15px 0px;
    background: #f2921d;
    transition: 0.3s;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .logout:hover {
    background: #fff;
    color: #f2921d;
  }

  .delete-user {
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
    background: #ff6947;
    transition: 0.3s;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .delete-user:hover {
    background: #fff;
    color: #ff6947;
  }
`;

export const SUserDeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  /* 모달창 스타일링 */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  /* 모달창 내용 스타일링 */
  .modal-content {
    max-width: 400px;
    margin: 0 auto;
  }
  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 30px;
  }
  /* 모달창 닫기 버튼 스타일링 */
  button {
    margin-top: 20px;
    padding: 10px 20px;
    margin: 0px 20px;
    cursor: pointer;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
  }
  .modal-submit-btn {
    background-color: #f52424;
  }
  .modal-close-btn {
    background-color: #3498db;
  }
`;
