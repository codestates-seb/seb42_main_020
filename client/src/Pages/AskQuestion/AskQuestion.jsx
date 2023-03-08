import { useState } from 'react';
import TextEditor from '../../Components/AskForm/TextEditor';
import { SAskQuestionBlock } from '../../Style/AskQuestion';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleText = (value) => {
    setText(value);
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <SAskQuestionBlock>
      <h1>WRITE HERE</h1>
      <input
        value={title}
        onChange={titleOnChangeHandler}
        placeholder="제목을 입력해 주세요"
      />
      <TextEditor text={text} handleText={handleText} />
    </SAskQuestionBlock>
  );
};

export default AskQuestion;
