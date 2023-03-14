import { TreeSelect } from 'antd';

const LocationInput = ({ treeData, location, locationChangeHandler }) => {
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
      defaultValue={location}
      allowClear
      treeDefaultExpandAll
      value={location}
      onChange={locationChangeHandler}
      treeData={treeData}
    />
  );
};
export default LocationInput;
