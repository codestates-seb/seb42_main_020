import { SNavContents } from '../../Style/NavStyle';
import { Link } from 'react-router-dom';

import { items } from '../../Pages/home/LocationPosts';
import { Dropdown } from 'antd';

const LocationButton = () => {
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
      >
        <SNavContents>
          <Link to="/home/location/1">지역별</Link>
        </SNavContents>
      </Dropdown>
    </>
  );
};

export default LocationButton;
