import { TreeSelect } from 'antd';

const LocationInput = ({ treeData, loaction, locationChangeHandler }) => {
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
      deafaultValue="select"
      allowClear
      treeDefaultExpandAll
      value={loaction}
      onChange={locationChangeHandler}
      treeData={treeData}
    />
  );
};
export default LocationInput;
