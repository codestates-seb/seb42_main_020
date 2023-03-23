import styled from 'styled-components';

export const SReportModalContainer = styled.div`
  font-family: 'TheJamsil5Bold';
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const SReportModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 30%;
  z-index: 999;
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--gray-400);
  border: none;
  border-radius: 8px;
  opacity: none;

  h1 {
    font-size: 30px;
  }

  .ant-select {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const SReportModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const SReportText = styled.textarea`
  width: 98%;
  border: none;
  font-size: 15px;
  height: 100px;
  margin-bottom: 20px;
  padding: 5px;
  resize: none;

  &:focus {
    outline: none;
  }

  ::placeholder {
    font-size: 15px;
  }
`;

export const SReportModalButtonBlock = styled.div`
  text-align: right;

  button {
    font-family: 'TheJamsil5Bold';
    border: none;
    width: 20%;
    height: 30px;
    border-radius: 3px;
  }
  button:first-child {
    background-color: var(--peach-200);
    &:hover {
      background-color: var(--peach-400);
    }
  }

  button:last-child {
    margin-left: 15px;
    background-color: var(--mint-200);
    &:hover {
      background-color: var(--mint-400);
    }
  }
`;

export const SReportModalClose = styled.div`
  cursor: pointer;
`;

export const SFailMessage = styled.span`
  display: flex;
  color: var(--peach-600);
  margin-bottom: 15px;
  font-style: italic;
  font-weight: lighter;
`;
