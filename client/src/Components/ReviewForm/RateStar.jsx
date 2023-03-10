import { Rate } from 'antd';

const RateStar = ({ rateNumber, rateNumberHandler }) => (
  <Rate
    allowHalf
    defaultValue={2.5}
    value={rateNumber}
    onChange={rateNumberHandler}
  />
);

export default RateStar;
