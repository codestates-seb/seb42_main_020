import { SNavContents } from '../../Style/NavStyle';
import { Link } from 'react-router-dom';

import { items } from '../../Pages/home/LocationPosts';
import { Dropdown } from 'antd';

const LocationButton = ({ isOpenNav, setIsOpenNav }) => {
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <Link
          to="/home/location/1"
          onClick={() => setIsOpenNav(() => !isOpenNav)}
        >
          <SNavContents>지역별</SNavContents>
        </Link>
      </Dropdown>
    </>
  );
};

export default LocationButton;
