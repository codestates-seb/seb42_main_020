import { TreeSelect } from 'antd';

const LocationInput = ({ treeData, value, locationChangeHandler }) => {
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
      placeholder="지역"
      allowClear
      treeDefaultExpandAll
      value={value}
      onChange={locationChangeHandler}
      treeData={treeData}
    />
  );
};
export default LocationInput;
