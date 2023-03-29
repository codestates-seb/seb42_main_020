import { Rate } from 'antd';

const RateStar = ({ rateNumber, rateNumberHandler }) => (
  <Rate defaultValue={3} value={rateNumber} onChange={rateNumberHandler} />
);

export default RateStar;
