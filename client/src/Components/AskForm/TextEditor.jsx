import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomToolbar = () => (
  <div id="toolbar">
    <select defaultValue="3" className="ql-header">
      <option value="1"></option>
      <option value="2"></option>
      <option value="3" />
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select defaultValue="black" className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option value="black"></option>
    </select>
    <select className="ql-background"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
  </div>
);

const TextEditor = ({ handleText, value }) => {
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'align',
    'color',
    'background',
    'image',
  ];

  return (
    <div className="text-editor" style={{ height: '350px', width: '100%' }}>
      <CustomToolbar />
      <ReactQuill
        value={value}
        // defaultValue={questionContent}
        style={{ height: '300px', fontsize: '15px' }}
        modules={modules}
        formats={formats}
        theme="snow"
        // onChange={(content, delta, source, editor) =>
        //   handleText(editor.getText())
        // }
        onChange={handleText}
        placeholder="내용을 작성해 주세요"
      />
    </div>
  );
};

export default TextEditor;
