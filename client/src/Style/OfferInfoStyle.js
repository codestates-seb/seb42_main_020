import styled from 'styled-components';

export const SOfferInfoLayout = styled.div`
  width: 100vw;
  background-color: var(--gray-700);
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const SGradiant = styled.div`
  width: 100vw;
  height: 150px;
  background: linear-gradient(360deg, var(--gray-900), rgb(255 255 255 / 0%));
`;

export const SOfferSection = styled.div``;

export const SOfferInfo = styled.div`
  width: 230px;
  height: 225px;
  margin: 90px 80px 0px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const SOfferTitle = styled.h1`
  line-height: 40px;
  color: var(--white);
  font-weight: 600;
  font-size: 30px;
  margin: 0 0 20px 0;
`;

export const SOfferSub = styled.h2`
  line-height: 30px;
  color: var(--gray-200);
  font-weight: 500;
  font-size: 18px;
`;

export const SOfferBtn = styled.div`
  margin: 30px 0 0 0;
  a {
    padding: 10px 30px;
    font-weight: 500;
    text-decoration: none;
    color: var(--white);
    background-color: rgba(0, 12, 30, 0.8);
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 12, 30, 0.5);
    }
  }
`;
