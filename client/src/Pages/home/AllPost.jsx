import Section from '../../Components/Section/Section';

function AllPost() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}

export default AllPost;
