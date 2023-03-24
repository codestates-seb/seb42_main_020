import Section from '../../Components/Section/Section';

function LocationPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}

export default LocationPosts;
