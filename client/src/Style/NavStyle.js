import styled from 'styled-components';

export const SNavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #b2bec3;
`;

export const SNavBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const SNavContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 50px;
  background-color: var(--mint-400);
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: var(--peach-400);
  }

  a {
    text-decoration: none;
    color: #636e72;
    font-weight: bold;
  }
`;
