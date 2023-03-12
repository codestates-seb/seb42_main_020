import GreetingInfo from '../../Components/Landing/GreetingInfo';
import styled from 'styled-components';

const SServiceInfoLayout = styled.div`
  width: 100vw;
  height: 2000px;
`;
const Landing = () => {
  return (
    <>
      <GreetingInfo />
      <SServiceInfoLayout></SServiceInfoLayout>
    </>
  );
};

export default Landing;
