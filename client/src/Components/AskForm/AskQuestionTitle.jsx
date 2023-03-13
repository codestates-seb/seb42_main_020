import { Input } from 'antd';

const AskQuestionTitle = ({ title, titleOnChangeHandler }) => (
  <Input
    placeholder="제목을 입력해 주세요"
    value={title}
    onChange={titleOnChangeHandler}
  />
);

export default AskQuestionTitle;
