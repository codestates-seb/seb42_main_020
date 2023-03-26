import styled from 'styled-components';

export const SCommentBlock = styled.div`
  background-color: white;
  width: 40%;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
  border-top: 2.5px solid var(--mint-400);

  * {
    font-family: 'TheJamsil5Bold';
  }
`;

export const SCommentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const SCommentSection = styled.div`
  margin-bottom: 15px;
  border-top: 1px solid var(--gray-200);
  padding: 15px 0px;
`;

export const SButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > button {
    border: none;
    background-color: var(--peach-400);
    width: 20%;
    height: 30px;
  }
`;
