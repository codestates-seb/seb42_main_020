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
    width: 90%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const STitle = styled.div`
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
  .title {
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
`;
