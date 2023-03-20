import { TreeSelect } from 'antd';
import { reasonData } from '../AskForm/PostData';

const ReviewReason = ({ reportReason, reportReasonHandler }) => {
  return (
    <TreeSelect
      showSearch
      value={reportReason}
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
      onChange={reportReasonHandler}
      treeData={reasonData}
    />
  );
};
export default ReviewReason;
