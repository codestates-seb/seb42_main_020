import { SNavContents } from '../../Style/NavStyle';
import { Link } from 'react-router-dom';

import { Dropdown } from 'antd';

const LocationButton = () => {
  const items = [
    {
      key: '1',
      label: <Link to="/home/question/2">강남구</Link>,
    },
    {
      key: '2',
      label: <Link to="/home/question/2">강서구</Link>,
    },
    {
      key: '3',
      label: <Link to="/home/question/2">강북구</Link>,
    },
    {
      key: '4',
      label: <Link to="/home/question/2">용산구</Link>,
    },
    {
      key: '5',
      label: <Link to="/home/question/2">관악구</Link>,
    },
    {
      key: '6',
      label: <Link to="/home/question/2">중구</Link>,
    },
    {
      key: '7',
      label: <Link to="/home/question/2">서초구</Link>,
    },
    {
      key: '8',
      label: <Link to="/home/question/2">송파구</Link>,
    },
    {
      key: '9',
      label: <Link to="/home/question/2">마포구</Link>,
    },
    {
      key: '10',
      label: <Link to="/home/question/2">서대문구</Link>,
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <SNavContents onClick={(e) => e.preventDefault()}>
          <Link to="/home/location">지역별</Link>
        </SNavContents>
      </Dropdown>
    </>
  );
};

export default LocationButton;
