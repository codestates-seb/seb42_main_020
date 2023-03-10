import styled from 'styled-components';

export const Wrapper = styled.div`
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
  }

  > button {
    width: 150px;
    height: 40px;
  }
`;
export const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
export const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  top: 150px;
  right: -75px;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  > button:last-child {
    width: 60px;
    height: 40px;
  }

  > div {
    margin-bottom: 60px;
    > button {
      width: 100px;
      height: 80px;
    }

    > button:first-child {
      margin-right: 20px;
    }
  }
`;
