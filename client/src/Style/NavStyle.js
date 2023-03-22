import styled from 'styled-components';

export const SNavContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--blue-50);
`;

export const SNavBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
`;

export const SNavContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: var(--mint-100);
  width: 150px;
  box-shadow: 3px 2px 3px 2px var(--gray-200);
  &:hover {
    background-color: var(--peach-400);
    a {
      color: var(--white);
    }
  }

  a {
    text-decoration: none;
    color: #636e72;
    font-weight: bold;
  }
`;
