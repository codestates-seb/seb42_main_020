import styled from 'styled-components';

export const UserMainProfileStyle = styled.main`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin-left: 50px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
  & > * {
    width: 95%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const STitle = styled.div`
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin-left: 10px;
  }
  .title {
    display: flex;
    padding: 0px 10px;
    font-size: 35px;
    font-weight: bold;
    border-bottom: 2px solid #c2c2c2;
    padding-bottom: 6px;
  }
  .edit-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 5px 20px;
    background: #ebfff7;
    color: #00663b;
    cursor: pointer;
    border-color: #ebfff7;
    border-radius: 5px;
  }
  .edit-profile:active {
    background: #ccffea;
  }
  .edit-profile > span {
    margin-left: 10px;
  }
`;

export const SInfo = styled.div`
  margin-top: 40px;

  //info 내용
  .info {
    width: 40%;
  }
  .info > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .type {
    width: 40%;
    font-size: 20px;
    text-align: right;
    font-weight: bold;
  }
  .value {
    width: 60%;
    text-align: left;
    margin-left: 40px;
  }
  .user-id,
  .nickname,
  .name {
    margin-bottom: 20px;
  }

  // sns 내용
  .sns {
    width: 50%;
  }
  .sns > li {
    display: flex;
    align-items: center;
    margin-left: 100px;
  }
  .google,
  .facebook,
  .naver {
    margin-bottom: 20px;
  }
  .sns-value {
    margin-left: 30px;
  }

  //picture 내용
  .picture {
    width: 30%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .picture > img {
    width: 95%;
    position: absolute;
  }
`;

export const SMyPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  h3 {
    font-size: 25px;
    font-weight: bold;
  }
  .line {
    margin-top: 15px;
    border-bottom: 5px solid #f0f0f0;
    width: 100%;
  }
  .my-post {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .create-post {
    margin-left: 20px;
    padding: 5px 30px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background-color: #ffffff;
    border: 2px solid #858585;
  }
  .create-post:hover {
    border: px solid #333333;
    background-color: #333333;
    color: #ffffff;
    box-shadow: none;
  }
`;
