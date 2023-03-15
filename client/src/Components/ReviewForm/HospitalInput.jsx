import { Input } from 'antd';

const HospitalInput = ({ hospitalName, hospitalChangeHandler }) => (
  <Input
    placeholder="병원명을 입력해 주세요"
    value={hospitalName}
    onChange={hospitalChangeHandler}
  />
);

export default HospitalInput;
