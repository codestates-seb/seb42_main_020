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
`;

export const SIntroduceImg1 = styled.div`
  margin: 200px 80px 100px 0;
  width: 425px;
  height: 300px;
  border-radius: 50px;
  background-image: url('images/landing-introduce-1.jpg');
  background-size: 500px;
  background-position: center center;
`;

export const SIntroduceImg2 = styled(SIntroduceImg1)`
  margin: 200px 0 100px 80px;
  background-image: url('images/landing-introduce-2.jpg');
`;

export const SIntroduceImg3 = styled(SIntroduceImg1)`
  margin: 200px 80px 200px 0;
  background-image: url('images/landing-introduce-3.jpg');
`;

export const STextIntroduceSection = styled.div`
  width: 400px;
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
