import styled from 'styled-components';

export const SServiceInfoLayout = styled.div`
  width: 100vw;
  margin-bottom: 100px;
`;

export const SServiceInfoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const landingIntroduce1 = `${process.env.PUBLIC_URL}/images/landing-introduce-1.jpg`;
const landingIntroduce2 = `${process.env.PUBLIC_URL}/images/landing-introduce-2.jpg`;
const landingIntroduce3 = `${process.env.PUBLIC_URL}/images/landing-introduce-3.jpg`;

export const SIntroduceImg1 = styled.div`
  margin: 200px 80px 100px 0;
  width: 425px;
  height: 300px;
  border-radius: 50px;
  background-image: url(${landingIntroduce1});
  background-size: 500px;
  background-position: center center;
  @media only screen and (max-width: 500px) {
    margin: 100px 80px 100px 80px;
    width: 400px;
    height: 200px;
    border-radius: 50px;
    background-image: url(${landingIntroduce1});
    background-size: 500px;
    background-position: center center;
  }
`;

export const SIntroduceImg2 = styled(SIntroduceImg1)`
  margin: 200px 0 100px 80px;
  background-image: url(${landingIntroduce2});
  @media only screen and (max-width: 500px) {
    margin: 0 80px 100px 80px;
  }
`;

export const SIntroduceImg3 = styled(SIntroduceImg1)`
  margin: 200px 80px 200px 0;
  background-image: url(${landingIntroduce3});
  @media only screen and (max-width: 500px) {
    margin: 80px 80px 100px 80px;
  }
`;

export const STextIntroduceSection = styled.div`
  width: 485px;
  @media only screen and (max-width: 500px) {
    height: 300px;
  }
`;

export const STextTitle = styled.h1`
  line-height: 40px;
  color: var(--gray-800);
  font-weight: 600;
  font-size: 30px;
  margin: 0 0 20px 0;
  text-align: right;
`;

export const STextSub = styled.h2`
  line-height: 30px;
  color: var(--gray-700);
  font-weight: 600;
  font-size: 18px;
  text-align: right;
`;
