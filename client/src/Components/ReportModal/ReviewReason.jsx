import { TreeSelect } from 'antd';
import { reasonData } from '../AskForm/PostData';

const ReviewReason = ({ value, reportReasonHandler }) => {
  return (
    <TreeSelect
      showSearch
      value={value}
      style={{
        width: '100%',
      }}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="사유를 선택해 주세요"
      allowClear
      treeDefaultExpandAll
      onChange={reportReasonHandler}
      treeData={reasonData}
    />
  );
};
export default ReviewReason;
