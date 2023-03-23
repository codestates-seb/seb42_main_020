import { TreeSelect } from 'antd';

const TypeInput = ({ treeData, value, typeChangeHandler }) => {
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
      // defaultValue={value}
      placeholder="진료과목"
      allowClear
      treeDefaultExpandAll
      value={value}
      onChange={typeChangeHandler}
      treeData={treeData}
    />
  );
};
export default TypeInput;
