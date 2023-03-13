import { TreeSelect } from 'antd';

const TypeInput = ({ treeData, type, typeChangeHandler }) => {
  return (
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      defaultValue={type}
      allowClear
      treeDefaultExpandAll
      value={type}
      onChange={typeChangeHandler}
      treeData={treeData}
    />
  );
};
export default TypeInput;
