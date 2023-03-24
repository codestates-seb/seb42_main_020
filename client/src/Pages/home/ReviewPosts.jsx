import Section from '../../Components/Section/Section';

function ReviewPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}

export default ReviewPosts;
