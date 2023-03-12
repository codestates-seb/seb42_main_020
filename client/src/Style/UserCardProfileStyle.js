import styled from 'styled-components';

export const UserCardProfileStyle = styled.aside`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 2px solid #000;
`;

export const SName = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  .block {
    display: inline-block;
    background: #00b86a;
    width: 10px;
    height: 100%;
    margin-right: 20px;
  }
  .userid {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
  }
`;
