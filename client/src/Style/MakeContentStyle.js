import styled from 'styled-components';

export const SPostModalBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

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
  display: flex;
  position: absolute;
  justify-content: center;
  width: 50%;
  height: 50%;
  top: -100%;
  right: 50%;
`;
export const SModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
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
