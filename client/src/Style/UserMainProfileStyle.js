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
    font-family: 'TheJamsil5Bold';
    display: flex;
    padding: 0px 10px;
    font-size: 35px;
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
    font-family: 'TheJamsil5Bold';
    width: 40%;
    font-size: 20px;
    text-align: right;
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

  //picture 내용
  .picture {
    margin-left: 50px;
    width: 30vh;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .picture > img {
    width: 95%;
    position: absolute;
    z-index: -1;
  }
`;

export const SMyPost = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  h3 {
    font-family: 'TheJamsil5Bold';
    font-size: 25px;
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
`;
