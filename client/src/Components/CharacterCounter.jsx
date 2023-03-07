import { textState } from '../atoms/atoms';
import { selector, useRecoilValue, useSetRecoilState } from 'recoil';

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  //const [text, setText] = useRecoilState(textState);
  const text = useRecoilValue(textState);
  const setText = useSetRecoilState(textState);
  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <div>Character Count: {count}</div>;
}

export default CharacterCounter;
