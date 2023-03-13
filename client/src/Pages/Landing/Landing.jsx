import GreetingInfo from '../../Components/Landing/GreetingInfo';
import ServiceInfo from '../../Components/Landing/ServiceInfo';

const Landing = () => {
  // 클릭 시 스크롤 이동
  const scrollToDown = () => {
    let location = document.querySelector('.scrollpoint').offsetTop;
    window.scrollTo({ top: location, behavior: 'smooth' });
  };
  return (
    <>
      <GreetingInfo scrollToDown={scrollToDown} />
      <div className="scrollpoint">
        <ServiceInfo />
      </div>
    </>
  );
};

export default Landing;
