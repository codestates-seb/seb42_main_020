import styled from 'styled-components';

export const SModalBlock = styled.div`
  font-family: 'TheJamsil5Bold';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

export const SModalClose = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;
