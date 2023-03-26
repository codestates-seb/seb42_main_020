import Section from '../../Components/Section/Section';

function QuestionPosts() {
  const currentPath = window.location.href;
  return <Section path={currentPath} />;
}

export default QuestionPosts;
