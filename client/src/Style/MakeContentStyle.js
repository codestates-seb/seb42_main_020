import styled from 'styled-components';

export const SPostModalBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  button {
    border: none;
    background-color: var(--mint-400);
    color: #636e72;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: var(--peach-400);
    }
  }

  > button {
    width: 150px;
    height: 40px;
  }
`;
export const SModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
export const SModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  top: 250px;
  right: -75px;
  width: 250px;
  height: 150px;
  border-radius: 20px;
  > button:last-child {
    width: 60px;
    height: 40px;
  }

  > div {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    > button {
      width: 100px;
      height: 80px;
    }

    > button:first-child {
      margin-right: 20px;
    }
  }
`;
