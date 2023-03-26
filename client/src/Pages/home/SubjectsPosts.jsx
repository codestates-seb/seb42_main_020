import Section from '../../Components/Section/Section';

function SubjectsPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}

export default SubjectsPosts;
