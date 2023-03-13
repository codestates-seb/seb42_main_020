import styled from 'styled-components';

export const UserCardProfileStyle = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
`;

export const SName = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  .block {
    display: inline-block;
    background: #00b86a;
    width: 10px;
    height: 100%;
    margin-right: 20px;
  }
  .user-nick-name {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
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
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

export const SUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  strong {
    font-weight: bold;
  }
  .usertype {
    font-size: 18px;
    font-weight: 18px;
    padding: 8px 20px;
    border-radius: 3px;
    color: #ffffff;
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
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .post-title > span {
    margin-left: 10px;
  }
  .adoptComment {
    margin-bottom: 0;
  }
`;
