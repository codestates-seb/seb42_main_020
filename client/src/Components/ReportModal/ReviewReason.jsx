import { TreeSelect } from 'antd';
import { reasonData } from '../AskForm/PostData';

const ReviewReason = () => {
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
      defaultValue="신고 사유"
      allowClear
      treeDefaultExpandAll
      //value={reason}
      //onChange={reasonChangeHandler}
      treeData={reasonData}
    />
  );
};
export default ReviewReason;
